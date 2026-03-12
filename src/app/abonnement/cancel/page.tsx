'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AbonnementCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <XCircle className="h-10 w-10 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">Paiement annulé</CardTitle>
          <CardDescription>
            Vous avez annulé le processus de paiement. Aucun montant n&apos;a été débité.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full bg-violet-600 hover:bg-violet-700"
            size="lg"
            onClick={() => router.push('/abonnement')}
          >
            Revenir aux offres
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => router.push('/dashboard')}
          >
            Retour au dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
