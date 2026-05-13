import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Envoyer une facture en Factur-X — MonDevisMinute',
  description:
    "Comment envoyer vos factures BTP au format Factur-X (facture électronique obligatoire en France) en quelques minutes. Pas besoin de modifier vos PDF existants.",
  robots: { index: true, follow: true },
};

interface Pdp {
  nom: string;
  description: string;
  prix: string;
  url: string;
  badge?: string;
}

const PDPS: Pdp[] = [
  {
    nom: 'Chorus Pro',
    description:
      "Plateforme publique gratuite de l'État. Indispensable si vous facturez l'État, une collectivité territoriale ou un hôpital public.",
    prix: 'Gratuit',
    url: 'https://chorus-pro.gouv.fr',
    badge: 'Officiel · Gratuit',
  },
  {
    nom: 'Pennylane',
    description:
      "Plateforme française de facturation et comptabilité, certifiée Plateforme de Dématérialisation Partenaire (PDP). Conversion automatique de vos PDF en Factur-X et envoi à vos clients pros.",
    prix: 'À partir de ~14 €/mois',
    url: 'https://www.pennylane.com',
  },
  {
    nom: 'Tiime',
    description:
      "Solution française pour indépendants et TPE. Génération de factures électroniques conformes Factur-X et transmission via le réseau PDP.",
    prix: 'Formules gratuites + payantes',
    url: 'https://www.tiime.fr',
  },
];

export default function FactureElectroniquePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Envoyer en Factur-X</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">
          Envoyer votre facture au format Factur-X
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          La facture électronique devient obligatoire pour toutes les entreprises
          en France à partir de septembre 2026. Voici comment envoyer vos
          factures MonDevisMinute au bon format.
        </p>

        {/* Encart : pas besoin de modifier */}
        <div className="mt-8 rounded-xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/30">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900">
              <svg
                className="h-5 w-5 text-violet-600 dark:text-violet-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">
                Pas besoin de modifier vos PDF MonDevisMinute
              </p>
              <p className="mt-1 text-muted-foreground">
                Le PDF généré par l&apos;app est déjà valide. Vous l&apos;envoyez
                à votre plateforme qui se charge automatiquement de le convertir
                au format Factur-X et de le transmettre à votre client.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-semibold">
          Comment ça marche, en 3 étapes
        </h2>
        <ol className="mt-4 space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
              1
            </span>
            <span className="pt-0.5">
              Choisissez une <strong>plateforme de dématérialisation</strong>{' '}
              (PDP) ci-dessous et créez un compte.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
              2
            </span>
            <span className="pt-0.5">
              Téléchargez votre facture PDF depuis MonDevisMinute (bouton{' '}
              <strong>PDF</strong> sur l&apos;écran facture) et déposez-la sur
              la plateforme.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
              3
            </span>
            <span className="pt-0.5">
              Renseignez le SIREN de votre client. La plateforme convertit en
              Factur-X et transmet automatiquement.
            </span>
          </li>
        </ol>

        <h2 className="mt-10 text-xl font-semibold">
          Plateformes recommandées
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choisissez selon votre cas : Chorus Pro est gratuit pour facturer le
          secteur public. Les autres sont des PDP privées certifiées par
          l&apos;État pour la facturation entre entreprises.
        </p>

        <div className="mt-6 space-y-4">
          {PDPS.map((pdp) => (
            <a
              key={pdp.nom}
              href={pdp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border bg-card p-5 transition hover:border-violet-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{pdp.nom}</h3>
                    {pdp.badge ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        {pdp.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pdp.description}
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {pdp.prix}
                  </p>
                </div>
                <svg
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Liste officielle complète des PDP immatriculées par l&apos;État :{' '}
          <a
            href="https://www.impots.gouv.fr/specialistes/professionnel/facturation-electronique"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            impots.gouv.fr
          </a>
        </p>

        <h2 className="mt-10 text-xl font-semibold">Questions fréquentes</h2>

        <details className="mt-4 rounded-lg border bg-card p-4">
          <summary className="cursor-pointer font-medium">
            C&apos;est obligatoire à partir de quand ?
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>Réception</strong> de factures électroniques : obligatoire
            pour toutes les entreprises dès le <strong>1ᵉʳ septembre 2026</strong>.
            <br />
            <strong>Émission</strong> : 1ᵉʳ septembre 2026 pour les grandes et
            moyennes entreprises, 1ᵉʳ septembre 2027 pour les TPE/PME (la
            majorité des artisans).
          </p>
        </details>

        <details className="mt-3 rounded-lg border bg-card p-4">
          <summary className="cursor-pointer font-medium">
            Mes factures actuelles MonDevisMinute sont-elles déjà compatibles ?
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">
            Oui. Les PDP acceptent les PDF classiques et les convertissent
            automatiquement en Factur-X. Aucune modification de vos factures
            MonDevisMinute n&apos;est nécessaire.
          </p>
        </details>

        <details className="mt-3 rounded-lg border bg-card p-4">
          <summary className="cursor-pointer font-medium">
            Et si mon client est un particulier (B2C) ?
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">
            La facture électronique Factur-X concerne uniquement les
            transactions entre entreprises (B2B) et avec l&apos;administration
            (B2G). Pour vos clients particuliers, vous continuez à envoyer
            votre PDF normalement (email, WhatsApp).
          </p>
        </details>

        <details className="mt-3 rounded-lg border bg-card p-4">
          <summary className="cursor-pointer font-medium">
            MonDevisMinute va-t-il intégrer Factur-X directement ?
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">
            Nous étudions un partenariat avec une PDP pour proposer l&apos;envoi
            en 1 clic depuis l&apos;application. En attendant, l&apos;une des
            plateformes ci-dessus fait parfaitement le travail.
          </p>
        </details>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Retour à l&apos;accueil
          </Link>
          <span className="mx-2">·</span>
          <a
            href="mailto:contact@mondevisminute.com"
            className="hover:text-foreground"
          >
            Une question ? contact@mondevisminute.com
          </a>
        </div>
      </div>
    </main>
  );
}
