'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('triqi_token');
      const savedUser = localStorage.getItem('triqi_user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      localStorage.removeItem('triqi_token');
      localStorage.removeItem('triqi_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('triqi_token', newToken);
    localStorage.setItem('triqi_user', JSON.stringify(newUser));
  };

  const mergeUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...patch };
      localStorage.setItem('triqi_user', JSON.stringify(next));
      return next;
    });
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('triqi_token');
    localStorage.removeItem('triqi_user');
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    mergeUser,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }

  return context;
}
