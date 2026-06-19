import Constants from 'expo-constants';
import { storage } from './storage';

const API_BASE =
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ||
  'https://batipro-backend.onrender.com/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

// Le backend renvoie 403 { error.code: 'TRIAL_EXPIRED' } sur les écritures quand
// l'essai gratuit est fini. Filet de sécurité : si le gate côté app n'a pas
// intercepté (JWT pas encore rafraîchi, deep link…), on redirige vers /abonnement
// et le message lisible du backend remonte quand même dans l'erreur.
let onTrialExpired: (() => void) | null = null;

export function setTrialExpiredHandler(handler: () => void) {
  onTrialExpired = handler;
}

// Le JWT backend expire en 15 min. Sans refresh automatique, chaque 401
// renvoyait l'artisan au login toutes les 15 minutes. Sur 401 on tente
// /auth/refresh avec le refreshToken (valide 30 j) puis on rejoue la requete.
//
// IMPORTANT : on distingue un refresh token REELLEMENT invalide (401/403 du
// backend -> vraie deconnexion) d'un echec TRANSITOIRE (reseau coupe, timeout,
// 5xx, cold start Render qui peut prendre 30-60s). Avant, le moindre echec
// reseau renvoyait null -> effacement des tokens -> l'artisan etait deconnecte
// alors que sa session etait parfaitement valide (cas typique : on rouvre
// l'app, le serveur dort, le refresh echoue, on doit retaper ses identifiants).
type RefreshResult =
  | { ok: true; token: string }
  | { ok: false; reason: 'invalid' | 'transient' };

const REFRESH_TIMEOUT_MS = 20000;

async function fetchWithTimeout(
  url: string,
  opts: RequestInit,
  ms: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// Single-flight : si plusieurs requetes prennent un 401 en meme temps, un seul
// appel refresh part, les autres attendent son resultat.
let refreshPromise: Promise<RefreshResult> | null = null;

export async function refreshAccessToken(): Promise<RefreshResult> {
  if (!refreshPromise) {
    refreshPromise = (async (): Promise<RefreshResult> => {
      try {
        const refreshToken = await storage.get('refreshToken');
        if (!refreshToken) return { ok: false, reason: 'invalid' };

        // 2 tentatives : couvre un cold start Render (1ere requete reveille le
        // serveur et timeout, la 2e passe).
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const res = await fetchWithTimeout(
              `${API_BASE}/auth/refresh`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
              },
              REFRESH_TIMEOUT_MS
            );
            // Le backend a explicitement rejete le refresh token -> session morte.
            if (res.status === 401 || res.status === 403) {
              return { ok: false, reason: 'invalid' };
            }
            // 5xx / cold start -> on retente.
            if (!res.ok) continue;
            const json = await res.json();
            const token = json?.data?.token as string | undefined;
            const newRefresh = json?.data?.refreshToken as string | undefined;
            if (!token) continue;
            await storage.set('token', token);
            if (newRefresh) await storage.set('refreshToken', newRefresh);
            return { ok: true, token };
          } catch {
            // timeout / reseau coupe -> on retente.
          }
        }
        // Serveur injoignable : on NE deconnecte PAS, on signale le transitoire.
        return { ok: false, reason: 'transient' };
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

async function handleUnauthorized(): Promise<never> {
  await storage.remove('token');
  await storage.remove('refreshToken');
  onUnauthorized?.();
  throw new Error('Session expirée, veuillez vous reconnecter');
}

async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
  isRetry = false
): Promise<T> {
  const token = await storage.get('token');

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 401) {
    if (!isRetry) {
      const r = await refreshAccessToken();
      if (r.ok) return apiFetch<T>(endpoint, options, true);
      if (r.reason === 'transient') {
        // Serveur injoignable : on garde la session, on remonte une erreur
        // normale (l'artisan reste connecte et peut reessayer).
        throw new Error('Connexion au serveur impossible. Vérifie ta connexion et réessaie.');
      }
    }
    return handleUnauthorized();
  }

  const json = await res.json();

  if (res.status === 403 && json?.error?.code === 'TRIAL_EXPIRED') {
    onTrialExpired?.();
  }

  if (!res.ok) {
    throw new Error(json.error?.message || json.message || 'Erreur API');
  }

  return json;
}

async function apiUpload<T>(
  endpoint: string,
  formData: FormData,
  method: 'POST' | 'PUT' = 'POST',
  isRetry = false
): Promise<T> {
  const token = await storage.get('token');

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (res.status === 401) {
    if (!isRetry) {
      const r = await refreshAccessToken();
      if (r.ok) return apiUpload<T>(endpoint, formData, method, true);
      if (r.reason === 'transient') {
        throw new Error('Connexion au serveur impossible. Vérifie ta connexion et réessaie.');
      }
    }
    return handleUnauthorized();
  }

  const json = await res.json();

  if (res.status === 403 && json?.error?.code === 'TRIAL_EXPIRED') {
    onTrialExpired?.();
  }

  if (!res.ok) {
    throw new Error(json.error?.message || json.message || 'Erreur API');
  }

  return json;
}

export const api = {
  get: <T>(endpoint: string) => apiFetch<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, { method: 'PUT', body }),
  delete: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' }),
  upload: <T>(endpoint: string, formData: FormData, method: 'POST' | 'PUT' = 'POST') =>
    apiUpload<T>(endpoint, formData, method),
};

export const apiBaseUrl = API_BASE;
