'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { trackSignup } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import { AuthHeader, FormError } from '@/components/auth/AuthBits';
import Link from 'next/link';

export default function SignupPage() {
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(nomEntreprise, email, password);
      trackSignup(email);
      setEmailSent(true);
    } catch {
      setError('Erreur lors de la création du compte. Vérifiez vos informations.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthShell>
        <AuthHeader
          icon={Mail}
          title="Vérifiez votre email"
          subtitle={`Un email de vérification a été envoyé à ${email}.`}
        />
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cliquez sur le lien dans l&apos;email pour activer votre compte et profiter de vos 14 jours
            d&apos;essai gratuit.
          </p>
          <p className="rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
            Vous ne trouvez pas l&apos;email ? Pensez à vérifier vos spams.
          </p>
          <Button asChild variant="outline" size="lg" className="h-11 w-full">
            <Link href="/login">Retour à la connexion</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <AuthHeader
        title="Créer un compte"
        subtitle="Essai gratuit de 14 jours, sans carte bancaire."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="nomEntreprise">Nom de l&apos;entreprise</Label>
          <Input
            id="nomEntreprise"
            type="text"
            value={nomEntreprise}
            onChange={(e) => setNomEntreprise(e.target.value)}
            placeholder="Mon entreprise"
            className="h-11"
            autoComplete="organization"
            required
          />
        </div>
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 caractères"
            className="h-11"
            autoComplete="new-password"
            required
          />
        </div>
        {error && <FormError message={error} />}
        <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={loading}>
          {loading ? 'Création en cours...' : 'Démarrer mon essai gratuit'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà un compte ?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </AuthShell>
  );
}
