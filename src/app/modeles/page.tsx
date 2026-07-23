import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import { modeles } from '@/content/modeles';
import { METIER_LABEL, METIER_ICON, metierBadgeClass } from '@/lib/metiers';

const BASE = 'https://www.mondevisminute.com';

export const metadata: Metadata = {
  title: { absolute: 'Modèles de devis et factures gratuits pour artisans (Word)' },
  description:
    "28 modèles de devis et de factures gratuits au format Word, adaptés à chaque métier du bâtiment : électricien, plombier, maçon, peintre… Mentions obligatoires incluses.",
  alternates: { canonical: `${BASE}/modeles` },
  openGraph: {
    type: 'website',
    url: `${BASE}/modeles`,
    locale: 'fr_FR',
    siteName: 'MonDevisMinute',
    title: 'Modèles de devis et factures gratuits pour artisans',
    description:
      "Modèles Word gratuits de devis et de factures pour 14 métiers du bâtiment, avec les mentions obligatoires déjà en place.",
  },
};

export default function ModelesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${BASE}/modeles`,
        name: 'Modèles de devis et factures gratuits pour artisans',
        description:
          'Modèles Word gratuits de devis et de factures pour 14 métiers du bâtiment.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Modèles', item: `${BASE}/modeles` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: modeles.flatMap((m, i) => [
          {
            '@type': 'ListItem',
            position: i * 2 + 1,
            name: m.titreDevis,
            url: `${BASE}/modeles/devis-${m.metier}`,
          },
          {
            '@type': 'ListItem',
            position: i * 2 + 2,
            name: m.titreFacture,
            url: `${BASE}/modeles/facture-${m.metier}`,
          },
        ]),
      },
    ],
  };

  return (
    <GuideShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Modèles</span>
        </nav>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
            28 modèles Word
          </span>
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            100 % gratuit, sans inscription
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Modèles de devis et de factures gratuits pour artisans
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          Un modèle Word par métier, prêt à remplir : tableau de chiffrage avec des lignes
          d&apos;exemple réalistes, mentions obligatoires déjà en place, totaux HT, TVA et TTC.
          Téléchargez le vôtre, remplacez les exemples par votre chantier, c&apos;est prêt.
          Gratuit, sans inscription. Pressé ? Notre{' '}
          <Link
            href="/generateur-devis"
            className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
          >
            générateur de devis en ligne
          </Link>{' '}
          fait le PDF à votre place, calculs de TVA compris.
        </p>

        <div className="mt-12 space-y-8">
          {modeles.map((m) => {
            const Icone = METIER_ICON[m.metier];
            return (
              <section
                key={m.metier}
                className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/60 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-md">
                    <Icone className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                    {METIER_LABEL[m.metier]}
                  </h2>
                  <span
                    className={`ml-auto hidden items-center rounded-full border px-3 py-1 text-xs font-semibold sm:inline-flex ${metierBadgeClass(m.metier)}`}
                  >
                    2 modèles
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Link
                    href={`/modeles/devis-${m.metier}`}
                    className="group flex flex-col rounded-xl border border-border border-l-4 border-l-violet-500 bg-white p-4 transition hover:border-violet-300 hover:shadow-md"
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-violet-600">
                      Devis
                    </span>
                    <span className="mt-1 font-display font-bold text-foreground transition group-hover:text-violet-700">
                      {m.titreDevis}
                    </span>
                    <span className="mt-1 text-sm leading-6 text-muted-foreground">
                      Modèle Word gratuit avec lignes d&apos;exemple chiffrées et mentions
                      obligatoires.
                    </span>
                  </Link>
                  <Link
                    href={`/modeles/facture-${m.metier}`}
                    className="group flex flex-col rounded-xl border border-border border-l-4 border-l-sky-500 bg-white p-4 transition hover:border-sky-300 hover:shadow-md"
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-sky-600">
                      Facture
                    </span>
                    <span className="mt-1 font-display font-bold text-foreground transition group-hover:text-sky-700">
                      {m.titreFacture}
                    </span>
                    <span className="mt-1 text-sm leading-6 text-muted-foreground">
                      Modèle Word gratuit : numérotation, TVA, conditions de règlement.
                    </span>
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Pourquoi un modèle par métier ?
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Un devis d&apos;électricien se chiffre au point lumineux et à la prise ; un devis de
            maçon, au mètre carré d&apos;ouvrage ; un devis de couvreur isole l&apos;échafaudage.
            Un modèle générique vous oblige à tout réinventer. Chacun de nos modèles part des
            lignes réelles du métier — avec des prix d&apos;exemple à adapter — et des pièges
            propres à chaque activité : réserve sur l&apos;état des supports, garantie de reprise
            des végétaux, sort de la charpente à la dépose…
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Tous les modèles intègrent les mentions attendues sur un devis ou une facture de
            travaux : identité complète de l&apos;entreprise, décompte détaillé, TVA, assurance
            professionnelle, conditions de règlement. Pour comprendre chaque mention, voyez nos
            guides{' '}
            <Link
              href="/guides/mentions-obligatoires-devis-batiment"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              mentions obligatoires du devis
            </Link>{' '}
            et{' '}
            <Link
              href="/guides/mentions-obligatoires-facture-artisan"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              mentions obligatoires de la facture
            </Link>
            .
          </p>
        </section>
      </main>
    </GuideShell>
  );
}
