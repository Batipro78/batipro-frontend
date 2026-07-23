import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import { logicielMetiers } from '@/content/logiciel';
import { METIER_LABEL, METIER_ICON, metierBadgeClass } from '@/lib/metiers';

const BASE = 'https://www.mondevisminute.com';
const URL_PAGE = `${BASE}/logiciel-devis`;

export const metadata: Metadata = {
  title: { absolute: 'Logiciel de devis pour artisans du bâtiment, par métier' },
  description:
    "Un logiciel de devis et factures adapté à chaque métier du BTP : électricien, plombier, maçon, peintre… Dictée vocale, 29 € HT/mois tout inclus, essai 14 jours gratuit.",
  alternates: { canonical: URL_PAGE },
  openGraph: {
    type: 'website',
    url: URL_PAGE,
    locale: 'fr_FR',
    siteName: 'MonDevisMinute',
    title: 'Logiciel de devis pour artisans, par métier',
    description:
      "Devis et factures adaptés à chaque métier du bâtiment, avec dictée vocale. Essai gratuit 14 jours sans carte bancaire.",
  },
};

export default function LogicielDevisPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': URL_PAGE,
        name: 'Logiciel de devis pour artisans du bâtiment, par métier',
        description:
          'Le logiciel de devis et factures MonDevisMinute, présenté métier par métier.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Logiciel de devis', item: URL_PAGE },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: logicielMetiers.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: m.titre,
          url: `${BASE}/logiciel-devis/${m.metier}`,
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

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Logiciel de devis</span>
        </nav>

        <header className="mt-8 rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
              14 métiers couverts
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              Essai 14 jours sans CB
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Un logiciel de devis qui parle le langage de votre métier
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Un devis d&apos;électricien ne ressemble pas à un devis de maçon, et un logiciel
            générique vous fait perdre du temps sur les deux. MonDevisMinute couvre 14 métiers
            du bâtiment avec la même promesse : vous dictez l&apos;intervention à la voix, le
            devis structuré sort en 30 secondes — quantités, TVA, mentions obligatoires
            comprises. Choisissez votre métier pour voir ce que ça change concrètement.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {logicielMetiers.map((m) => {
            const Icone = METIER_ICON[m.metier];
            return (
              <Link
                key={m.metier}
                href={`/logiciel-devis/${m.metier}`}
                className="group flex items-start gap-3 rounded-2xl border border-border bg-white p-5 transition hover:border-violet-300 hover:shadow-md"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow">
                  <Icone className="h-5 w-5" />
                </span>
                <span>
                  <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                    {METIER_LABEL[m.metier]}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    {m.titre}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            La même base, adaptée à chaque métier
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Le cœur du logiciel est commun : devis et factures illimités, bibliothèque de 524
            articles BTP chiffrés, TVA calculée ligne par ligne, mentions obligatoires et
            assurance en place, signature électronique mobile, devis transformé en facture en
            un clic. Ce qui change d&apos;un métier à l&apos;autre, c&apos;est la façon de
            chiffrer — au point lumineux, au mètre carré, au volume — et le vocabulaire que la
            dictée vocale doit comprendre. C&apos;est exactement ce que les pages métier
            détaillent.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Le prix, lui, ne change pas : 29&nbsp;€&nbsp;HT par mois, tout inclus — voir la{' '}
            <Link
              href="/tarifs"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              page tarifs
            </Link>
            . Et pour essayer sans créer de compte, le{' '}
            <Link
              href="/generateur-devis"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              générateur de devis en ligne gratuit
            </Link>{' '}
            et les{' '}
            <Link
              href="/modeles"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              modèles Word par métier
            </Link>{' '}
            sont à votre disposition.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-2">
          {logicielMetiers.map((m) => (
            <Link
              key={m.metier}
              href={`/logiciel-devis/${m.metier}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition hover:shadow-sm ${metierBadgeClass(m.metier)}`}
            >
              {METIER_LABEL[m.metier]}
            </Link>
          ))}
        </div>
      </main>
    </GuideShell>
  );
}
