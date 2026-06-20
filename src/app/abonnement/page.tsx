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
  const { logout } = useAuth();
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10">
        <div className="text-center mb-8">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
            <CreditCard className="h-7 w-7" />
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            {isSubscribed ? 'Votre abonnement' : 'Activez MonDevisMinute'}
          </h1>
          <p className="mt-2 max-w-md mx-auto text-muted-foreground">
            {isSubscribed
              ? 'Gérez votre abonnement MonDevisMinute Pro ci-dessous.'
              : 'Votre période d\'essai est terminée. Choisissez votre formule pour continuer.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 w-full max-w-2xl rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center text-sm text-destructive">
            {error}
          </div>
        )}

        {isSubscribed ? (
          /* === VUE ABONNÉ === */
          <Card className="w-full max-w-md border-2 border-primary/30 shadow-lg shadow-primary/5">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <CardTitle className="text-xl">MonDevisMinute Pro</CardTitle>
              <CardDescription>
                {subStatus?.subscription_status === 'active' && (
                  <Badge className="mt-1 bg-success/10 text-success hover:bg-success/10">
                    Actif
                  </Badge>
                )}
                {subStatus?.subscription_status === 'past_due' && (
                  <Badge className="mt-1 bg-amber-100 text-amber-800 hover:bg-amber-100">
                    Paiement en attente
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <CalendarClock className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Prochain renouvellement</p>
                  <p className="text-sm text-muted-foreground">{formatDate(subStatus?.current_period_end ?? null)}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
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
              <p className="text-center text-xs text-muted-foreground">
                Modifier le moyen de paiement, changer de formule ou annuler
              </p>
            </CardContent>
          </Card>
        ) : (
          /* === VUE NON-ABONNÉ === */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            {/* Mensuel */}
            <Card className="relative border-2 border-border transition-colors hover:border-primary/40">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Mensuel</CardTitle>
                <CardDescription>Sans engagement</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">29€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
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
            <Card className="relative border-2 border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary px-3 py-1 text-primary-foreground hover:bg-primary">
                  2 mois offerts
                </Badge>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Annuel</CardTitle>
                <CardDescription>Le meilleur rapport qualité-prix</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">290€</span>
                  <span className="text-muted-foreground">/an</span>
                </div>
                <p className="mt-1 text-sm font-medium text-primary">
                  soit ~24€/mois au lieu de 29€
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
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
