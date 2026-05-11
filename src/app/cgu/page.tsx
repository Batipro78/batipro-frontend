import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — MonDevisMinute",
  description:
    "Conditions Générales d'Utilisation de MonDevisMinute : objet, acceptation, abonnement, RGPD, propriété intellectuelle.",
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    title: '1. Objet',
    body: "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation de la plateforme MonDevisMinute, accessible via l'application web et mobile. MonDevisMinute est un service de gestion destiné aux artisans du bâtiment, incluant la création de devis, factures, la gestion de clients et l'assistance vocale par intelligence artificielle.",
  },
  {
    title: '2. Acceptation des CGU',
    body: "L'utilisation de MonDevisMinute implique l'acceptation pleine et entière des présentes CGU. En cliquant sur « J'accepte les conditions », l'Utilisateur reconnaît avoir pris connaissance de l'ensemble des présentes conditions et les accepter sans réserve.",
  },
  {
    title: '3. Description du service',
    body: "MonDevisMinute propose les fonctionnalités suivantes : création et gestion de devis et factures, gestion de la base clients, dictée vocale assistée par IA pour la création de devis, catalogue d'articles et de prix, génération de documents PDF, et mode comparatif multi-gammes.",
  },
  {
    title: '4. Inscription et compte',
    body: "L'Utilisateur s'engage à fournir des informations exactes lors de son inscription et à maintenir la confidentialité de ses identifiants de connexion. Toute utilisation du compte est réputée faite par l'Utilisateur lui-même.",
  },
  {
    title: '5. Protection des données personnelles',
    body: "Conformément au Règlement Général sur la Protection des Données (RGPD), MonDevisMinute s'engage à protéger les données personnelles de ses utilisateurs. Les données collectées sont nécessaires au fonctionnement du service et ne sont pas cédées à des tiers. L'Utilisateur dispose d'un droit d'accès, de rectification, de portabilité et de suppression de ses données. Voir notre politique de confidentialité pour plus de détails.",
  },
  {
    title: '6. Propriété intellectuelle',
    body: "L'ensemble des éléments de MonDevisMinute (logiciel, interface, contenus, marques) sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.",
  },
  {
    title: '7. Responsabilité',
    body: "MonDevisMinute s'efforce d'assurer la disponibilité et la fiabilité du service, mais ne saurait être tenu responsable des interruptions temporaires, des erreurs de transcription vocale ou des inexactitudes dans les prix du catalogue. L'Utilisateur reste seul responsable de la vérification des devis et factures générés.",
  },
  {
    title: '8. Abonnement et paiement',
    body: "L'accès à MonDevisMinute est soumis à un abonnement payant après une période d'essai gratuite de 14 jours. Les tarifs et modalités de paiement sont détaillés sur la page d'abonnement (29 €/mois ou 290 €/an). Les paiements sont gérés par Stripe. L'Utilisateur peut résilier son abonnement à tout moment depuis le portail Stripe accessible via son profil.",
  },
  {
    title: '9. Modification des CGU',
    body: "MonDevisMinute se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle et devront accepter les nouvelles conditions pour continuer à utiliser le service.",
  },
  {
    title: '10. Droit applicable',
    body: "Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents de Paris.",
  },
];

export default function CguPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Conditions Générales d&apos;Utilisation</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : 11 mai 2026
        </p>

        <div className="prose prose-slate mt-8 max-w-none">
          {SECTIONS.map((section) => (
            <section key={section.title} className="mt-8">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-2 text-muted-foreground">{section.body}</p>
            </section>
          ))}

          <section className="mt-8">
            <h2 className="text-xl font-semibold">11. Contact</h2>
            <p className="mt-2 text-muted-foreground">
              Pour toute question relative aux présentes CGU :{' '}
              <a
                href="mailto:contact@mondevisminute.com"
                className="underline"
              >
                contact@mondevisminute.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          <Link href="/confidentialite" className="hover:text-foreground">
            Politique de confidentialité
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
