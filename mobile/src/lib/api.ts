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

// Le JWT backend expire en 15 min. Sans refresh automatique, chaque 401
// renvoyait l'artisan au login toutes les 15 minutes. Sur 401 on tente UNE
// fois /auth/refresh avec le refreshToken (valide 30 j) puis on rejoue la
// requete. Single-flight : si plusieurs requetes prennent un 401 en meme
// temps, un seul appel refresh part, les autres attendent son resultat.
let refreshPromise: Promise<string | null> | null = null;

export async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const refreshToken = await storage.get('refreshToken');
        if (!refreshToken) return null;
        const res = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
        if (!res.ok) return null;
        const json = await res.json();
        const token = json?.data?.token as string | undefined;
        const newRefresh = json?.data?.refreshToken as string | undefined;
        if (!token) return null;
        await storage.set('token', token);
        if (newRefresh) await storage.set('refreshToken', newRefresh);
        return token;
      } catch {
        return null;
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
      const newToken = await refreshAccessToken();
      if (newToken) return apiFetch<T>(endpoint, options, true);
    }
    return handleUnauthorized();
  }

  const json = await res.json();

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
      const newToken = await refreshAccessToken();
      if (newToken) return apiUpload<T>(endpoint, formData, method, true);
    }
    return handleUnauthorized();
  }

  const json = await res.json();

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
