const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://batipro-backend.onrender.com/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
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
  post: <T>(endpoint: string, body: unknown) => apiFetch<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body: unknown) => apiFetch<T>(endpoint, { method: 'PUT', body }),
  delete: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' }),
  upload: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('[API] upload', endpoint, 'hasToken:', !!token);
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
      throw new Error('Non autorisé');
    }
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || 'Erreur upload');
    return json;
  },
};
