'use client';

import { useState, useEffect } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Loader2, Shield, CalendarClock, ExternalLink } from 'lucide-react';

interface SubscriptionStatus {
  is_premium: boolean;
  subscription_status: string;
  current_period_end: string | null;
  trial_start: string | null;
}

export default function AbonnementPage() {
  const { user, logout } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'annual' | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [error, setError] = useState('');
  const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get<{ data: SubscriptionStatus }>('/stripe/status');
        setSubStatus(res.data);
      } catch {
        // Pas de statut Stripe, l'utilisateur n'est pas abonné
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchStatus();
  }, []);

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

  const handlePortal = async () => {
    setLoadingPortal(true);
    setError('');
    try {
      const res = await api.post<{ data: { url: string } }>('/stripe/portal', {});
      window.location.href = res.data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'accès au portail');
      setLoadingPortal(false);
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

  const isSubscribed = subStatus?.subscription_status === 'active' || subStatus?.subscription_status === 'past_due';

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loadingStatus) {
    return (
      <ProtectedLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <CreditCard className="mx-auto h-12 w-12 text-violet-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            {isSubscribed ? 'Votre abonnement' : 'Activez BatiPro'}
          </h1>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {isSubscribed
              ? 'Gérez votre abonnement BatiPro Pro ci-dessous.'
              : 'Votre période d\'essai est terminée. Choisissez votre formule pour continuer.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 w-full max-w-2xl rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {isSubscribed ? (
          /* === VUE ABONNÉ === */
          <Card className="w-full max-w-md border-2 border-violet-600">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">BatiPro Pro</CardTitle>
              <CardDescription>
                {subStatus?.subscription_status === 'active' && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-1">
                    Actif
                  </Badge>
                )}
                {subStatus?.subscription_status === 'past_due' && (
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 mt-1">
                    Paiement en attente
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <CalendarClock className="h-5 w-5 text-gray-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Prochain renouvellement</p>
                  <p className="text-sm text-gray-500">{formatDate(subStatus?.current_period_end ?? null)}</p>
                </div>
              </div>

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
                onClick={handlePortal}
                disabled={loadingPortal}
              >
                {loadingPortal ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Redirection...</>
                ) : (
                  <><ExternalLink className="mr-2 h-4 w-4" />Gérer mon abonnement</>
                )}
              </Button>
              <p className="text-xs text-center text-gray-400">
                Modifier le moyen de paiement, changer de formule ou annuler
              </p>
            </CardContent>
          </Card>
        ) : (
          /* === VUE NON-ABONNÉ === */
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
        )}

        <div className="mt-8">
          <Button variant="ghost" onClick={logout}>
            Se déconnecter
          </Button>
        </div>
      </div>
    </ProtectedLayout>
  );
}
