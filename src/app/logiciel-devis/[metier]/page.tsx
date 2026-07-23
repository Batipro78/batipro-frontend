import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideShell from '@/components/guides/GuideShell';
import { logicielMetiers, getLogicielMetier } from '@/content/logiciel';
import { METIER_LABEL, METIER_ICON, metierBadgeClass } from '@/lib/metiers';

const BASE = 'https://www.mondevisminute.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return logicielMetiers.map((m) => ({ metier: m.metier }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string }>;
}): Promise<Metadata> {
  const { metier } = await params;
  const page = getLogicielMetier(metier);
  if (!page) return {};

  const url = `${BASE}/logiciel-devis/${page.metier}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      locale: 'fr_FR',
      siteName: 'MonDevisMinute',
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: { card: 'summary', title: page.metaTitle, description: page.metaDescription },
  };
}

const INCLUS = [
  'Devis et factures illimités',
  'Dictée vocale sur 14 métiers BTP',
  'Bibliothèque de 524 articles BTP chiffrés',
  'Signature électronique mobile (eIDAS)',
  'Gestion clients et chantiers illimitée',
  'Données hébergées en France · RGPD',
];

export default async function LogicielMetierPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const page = getLogicielMetier(metier);
  if (!page) notFound();

  const url = `${BASE}/logiciel-devis/${page.metier}`;
  const Icone = METIER_ICON[page.metier];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Logiciel de devis par métier',
            item: `${BASE}/logiciel-devis`,
          },
          { '@type': 'ListItem', position: 3, name: page.titre, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
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

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/logiciel-devis" className="transition hover:text-foreground">
            Logiciel de devis
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{METIER_LABEL[page.metier]}</span>
        </nav>

        <header className="mt-8 rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-md">
              <Icone className="h-6 w-6" />
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${metierBadgeClass(page.metier)}`}
            >
              {METIER_LABEL[page.metier]}
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              Essai 14 jours sans CB
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{page.excerpt}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
            >
              Essayer gratuitement 14 jours
            </Link>
            <Link
              href="/generateur-devis"
              className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Ou tester le générateur gratuit
            </Link>
          </div>
        </header>

        <article className="mt-12">
          {page.intro.map((p) => (
            <p key={p.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">
              {p}
            </p>
          ))}

          <h2 className="mt-12 border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Ce que ça change au quotidien
          </h2>
          <ul className="mt-6 space-y-3">
            {page.atouts.map((a) => (
              <li key={a} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500" />
                <span className="leading-7 text-muted-foreground">{a}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Vous dictez, le devis s&apos;écrit
            </h2>
            <p className="mt-4 rounded-xl border border-violet-200 bg-white p-4 italic leading-8 text-foreground">
              {page.exempleDictee}
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Trente secondes plus tard, le devis structuré est à l&apos;écran : une ligne par
              prestation, quantités et prix modifiables, TVA calculée, mentions en place. Vous
              relisez, vous ajustez, vous envoyez.
            </p>
          </div>

          <h2 className="mt-12 border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Tout est inclus, un seul prix
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            MonDevisMinute coûte 29&nbsp;€&nbsp;HT par mois — ou 290&nbsp;€&nbsp;HT par an, deux
            mois offerts — sans plan supérieur ni option cachée. L&apos;essai de 14 jours donne
            accès à tout, sans carte bancaire. Le détail est sur la{' '}
            <Link
              href="/tarifs"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              page tarifs
            </Link>
            .
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INCLUS.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm leading-7 text-muted-foreground">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </article>

        <section className="mt-16">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-6">
            {page.faq.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border border-l-4 border-l-sky-400 bg-sky-50/40 p-5"
              >
                <dt className="font-display font-bold text-sky-950">{item.q}</dt>
                <dd className="mt-2 leading-8 text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Ressources gratuites pour votre métier
          </h2>
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href={`/modeles/devis-${page.metier}`}
                className="group flex flex-col rounded-xl border border-border border-l-4 border-l-violet-500 p-4 transition hover:border-violet-300 hover:shadow-sm"
              >
                <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                  Modèle de devis gratuit (Word)
                </span>
                <span className="mt-1 text-sm leading-7 text-muted-foreground">
                  À télécharger et personnaliser — lignes d&apos;exemple chiffrées du métier.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/modeles/facture-${page.metier}`}
                className="group flex flex-col rounded-xl border border-border border-l-4 border-l-sky-500 p-4 transition hover:border-sky-300 hover:shadow-sm"
              >
                <span className="font-display font-bold text-foreground transition group-hover:text-sky-700">
                  Modèle de facture gratuit (Word)
                </span>
                <span className="mt-1 text-sm leading-7 text-muted-foreground">
                  Numérotation, TVA, conditions de règlement : les mentions en place.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/generateur-devis"
                className="group flex flex-col rounded-xl border border-border border-l-4 border-l-emerald-500 p-4 transition hover:border-emerald-300 hover:shadow-sm"
              >
                <span className="font-display font-bold text-foreground transition group-hover:text-emerald-700">
                  Générateur de devis en ligne gratuit
                </span>
                <span className="mt-1 text-sm leading-7 text-muted-foreground">
                  Faites un devis en PDF directement dans votre navigateur, sans inscription.
                </span>
              </Link>
            </li>
          </ul>

          <h3 className="mt-10 font-display text-lg font-bold tracking-tight text-foreground">
            Le logiciel pour les autres métiers
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {logicielMetiers
              .filter((m) => m.metier !== page.metier)
              .map((m) => (
                <Link
                  key={m.metier}
                  href={`/logiciel-devis/${m.metier}`}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition hover:shadow-sm ${metierBadgeClass(m.metier)}`}
                >
                  {METIER_LABEL[m.metier]}
                </Link>
              ))}
          </div>
        </section>
      </main>
    </GuideShell>
  );
}
