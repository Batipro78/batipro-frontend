'use client';

import { Sidebar } from '@/components/sidebar';
import { useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

function isTrialExpired(trialStart: string, isPremium: boolean): boolean {
  if (isPremium) return false;
  if (!trialStart) return false;
  const start = new Date(trialStart).getTime();
  const now = Date.now();
  const fourteenDays = 14 * 24 * 60 * 60 * 1000;
  return now - start > fourteenDays;
}

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!loading && user && isTrialExpired(user.trial_start, user.is_premium) && pathname !== '/abonnement') {
      router.push('/abonnement');
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
