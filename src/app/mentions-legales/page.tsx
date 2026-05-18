import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions légales — MonDevisMinute',
  description:
    'Mentions légales de MonDevisMinute : éditeur du site, hébergeur, propriété intellectuelle, contact.',
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Mentions légales</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">Mentions légales</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : 18 mai 2026
        </p>

        <div className="prose prose-slate mt-8 max-w-none">
          <section className="mt-8">
            <h2 className="text-xl font-semibold">1. Éditeur du site</h2>
            <p className="mt-2 text-muted-foreground">
              Le site MonDevisMinute, accessible à l&apos;adresse{' '}
              <a href="https://mondevisminute.com" className="underline">
                https://mondevisminute.com
              </a>
              , est édité par :
            </p>
            <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
              <li>Raison sociale : Fethi Ameur — Entrepreneur individuel</li>
              <li>Adresse du siège : [À COMPLÉTER — adresse postale]</li>
              <li>SIRET : [À COMPLÉTER — 14 chiffres]</li>
              <li>Code APE / NAF : [À COMPLÉTER]</li>
              <li>
                Adresse e-mail :{' '}
                <a href="mailto:mondevisminute@zohomail.eu" className="underline">
                  mondevisminute@zohomail.eu
                </a>
              </li>
              <li>Directeur de la publication : Fethi Ameur</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">2. Hébergement</h2>
            <p className="mt-2 text-muted-foreground">
              Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133,
              Covina, CA 91723, États-Unis. Site :{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://vercel.com
              </a>
              .
            </p>
            <p className="mt-2 text-muted-foreground">
              Les serveurs applicatifs (API) sont hébergés par Render Services
              Inc., 525 Brannan Street, San Francisco, CA 94107, États-Unis.
              La base de données et les fichiers utilisateurs sont hébergés
              par Supabase Inc. en région européenne (Francfort, Allemagne)
              afin de garantir la conformité RGPD.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">3. Propriété intellectuelle</h2>
            <p className="mt-2 text-muted-foreground">
              L&apos;ensemble du contenu présent sur le site MonDevisMinute
              (textes, images, logos, marques, code source, interface,
              fonctionnalités) est la propriété exclusive de l&apos;éditeur ou
              fait l&apos;objet d&apos;une licence d&apos;utilisation. Toute
              reproduction, représentation, modification, publication,
              adaptation ou exploitation, totale ou partielle, par quelque
              procédé que ce soit, sans autorisation écrite préalable, est
              interdite et constituerait une contrefaçon sanctionnée par les
              articles L.335-2 et suivants du Code de la propriété
              intellectuelle.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">4. Données personnelles</h2>
            <p className="mt-2 text-muted-foreground">
              Les modalités de collecte et de traitement des données
              personnelles sont détaillées dans notre{' '}
              <Link href="/confidentialite" className="underline">
                politique de confidentialité
              </Link>
              . Conformément au Règlement Général sur la Protection des
              Données (RGPD) et à la loi Informatique et Libertés, vous
              disposez d&apos;un droit d&apos;accès, de rectification, de
              portabilité, d&apos;effacement et d&apos;opposition au
              traitement de vos données. Pour exercer ces droits, contactez{' '}
              <a href="mailto:mondevisminute@zohomail.eu" className="underline">
                mondevisminute@zohomail.eu
              </a>
              .
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">5. Cookies</h2>
            <p className="mt-2 text-muted-foreground">
              Le site utilise des cookies techniques nécessaires à son bon
              fonctionnement (authentification, session) et des cookies de
              mesure d&apos;audience (Google Analytics) avec consentement.
              Vous pouvez gérer vos préférences depuis votre navigateur.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">6. Responsabilité</h2>
            <p className="mt-2 text-muted-foreground">
              MonDevisMinute met tout en œuvre pour assurer la disponibilité
              et la fiabilité du service. Toutefois, l&apos;éditeur ne saurait
              être tenu responsable des interruptions temporaires, erreurs ou
              omissions, ni des dommages directs ou indirects résultant de
              l&apos;utilisation du site. L&apos;utilisateur reste seul
              responsable de la vérification des devis, factures et autres
              documents générés par le service.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">7. Liens externes</h2>
            <p className="mt-2 text-muted-foreground">
              Le site peut contenir des liens vers des sites tiers.
              MonDevisMinute n&apos;exerce aucun contrôle sur ces sites et
              décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">8. Droit applicable</h2>
            <p className="mt-2 text-muted-foreground">
              Les présentes mentions légales sont régies par le droit
              français. En cas de litige, et après tentative de résolution
              amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">9. Contact</h2>
            <p className="mt-2 text-muted-foreground">
              Pour toute question relative aux présentes mentions légales ou
              au site MonDevisMinute :{' '}
              <a href="mailto:mondevisminute@zohomail.eu" className="underline">
                mondevisminute@zohomail.eu
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          <Link href="/cgu" className="hover:text-foreground">
            CGU
          </Link>
          <span className="mx-2">·</span>
          <Link href="/confidentialite" className="hover:text-foreground">
            Politique de confidentialité
          </Link>
          <span className="mx-2">·</span>
          <Link href="/contact" className="hover:text-foreground">
            Contact
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
