'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) router.push('/auth/login');
    else if (adminOnly && user?.role !== 'ADMIN') router.push('/');
  }, [isAuthenticated, isLoading, adminOnly, user, router]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg)">
      <div className="w-12 h-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!isAuthenticated) return null;
  if (adminOnly && user?.role !== 'ADMIN') return null;
  
  return <>{children}</>;
}
