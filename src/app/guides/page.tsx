import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import { guides } from '@/content/guides';
import { readingMinutes } from '@/lib/guides';

const BASE = 'https://www.mondevisminute.com';

export const metadata: Metadata = {
  title: { absolute: 'Guides pour artisans : devis, factures, TVA et obligations' },
  description:
    "Guides complets pour les artisans du bâtiment : mentions obligatoires du devis et de la facture, taux de TVA, facturation électronique, chiffrage, impayés.",
  alternates: { canonical: `${BASE}/guides` },
  openGraph: {
    type: 'website',
    url: `${BASE}/guides`,
    locale: 'fr_FR',
    siteName: 'MonDevisMinute',
    title: 'Guides pour artisans du bâtiment',
    description:
      'Devis, factures, TVA, chiffrage, impayés : les guides de référence pour les artisans du bâtiment.',
  },
};

/** Regroupe les guides par catégorie en conservant l'ordre de déclaration. */
function byCategory() {
  const map = new Map<string, typeof guides>();
  for (const guide of guides) {
    const list = map.get(guide.category) ?? [];
    list.push(guide);
    map.set(guide.category, list);
  }
  return [...map.entries()];
}

export default function GuidesIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${BASE}/guides`,
        name: 'Guides pour artisans du bâtiment',
        description:
          "Guides pratiques sur les devis, les factures, la TVA et les obligations légales des artisans du bâtiment.",
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: guides.map((guide, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: guide.title,
          url: `${BASE}/guides/${guide.slug}`,
        })),
      },
    ],
  };

  return (
    <GuideShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Guides</span>
        </nav>

        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Guides pour les artisans du bâtiment
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Tout ce qu&apos;il faut savoir pour établir des devis et des factures conformes,
          appliquer le bon taux de TVA, chiffrer correctement un chantier et se faire payer.
          Écrits pour être lus une fois et appliqués ensuite.
        </p>

        <div className="mt-12 space-y-14">
          {byCategory().map(([category, list]) => (
            <section key={category}>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                {category}
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {list.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-white p-5 transition hover:border-violet-300 hover:shadow-md"
                  >
                    <h3 className="font-display text-lg font-bold leading-tight text-foreground transition group-hover:text-violet-700">
                      {guide.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {guide.excerpt}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {readingMinutes(guide)} min de lecture
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </GuideShell>
  );
}
