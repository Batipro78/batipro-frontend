import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';

const BASE = 'https://www.mondevisminute.com';
const URL_PAGE = `${BASE}/tarifs`;

export const metadata: Metadata = {
  title: { absolute: 'Tarifs MonDevisMinute — 29 € HT/mois, tout inclus' },
  description:
    "Le prix de MonDevisMinute : 29 € HT par mois ou 290 € HT par an (2 mois offerts). Devis et factures illimités, dictée vocale, essai gratuit 14 jours sans carte bancaire.",
  alternates: { canonical: URL_PAGE },
  openGraph: {
    type: 'website',
    url: URL_PAGE,
    locale: 'fr_FR',
    siteName: 'MonDevisMinute',
    title: 'Tarifs MonDevisMinute — un seul prix, tout inclus',
    description:
      "29 € HT/mois ou 290 € HT/an. Devis et factures illimités, dictée vocale sur 14 métiers, essai 14 jours sans carte bancaire.",
  },
};

const INCLUS = [
  'Devis et factures illimités',
  'Dictée vocale sur 14 métiers BTP',
  'Bibliothèque de 524 articles BTP chiffrés',
  'Signature électronique mobile (eIDAS)',
  'Création éclair (bouton flottant)',
  'Gestion clients et chantiers illimitée',
  'Mises à jour incluses à vie',
  'Support par email sous 24 h',
  'Données hébergées en France · RGPD',
];

const FAQ = [
  {
    q: 'Le prix est-il HT ou TTC ?',
    a: "Les tarifs affichés sont hors taxes : 29 € HT par mois, ou 290 € HT par an. La TVA s'ajoute au taux en vigueur et figure sur chaque facture d'abonnement ; si votre entreprise est assujettie, vous la récupérez dans les conditions habituelles.",
  },
  {
    q: "Y a-t-il un engagement ou des frais cachés ?",
    a: "Non. L'abonnement mensuel s'annule à tout moment, en un clic, depuis votre compte — vous gardez l'accès jusqu'à la fin de la période déjà payée. Il n'y a ni frais d'installation, ni option payante cachée : un seul prix, toutes les fonctionnalités.",
  },
  {
    q: "Que se passe-t-il à la fin de l'essai gratuit ?",
    a: "L'essai dure 14 jours et ne demande aucune carte bancaire. À la fin, vous choisissez de vous abonner — ou pas. Comme aucune coordonnée bancaire n'a été saisie, aucun prélèvement ne peut avoir lieu sans votre accord explicite.",
  },
  {
    q: "L'abonnement annuel est-il vraiment plus avantageux ?",
    a: "290 € HT par an, soit l'équivalent de 24,17 € HT par mois : deux mois offerts par rapport au tarif mensuel. C'est la bonne option une fois que l'essai vous a convaincu.",
  },
  {
    q: 'Existe-t-il des fonctionnalités bloquées ou un plan supérieur ?',
    a: "Non, c'est un principe : un seul plan, tout inclus. Dictée vocale, devis illimités, factures, signature électronique, bibliothèque d'articles — tout est dans l'abonnement unique, et les mises à jour sont incluses.",
  },
];

export default function TarifsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${BASE}#app`,
        name: 'MonDevisMinute',
        url: BASE,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'fr-FR',
        description:
          'Logiciel de devis et factures pour artisans du bâtiment, avec dictée vocale.',
        offers: [
          {
            '@type': 'Offer',
            name: 'Abonnement mensuel',
            price: '29.00',
            priceCurrency: 'EUR',
            url: URL_PAGE,
          },
          {
            '@type': 'Offer',
            name: 'Abonnement annuel',
            price: '290.00',
            priceCurrency: 'EUR',
            url: URL_PAGE,
          },
        ],
        publisher: { '@type': 'Organization', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Tarifs', item: URL_PAGE },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((item) => ({
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

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Tarifs</span>
        </nav>

        <header className="mt-8 rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 text-center sm:p-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              14 jours gratuits
            </span>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
              Sans carte bancaire
            </span>
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
              Annulable en 1 clic
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Un seul prix. Toutes les fonctionnalités.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Pas de plan compliqué, pas de fonction bloquée derrière une option payante :
            29&nbsp;€&nbsp;HT par mois — ou 290&nbsp;€&nbsp;HT par an, deux mois offerts — et
            vous avez tout MonDevisMinute.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">Mensuel</h2>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                29&nbsp;€
              </span>
              <span className="text-muted-foreground">HT / mois</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sans engagement — annulable à tout moment, en un clic.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border-2 border-violet-600 px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Commencer l&apos;essai gratuit
            </Link>
          </section>

          <section className="relative rounded-2xl border-2 border-violet-500 bg-gradient-to-b from-violet-50/60 to-white p-6 shadow-lg shadow-violet-100 sm:p-8">
            <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow">
              2 mois offerts
            </span>
            <h2 className="font-display text-lg font-bold text-foreground">Annuel</h2>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                290&nbsp;€
              </span>
              <span className="text-muted-foreground">HT / an</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Soit 24,17&nbsp;€&nbsp;HT par mois — deux mois offerts par rapport au mensuel.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
            >
              Commencer l&apos;essai gratuit
            </Link>
          </section>
        </div>

        <section className="mt-12 rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Tout est inclus, quel que soit l&apos;abonnement
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INCLUS.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm leading-7 text-muted-foreground">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Pourquoi un seul prix ?
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Les logiciels de devis pour artisans empilent souvent trois ou quatre plans, avec
            la fonctionnalité dont vous avez vraiment besoin — la signature, l&apos;application
            mobile, le nombre de devis — rangée dans le plan du dessus. Nous avons fait le
            choix inverse : un abonnement unique à 29&nbsp;€&nbsp;HT par mois, qui comprend
            tout, y compris ce qui arrivera dans les prochaines mises à jour. Votre facturation
            reste prévisible, et vous n&apos;avez jamais à comparer des colonnes de plans.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Avant de vous abonner, l&apos;essai gratuit de 14 jours donne accès à tout, sans
            carte bancaire. Et si vous voulez d&apos;abord voir comment nous travaillons,
            essayez nos outils gratuits : le{' '}
            <Link
              href="/generateur-devis"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              générateur de devis en ligne
            </Link>{' '}
            et les{' '}
            <Link
              href="/modeles"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              modèles de devis et factures par métier
            </Link>
            .
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Questions fréquentes sur le tarif
          </h2>
          <dl className="mt-6 space-y-6">
            {FAQ.map((item) => (
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
      </main>
    </GuideShell>
  );
}
