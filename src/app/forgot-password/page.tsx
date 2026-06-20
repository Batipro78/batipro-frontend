'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import AuthShell from '@/components/auth/AuthShell';
import { AuthHeader, FormError } from '@/components/auth/AuthBits';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Erreur');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      {submitted ? (
        <>
          <AuthHeader
            icon={CheckCircle2}
            iconTone="success"
            title="Email envoyé"
            subtitle="Si un compte existe avec cet email, vous recevrez un lien de réinitialisation dans quelques instants."
          />
          <div className="space-y-4">
            <p className="rounded-md bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
              Pensez à vérifier votre dossier <strong>spam</strong>. Le lien est valable{' '}
              <strong>1 heure</strong>.
            </p>
            <Button asChild variant="outline" size="lg" className="h-11 w-full">
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la connexion
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <AuthHeader
            icon={KeyRound}
            title="Mot de passe oublié ?"
            subtitle="Entrez votre email pour recevoir un lien de réinitialisation."
          />
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="artisan@example.com"
                className="h-11"
                autoComplete="email"
                required
                autoFocus
              />
            </div>
            {error && <FormError message={error} />}
            <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer le lien'}
            </Button>
            <Button asChild type="button" variant="ghost" size="lg" className="h-11 w-full">
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la connexion
              </Link>
            </Button>
          </form>
        </>
      )}
    </AuthShell>
  );
}
