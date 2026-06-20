'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import AuthShell from '@/components/auth/AuthShell';
import { AuthHeader, FormError } from '@/components/auth/AuthBits';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!token) {
    return (
      <>
        <AuthHeader
          icon={AlertCircle}
          iconTone="destructive"
          title="Lien invalide"
          subtitle="Ce lien de réinitialisation est incomplet. Demandez-en un nouveau."
        />
        <Button asChild size="lg" className="h-11 w-full">
          <Link href="/forgot-password">Demander un nouveau lien</Link>
        </Button>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit faire au moins 8 caractères');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Erreur');
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <AuthHeader
          icon={CheckCircle2}
          iconTone="success"
          title="Mot de passe modifié"
          subtitle="Votre nouveau mot de passe est actif. Redirection vers la connexion..."
        />
        <Button asChild size="lg" className="h-11 w-full">
          <Link href="/login">Se connecter maintenant</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <AuthHeader
        icon={KeyRound}
        title="Nouveau mot de passe"
        subtitle="Choisissez un mot de passe d’au moins 8 caractères."
      />
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
            autoComplete="new-password"
            required
            minLength={8}
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </div>
        {error && <FormError message={error} />}
        <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={loading}>
          {loading ? 'Validation...' : 'Réinitialiser le mot de passe'}
        </Button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Chargement...</p>}>
        <ResetPasswordContent />
      </Suspense>
    </AuthShell>
  );
}
