import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import { modeles } from '@/content/modeles';
import { METIER_LABEL } from '@/lib/metiers';

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

        <h1 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Modèles de devis et de factures gratuits pour artisans
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          Un modèle Word par métier, prêt à remplir : tableau de chiffrage avec des lignes
          d&apos;exemple réalistes, mentions obligatoires déjà en place, totaux HT, TVA et TTC.
          Téléchargez le vôtre, remplacez les exemples par votre chantier, c&apos;est prêt.
          Gratuit, sans inscription.
        </p>

        <div className="mt-12 space-y-10">
          {modeles.map((m) => (
            <section
              key={m.metier}
              className="rounded-2xl border border-border p-6 transition hover:border-violet-200"
            >
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                {METIER_LABEL[m.metier]}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Link
                  href={`/modeles/devis-${m.metier}`}
                  className="group flex flex-col rounded-xl border border-border p-4 transition hover:border-violet-300 hover:shadow-sm"
                >
                  <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                    {m.titreDevis}
                  </span>
                  <span className="mt-1 text-sm leading-6 text-muted-foreground">
                    Modèle Word gratuit avec lignes d&apos;exemple chiffrées et mentions
                    obligatoires.
                  </span>
                </Link>
                <Link
                  href={`/modeles/facture-${m.metier}`}
                  className="group flex flex-col rounded-xl border border-border p-4 transition hover:border-violet-300 hover:shadow-sm"
                >
                  <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                    {m.titreFacture}
                  </span>
                  <span className="mt-1 text-sm leading-6 text-muted-foreground">
                    Modèle Word gratuit : numérotation, TVA, conditions de règlement.
                  </span>
                </Link>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
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
