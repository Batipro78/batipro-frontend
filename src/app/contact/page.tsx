import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, MessageCircle, LifeBuoy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact — MonDevisMinute',
  description:
    "Contactez l'équipe MonDevisMinute. Réponse sous 24h ouvrées. Support, démo, partenariats, presse.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.mondevisminute.com/contact' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">Nous contacter</h1>
        <p className="mt-3 text-muted-foreground">
          Une question, un besoin spécifique, une démo&nbsp;? Écrivez-nous, on
          répond sous 24h ouvrées (du lundi au vendredi).
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">E-mail</h2>
              <p className="mt-1 text-muted-foreground">
                Le moyen le plus rapide pour nous joindre.
              </p>
              <a
                href="mailto:mondevisminute@zohomail.eu"
                className="mt-3 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                mondevisminute@zohomail.eu
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </span>
              <h3 className="font-semibold">Délai de réponse</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Sous 24h ouvrées en moyenne. Les demandes envoyées le week-end
              sont traitées le lundi matin.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LifeBuoy className="h-4 w-4" />
              </span>
              <h3 className="font-semibold">Support client</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Vous êtes déjà client&nbsp;? La majorité des questions sont
              traitées dans la{' '}
              <Link href="/aide" className="underline">
                page d&apos;aide
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Quel sujet&nbsp;?</h2>
          <p className="mt-2 text-muted-foreground">
            Pour gagner du temps, précisez le sujet de votre message dans
            l&apos;objet de l&apos;e-mail&nbsp;:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="font-medium">Démo&nbsp;:</span>{' '}
                <span className="text-muted-foreground">
                  vous voulez voir l&apos;outil en conditions réelles, on prend
                  15 min en visio pour le tester avec vos chantiers.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="font-medium">Support technique&nbsp;:</span>{' '}
                <span className="text-muted-foreground">
                  un bug, une question sur votre compte, un devis qui ne se
                  génère pas. Indiquez votre adresse e-mail de compte.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="font-medium">Facturation&nbsp;:</span>{' '}
                <span className="text-muted-foreground">
                  question sur votre abonnement, résiliation, reçu fiscal.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="font-medium">Partenariats / presse&nbsp;:</span>{' '}
                <span className="text-muted-foreground">
                  vous êtes journaliste, fédération, fournisseur du BTP, on
                  étudie toute proposition sérieuse.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl bg-muted/40 p-6">
          <h2 className="text-lg font-semibold">Avant d&apos;écrire</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Beaucoup de questions trouvent leur réponse en quelques secondes
            sur la page{' '}
            <Link href="/aide" className="underline">
              Aide &amp; FAQ
            </Link>{' '}
            (création de devis, dictée vocale, facturation électronique,
            résiliation…). Sinon, on est là.
          </p>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          <Link href="/aide" className="hover:text-foreground">
            Aide &amp; FAQ
          </Link>
          <span className="mx-2">·</span>
          <Link href="/mentions-legales" className="hover:text-foreground">
            Mentions légales
          </Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:text-foreground">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
