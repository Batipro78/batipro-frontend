'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

/**
 * Headless component (renders nothing) that pushes authenticated users
 * to /dashboard. Lets the landing render immediately for everyone else,
 * including search-engine bots, instead of being hidden behind a spinner.
 */
export default function AuthRedirect() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  return null;
}
