import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — MonDevisMinute',
  description:
    'Politique de confidentialité de MonDevisMinute. Comment nous protégeons vos données personnelles conformément au RGPD.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.mondevisminute.com/confidentialite' },
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Politique de confidentialité</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : 11 mai 2026
        </p>

        <div className="prose prose-slate mt-8 max-w-none">
          <p>
            La présente politique de confidentialité décrit comment MonDevisMinute (« nous », « notre »)
            collecte, utilise et protège vos données personnelles lorsque vous utilisez notre
            plateforme (application web et mobile), conformément au Règlement Général sur la
            Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>

          <h2 className="mt-8 text-xl font-semibold">1. Responsable du traitement</h2>
          <p>
            MonDevisMinute est éditée par Fethi Ameur, exerçant en France. Pour toute question
            relative à vos données, vous pouvez nous contacter à l&apos;adresse :{' '}
            <a href="mailto:mondevisminute@zohomail.eu" className="underline">
              mondevisminute@zohomail.eu
            </a>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Données collectées</h2>
          <p>Nous collectons les catégories de données suivantes :</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Données d&apos;identification</strong> : nom, prénom, adresse email, numéro
              de téléphone, mot de passe (haché).
            </li>
            <li>
              <strong>Données professionnelles</strong> : nom de l&apos;entreprise, SIRET,
              adresse, ville, code postal, numéro de TVA intracommunautaire, mention RCS/RM,
              assurance décennale (assureur, numéro, zone).
            </li>
            <li>
              <strong>Données métier</strong> : devis, factures, clients, articles que vous
              créez dans l&apos;application.
            </li>
            <li>
              <strong>Données techniques</strong> : journaux de connexion, adresse IP,
              user-agent, identifiants de session.
            </li>
            <li>
              <strong>Données vocales</strong> : enregistrements audio temporaires lorsque vous
              utilisez la dictée vocale pour créer un devis. Ces fichiers sont transcrits puis
              supprimés.
            </li>
            <li>
              <strong>Données de paiement</strong> : aucune donnée de carte bancaire n&apos;est
              stockée sur nos serveurs. Les paiements sont traités exclusivement par Stripe (voir
              §5).
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">3. Finalités et bases légales</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Fournir le service</strong> (création de devis, factures, gestion clients) —
              base légale : exécution du contrat.
            </li>
            <li>
              <strong>Gestion du compte</strong> (inscription, authentification, support) —
              exécution du contrat.
            </li>
            <li>
              <strong>Facturation et abonnement</strong> — exécution du contrat.
            </li>
            <li>
              <strong>Sécurité de la plateforme</strong> (détection de fraude, journalisation) —
              intérêt légitime.
            </li>
            <li>
              <strong>Amélioration du service</strong> (analyse anonymisée d&apos;utilisation) —
              intérêt légitime.
            </li>
            <li>
              <strong>Communications de service</strong> (vérification email, reset password,
              notifications de paiement) — exécution du contrat.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">4. Durées de conservation</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Compte actif</strong> : durée de votre abonnement.
            </li>
            <li>
              <strong>Compte supprimé</strong> : vos données personnelles sont anonymisées
              immédiatement. Les documents comptables (devis, factures) sont conservés en archive
              pendant 10 ans conformément à l&apos;obligation légale française (article L123-22 du
              Code de commerce), mais ne contiennent plus de données identifiantes.
            </li>
            <li>
              <strong>Journaux techniques</strong> : 12 mois.
            </li>
            <li>
              <strong>Enregistrements audio</strong> : supprimés immédiatement après transcription.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">5. Destinataires et sous-traitants</h2>
          <p>
            Vos données peuvent être transmises aux prestataires suivants, strictement dans le
            cadre de leur mission et sous obligation de confidentialité :
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Supabase</strong> (hébergement de base de données et stockage) — UE/USA,
              clauses contractuelles types.
            </li>
            <li>
              <strong>Render</strong> (hébergement du backend API) — USA, clauses contractuelles
              types.
            </li>
            <li>
              <strong>Vercel</strong> (hébergement du frontend web) — USA, clauses contractuelles
              types.
            </li>
            <li>
              <strong>Stripe</strong> (gestion des paiements et abonnements) — Irlande/USA,
              certifié PCI-DSS.
            </li>
            <li>
              <strong>OpenAI</strong> (transcription audio Whisper pour la dictée vocale) — USA,
              clauses contractuelles types. Les audios sont supprimés après transcription.
            </li>
            <li>
              <strong>Brevo / SendGrid</strong> (envoi des emails transactionnels) — UE.
            </li>
          </ul>
          <p>
            Aucune donnée n&apos;est vendue ou cédée à des tiers à des fins commerciales.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Vos droits RGPD</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Droit d&apos;accès</strong> : export complet de vos données depuis{' '}
              <Link href="/profil" className="underline">
                Profil → Mes données → Exporter mes données
              </Link>{' '}
              (fichier JSON).
            </li>
            <li>
              <strong>Droit de rectification</strong> : modifiez vos informations à tout moment
              depuis votre profil.
            </li>
            <li>
              <strong>Droit à l&apos;effacement</strong> : suppression de votre compte et
              anonymisation immédiate depuis Profil → Mes données → Supprimer mon compte. Action
              irréversible.
            </li>
            <li>
              <strong>Droit à la portabilité</strong> : l&apos;export JSON est dans un format
              ouvert et structuré.
            </li>
            <li>
              <strong>Droit d&apos;opposition et de limitation</strong> : contactez-nous à{' '}
              <a href="mailto:mondevisminute@zohomail.eu" className="underline">
                mondevisminute@zohomail.eu
              </a>
              .
            </li>
            <li>
              <strong>Droit d&apos;introduire une réclamation</strong> auprès de la CNIL si vous
              estimez que vos droits ne sont pas respectés :{' '}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                www.cnil.fr
              </a>
              .
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">7. Sécurité</h2>
          <ul className="list-disc pl-6">
            <li>Chiffrement TLS de toutes les communications (HTTPS).</li>
            <li>Mots de passe hachés avec bcrypt.</li>
            <li>Authentification par jeton JWT signé à durée limitée.</li>
            <li>Sauvegardes quotidiennes chiffrées.</li>
            <li>Journaux d&apos;audit RGPD (table `rgpd_logs`).</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">8. Cookies</h2>
          <p>
            La plateforme web utilise uniquement des cookies techniques strictement nécessaires
            au fonctionnement (session, préférences). Aucun cookie publicitaire ni de mesure
            d&apos;audience tiers n&apos;est déposé.
          </p>

          <h2 className="mt-8 text-xl font-semibold">9. Données des mineurs</h2>
          <p>
            MonDevisMinute est un service à destination des professionnels et n&apos;est pas
            adressé aux personnes de moins de 18 ans. Aucune donnée de mineur n&apos;est
            sciemment collectée.
          </p>

          <h2 className="mt-8 text-xl font-semibold">10. Modifications</h2>
          <p>
            Toute modification de cette politique sera notifiée aux utilisateurs par email et
            affichée sur cette page. La date de dernière mise à jour figure en haut.
          </p>

          <h2 className="mt-8 text-xl font-semibold">11. Contact</h2>
          <p>
            Pour exercer vos droits ou pour toute question :{' '}
            <a href="mailto:mondevisminute@zohomail.eu" className="underline">
              mondevisminute@zohomail.eu
            </a>
            .
          </p>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          <Link href="/cgu" className="hover:text-foreground">
            Conditions Générales d&apos;Utilisation
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
