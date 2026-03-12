'use client';

import { useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Loader2 } from 'lucide-react';

export default function AbonnementPage() {
  const { user, logout } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'annual' | null>(null);
  const [error, setError] = useState('');

  const handleCheckout = async (plan: 'monthly' | 'annual') => {
    setLoadingPlan(plan);
    setError('');
    try {
      const res = await api.post<{ data: { url: string } }>('/stripe/checkout', { plan });
      window.location.href = res.data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création du paiement');
      setLoadingPlan(null);
    }
  };

  const features = [
    'Devis et factures illimités',
    'IA vocale pour dicter vos devis',
    'Gestion clients complète',
    'Export PDF professionnel',
    'Mode comparatif 3 gammes',
    'Support prioritaire',
  ];

  return (
    <ProtectedLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <CreditCard className="mx-auto h-12 w-12 text-violet-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.is_premium ? 'Votre abonnement' : 'Activez BatiPro'}
          </h1>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {user?.is_premium
              ? 'Vous êtes abonné BatiPro Pro. Gérez votre abonnement ci-dessous.'
              : 'Votre période d\'essai est terminée. Choisissez votre formule pour continuer.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 w-full max-w-2xl rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Mensuel */}
          <Card className="relative border-2 border-gray-200 hover:border-violet-300 transition-colors">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Mensuel</CardTitle>
              <CardDescription>Sans engagement</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">29€</span>
                <span className="text-gray-500">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-violet-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-violet-600 hover:bg-violet-700"
                size="lg"
                onClick={() => handleCheckout('monthly')}
                disabled={loadingPlan !== null}
              >
                {loadingPlan === 'monthly' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Redirection...</>
                ) : (
                  "S'abonner"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Annuel */}
          <Card className="relative border-2 border-violet-600 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-violet-600 text-white hover:bg-violet-600 px-3 py-1">
                2 mois offerts
              </Badge>
            </div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Annuel</CardTitle>
              <CardDescription>Le meilleur rapport qualité-prix</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">290€</span>
                <span className="text-gray-500">/an</span>
              </div>
              <p className="text-sm text-violet-600 font-medium mt-1">
                soit ~24€/mois au lieu de 29€
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-violet-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-violet-600 hover:bg-violet-700"
                size="lg"
                onClick={() => handleCheckout('annual')}
                disabled={loadingPlan !== null}
              >
                {loadingPlan === 'annual' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Redirection...</>
                ) : (
                  "S'abonner"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button variant="ghost" onClick={logout}>
            Se déconnecter
          </Button>
        </div>
      </div>
    </ProtectedLayout>
  );
}
