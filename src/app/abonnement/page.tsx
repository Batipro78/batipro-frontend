'use client';

import { ProtectedLayout } from '@/components/protected-layout';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function AbonnementPage() {
  const { logout } = useAuth();

  return (
    <ProtectedLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Lock className="h-7 w-7 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Essai terminé</CardTitle>
            <CardDescription>
              Votre période d&apos;essai de 14 jours est terminée.
              Activez votre abonnement pour continuer à utiliser BatiPro.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" disabled>
              Activer mon abonnement (bientôt disponible)
            </Button>
            <Button variant="ghost" className="w-full" onClick={logout}>
              Se déconnecter
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
