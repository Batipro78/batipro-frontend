'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://batipro-backend.onrender.com/api';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Lien de vérification invalide.');
      return;
    }

    fetch(`${API_BASE}/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage('Votre adresse email a été vérifiée avec succès !');
        } else {
          setStatus('error');
          setMessage(json.error?.message || 'Ce lien de vérification est invalide ou a expiré.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Erreur de connexion. Veuillez réessayer.');
      });
  }, [token]);

  return (
    <CardContent className="text-center space-y-6">
      {status === 'loading' && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Vérification en cours...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <p className="text-lg font-medium text-green-700">{message}</p>
          <p className="text-sm text-muted-foreground">
            Vous pouvez maintenant vous connecter et profiter de vos 14 jours d&apos;essai gratuit.
          </p>
          <Button asChild className="mt-4 w-full">
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-3">
          <XCircle className="h-12 w-12 text-destructive" />
          <p className="text-lg font-medium text-destructive">{message}</p>
          <p className="text-sm text-muted-foreground">
            Si le problème persiste, essayez de vous reconnecter pour recevoir un nouveau lien.
          </p>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href="/login">Retour à la connexion</Link>
          </Button>
        </div>
      )}
    </CardContent>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Zap className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Vérification email</CardTitle>
        </CardHeader>
        <Suspense fallback={
          <CardContent className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-3">Chargement...</p>
          </CardContent>
        }>
          <VerifyEmailContent />
        </Suspense>
      </Card>
    </div>
  );
}
