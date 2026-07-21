import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Suppression de compte — MonDevisMinute',
  description:
    'Comment supprimer votre compte MonDevisMinute et vos données personnelles, directement dans l’application ou sur simple demande par email.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.mondevisminute.com/suppression-compte' },
};

export default function SuppressionComptePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Suppression de compte</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">
          Suppression de votre compte et de vos données
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : 1er juin 2026
        </p>

        <div className="prose prose-slate mt-8 max-w-none">
          <p>
            Cette page explique comment demander la suppression de votre compte MonDevisMinute
            et des données personnelles associées. Elle concerne l&apos;application mobile
            MonDevisMinute (éditée par Fethi Ameur) ainsi que la version web.
          </p>

          <h2 className="mt-8 text-xl font-semibold">1. Supprimer votre compte depuis l&apos;application</h2>
          <p>
            Vous pouvez supprimer votre compte à tout moment, directement depuis l&apos;application :
          </p>
          <ol className="list-decimal pl-6">
            <li>Connectez-vous à votre compte.</li>
            <li>
              Ouvrez la section <strong>Profil</strong> (ou <strong>Paramètres du compte</strong>).
            </li>
            <li>
              Sélectionnez <strong>Supprimer mon compte</strong> et confirmez.
            </li>
          </ol>
          <p>
            La suppression est définitive : elle entraîne l&apos;effacement de votre profil et
            l&apos;anonymisation de vos données personnelles.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Demander la suppression par email</h2>
          <p>
            Si vous ne pouvez pas accéder à l&apos;application, vous pouvez demander la suppression
            de votre compte et de vos données en écrivant à&nbsp;:{' '}
            <a href="mailto:mondevisminute@zohomail.eu" className="underline">
              mondevisminute@zohomail.eu
            </a>
            , avec pour objet «&nbsp;Suppression de compte&nbsp;» et l&apos;adresse email associée
            à votre compte. Nous traitons votre demande sous 30 jours maximum.
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Données supprimées et données conservées</h2>
          <p>
            Lors de la suppression de votre compte, les données suivantes sont
            <strong> supprimées ou anonymisées</strong>&nbsp;:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Données d&apos;identification : nom, prénom, adresse email, numéro de téléphone,
              mot de passe.
            </li>
            <li>
              Données professionnelles de profil : entreprise, SIRET, adresse, numéro de TVA,
              mentions RCS/RM, assurance décennale.
            </li>
            <li>Vos clients, articles personnalisés et paramètres.</li>
            <li>Journaux techniques et identifiants de session.</li>
          </ul>
          <p>
            Certaines données peuvent être <strong>conservées de façon limitée</strong> lorsque la
            loi française l&apos;impose, notamment&nbsp;: les devis et factures émis, conservés à des
            fins comptables et fiscales pendant la durée légale obligatoire (jusqu&apos;à 10 ans),
            sous une forme dissociée de votre profil. Ces documents ne sont plus utilisés à
            d&apos;autres fins.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Vos autres droits</h2>
          <p>
            Conformément au RGPD, vous disposez également d&apos;un droit d&apos;accès, de
            rectification et de portabilité de vos données. Pour en savoir plus, consultez notre{' '}
            <Link href="/confidentialite" className="underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
