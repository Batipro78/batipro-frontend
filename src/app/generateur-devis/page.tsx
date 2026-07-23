import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import GenerateurDevis from '@/components/generateur/GenerateurDevis';

const BASE = 'https://www.mondevisminute.com';
const URL_PAGE = `${BASE}/generateur-devis`;

export const metadata: Metadata = {
  title: { absolute: 'Générateur de devis en ligne gratuit (PDF) — sans inscription' },
  description:
    "Faites votre devis en ligne gratuitement : remplissez vos lignes, la TVA et les totaux se calculent seuls, téléchargez le PDF. Sans inscription, sans logiciel.",
  alternates: { canonical: URL_PAGE },
  openGraph: {
    type: 'website',
    url: URL_PAGE,
    locale: 'fr_FR',
    siteName: 'MonDevisMinute',
    title: 'Générateur de devis en ligne gratuit (PDF)',
    description:
      "Créez un devis professionnel en ligne et téléchargez-le en PDF. Gratuit, sans inscription : totaux HT/TVA/TTC calculés automatiquement.",
  },
};

const FAQ = [
  {
    q: 'Ce générateur de devis est-il vraiment gratuit ?',
    a: "Oui : vous pouvez créer et télécharger jusqu'à 7 devis en PDF sans créer de compte et sans donner votre carte bancaire. Au-delà, nous vous proposons de créer un compte gratuit MonDevisMinute, qui enregistre vos coordonnées et vos mentions une fois pour toutes.",
  },
  {
    q: 'Le devis généré est-il conforme pour un artisan ?',
    a: "Le PDF reprend la structure attendue d'un devis de travaux : identité de l'entreprise (SIRET, mention de franchise de TVA le cas échéant), client et adresse du chantier, numéro, date et durée de validité, décompte détaillé ligne par ligne, totaux HT/TVA/TTC, assurance professionnelle et bloc « bon pour accord ». C'est à vous de remplir chaque champ correctement — notre guide des mentions obligatoires les explique une par une.",
  },
  {
    q: 'Comment la TVA est-elle calculée ?',
    a: "Vous choisissez le taux ligne par ligne (20 %, 10 %, 5,5 % ou 0 %) : le générateur calcule la TVA par taux et le total TTC automatiquement. Si vous êtes en franchise de TVA, cochez la case dédiée : le devis porte alors la mention « TVA non applicable, article 293 B du CGI » et aucun taux n'est appliqué.",
  },
  {
    q: 'Mes informations sont-elles enregistrées ?',
    a: "Non. Tout se passe dans votre navigateur : ce que vous tapez dans le formulaire n'est pas envoyé sur nos serveurs, et le PDF est fabriqué directement sur votre appareil. Nous comptons uniquement le nombre d'utilisations de l'outil.",
  },
  {
    q: 'Puis-je faire aussi ma facture ?',
    a: "Le générateur produit des devis. Pour les factures, téléchargez nos modèles Word gratuits par métier, ou créez un compte MonDevisMinute : le devis accepté s'y transforme en facture en un clic, avec la numérotation continue obligatoire gérée automatiquement.",
  },
];

export default function GenerateurDevisPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${URL_PAGE}#app`,
        name: 'Générateur de devis en ligne gratuit',
        url: URL_PAGE,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'fr-FR',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        publisher: { '@type': 'Organization', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Générateur de devis', item: URL_PAGE },
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
          <span className="text-foreground">Générateur de devis</span>
        </nav>

        <header className="mt-8 rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              100 % gratuit
            </span>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
              Sans inscription
            </span>
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
              PDF instantané
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Générateur de devis en ligne gratuit
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Remplissez vos lignes, la TVA et les totaux se calculent tout seuls, téléchargez
            votre devis en PDF. Gratuit, sans inscription, directement dans votre navigateur —
            vos informations ne quittent pas votre appareil.
          </p>
        </header>

        <GenerateurDevis />

        <section className="mt-16 max-w-3xl">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Comment faire un devis en ligne avec cet outil
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Trois étapes. D&apos;abord, vos informations d&apos;entreprise : nom, adresse, SIRET,
            et votre situation de TVA — si vous êtes en franchise, une case à cocher ajoute la
            mention « TVA non applicable, article 293 B du CGI » à votre place. Ensuite, le
            client et les références du devis : numéro, date, durée de validité, objet. Enfin,
            vos prestations, une ligne par poste : désignation, unité (forfait, heure, m²…),
            quantité, prix unitaire hors taxes et taux de TVA. Le total HT, la TVA par taux et
            le total TTC s&apos;affichent en temps réel. Un clic, et votre devis part en PDF,
            prêt à envoyer.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Le PDF suit la trame d&apos;un devis de travaux en bonne et due forme : en-tête
            entreprise, bloc client avec adresse du chantier, décompte détaillé, totaux, mention
            d&apos;assurance professionnelle et bloc « bon pour accord » à faire signer. Pour
            savoir quoi écrire dans chaque champ — et pourquoi —, appuyez-vous sur notre guide
            des{' '}
            <Link
              href="/guides/mentions-obligatoires-devis-batiment"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              mentions obligatoires du devis bâtiment
            </Link>{' '}
            et sur notre guide{' '}
            <Link
              href="/guides/taux-tva-travaux-renovation"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              TVA sur les travaux
            </Link>{' '}
            pour choisir le bon taux.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Si vous préférez travailler dans Word, nous proposons aussi des{' '}
            <Link
              href="/modeles"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              modèles de devis et de factures gratuits par métier
            </Link>{' '}
            — électricien, plombier, maçon, peintre… — avec des lignes d&apos;exemple chiffrées
            propres à chaque activité.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Et si vous faites des devis toutes les semaines, la vraie économie de temps est
            ailleurs : avec un compte MonDevisMinute, vos coordonnées, votre assurance et vos
            conditions sont enregistrées une fois pour toutes, la numérotation est automatique,
            le devis accepté devient une facture en un clic — et vous pouvez dicter le devis à
            la voix depuis le chantier, en 30 secondes. Essai gratuit de 14 jours, sans carte
            bancaire.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Questions fréquentes
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

        <p className="mt-16 max-w-3xl rounded-xl border border-border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
          Cet outil a une vocation d&apos;aide pratique et ne constitue pas un conseil juridique
          ou fiscal : le contenu du devis (désignations, prix, taux de TVA, mentions propres à
          votre situation) reste sous votre responsabilité. En cas de doute, rapprochez-vous de
          votre comptable ou de votre organisation professionnelle.
        </p>
      </main>
    </GuideShell>
  );
}
