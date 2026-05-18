'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { trackPurchase } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProtectedLayout } from '@/components/protected-layout';

export default function AbonnementSuccessPage() {
  const { refreshAuth, user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    trackPurchase(29, 'EUR');
    const refresh = async () => {
      // Polling : on tente jusqu'à 6 fois (max ~12s) pour laisser le temps au webhook Stripe.
      for (let i = 0; i < 6 && !cancelled; i++) {
        try {
          await new Promise((r) => setTimeout(r, i === 0 ? 1000 : 2000));
          await refreshAuth();
          // Si le webhook est arrivé, on a is_premium=true
          if (user?.is_premium) break;
        } catch {
          if (i === 5) {
            setError(
              'Activation un peu lente. Si votre espace ne reflète pas l\'abonnement dans 1 minute, déconnectez-vous puis reconnectez-vous.'
            );
          }
        }
      }
      if (!cancelled) setRefreshing(false);
    };
    refresh();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Paiement réussi !</CardTitle>
            <CardDescription>
              Bienvenue dans MonDevisMinute Pro. Votre abonnement est maintenant actif.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {refreshing ? (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Activation en cours...
              </div>
            ) : error ? (
              <p className="text-sm text-amber-600">{error}</p>
            ) : null}
            <Button
              className="w-full bg-violet-600 hover:bg-violet-700"
              size="lg"
              onClick={() => router.push('/dashboard')}
              disabled={refreshing}
            >
              Accéder à mon espace
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
