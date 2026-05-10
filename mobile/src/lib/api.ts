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

async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
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
    await storage.remove('token');
    await storage.remove('refreshToken');
    onUnauthorized?.();
    throw new Error('Non autorisé');
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
};

export const apiBaseUrl = API_BASE;
