import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { router } from 'expo-router';
import { api, refreshAccessToken, setUnauthorizedHandler, setTrialExpiredHandler } from './api';
import { storage } from './storage';

interface User {
  artisan_id: number;
  email: string;
  trial_start: string;
  is_premium: boolean;
  cgu_accepted: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (nomEntreprise: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeToken(token: string): User | null {
  try {
    const base64 = token.split('.')[1];
    const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const json = atob(padded);
    const payload = JSON.parse(json);
    if (payload.exp * 1000 <= Date.now()) return null;
    return {
      artisan_id: payload.artisan_id,
      email: payload.email,
      trial_start: payload.trial_start || '',
      is_premium: payload.is_premium || false,
      cgu_accepted: payload.cgu_accepted || false,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      router.replace('/login');
    });

    // Backstop essai expiré : si le backend renvoie 403 TRIAL_EXPIRED, on amène
    // l'artisan sur l'écran abonnement (le message lisible remonte côté écran).
    setTrialExpiredHandler(() => {
      router.replace('/abonnement');
    });

    (async () => {
      const token = await storage.get('token');
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          setUser(decoded);
        } else {
          // Access token expire (15 min) mais le refreshToken vaut 30 jours :
          // on tente le refresh avant de jeter la session, sinon l'artisan
          // devait se reconnecter a CHAQUE ouverture de l'app.
          const newToken = await refreshAccessToken();
          const refreshed = newToken ? decodeToken(newToken) : null;
          if (refreshed) {
            setUser(refreshed);
          } else {
            await storage.remove('token');
            await storage.remove('refreshToken');
          }
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ data: { token: string; refreshToken: string } }>(
      '/auth/login',
      { email, password }
    );
    const { token, refreshToken } = res.data;
    await storage.set('token', token);
    await storage.set('refreshToken', refreshToken);
    const decoded = decodeToken(token);
    if (decoded) setUser(decoded);
  };

  const signup = async (nomEntreprise: string, email: string, password: string) => {
    await api.post('/auth/signup', { nom_entreprise: nomEntreprise, email, password });
  };

  const refreshAuth = async () => {
    const refreshToken = await storage.get('refreshToken');
    if (!refreshToken) return;
    const res = await api.post<{ data: { token: string; refreshToken: string } }>(
      '/auth/refresh',
      { refreshToken }
    );
    await storage.set('token', res.data.token);
    await storage.set('refreshToken', res.data.refreshToken);
    const decoded = decodeToken(res.data.token);
    if (decoded) setUser(decoded);
  };

  const logout = async () => {
    await storage.remove('token');
    await storage.remove('refreshToken');
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
