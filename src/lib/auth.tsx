'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';

interface User {
  artisan_id: number;
  email: string;
  trial_start: string;
  is_premium: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (nomEntreprise: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser({
            artisan_id: payload.artisan_id,
            email: payload.email,
            trial_start: payload.trial_start || '',
            is_premium: payload.is_premium || false,
          });
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ data: { token: string; refreshToken: string } }>(
      '/auth/login',
      { email, password }
    );
    const { token, refreshToken } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({
      artisan_id: payload.artisan_id,
      email: payload.email,
      trial_start: payload.trial_start || '',
      is_premium: payload.is_premium || false,
    });
  };

  const signup = async (nomEntreprise: string, email: string, password: string) => {
    const res = await api.post<{ data: { token: string; refreshToken: string } }>(
      '/auth/signup',
      { nom_entreprise: nomEntreprise, email, password }
    );
    const { token, refreshToken } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({
      artisan_id: payload.artisan_id,
      email: payload.email,
      trial_start: payload.trial_start || '',
      is_premium: payload.is_premium || false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
