import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aide & Questions fréquentes — MonDevisMinute',
  description:
    'Centre d\'aide MonDevisMinute : questions fréquentes, contact support, guide de prise en main pour les artisans du bâtiment.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.mondevisminute.com/aide' },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Comment créer mon premier devis vocal ?',
    a: 'Depuis l\'écran d\'accueil, appuyez sur le bouton micro. Dictez votre devis comme vous le pensez, par exemple : "100 mètres de câble 3G2.5, un tableau électrique 4 rangées, 5 prises de courant et 8 disjoncteurs 16A". L\'application reconnaît chaque article, applique le prix de référence 2026, calcule la TVA, et génère le devis en PDF. Vous pouvez ensuite l\'éditer, le signer ou l\'envoyer directement à votre client.',
  },
  {
    q: 'Quels métiers du BTP sont couverts ?',
    a: '14 métiers actuellement : électricien, plombier, chauffagiste, peintre, maçon, couvreur, charpentier, menuisier, plaquiste, carreleur, serrurier, paysagiste, et leurs variantes. Le catalogue contient plus de 700 articles avec des prix de référence 2026 issus des principaux fournisseurs professionnels (Rexel, Sonepar, Cedeo, Point P).',
  },
  {
    q: 'Comment ajouter le logo de mon entreprise sur les devis ?',
    a: 'Allez dans Profil → Logo entreprise → Choisir une photo. Le logo apparaîtra automatiquement en haut à gauche de tous vos devis et factures PDF. Formats supportés : PNG ou JPG (max 2 Mo).',
  },
  {
    q: 'Comment renseigner mes mentions légales obligatoires ?',
    a: 'Dans Profil, remplissez les champs suivants : SIRET, RCS/RM, numéro de TVA intracommunautaire, code NAF, et surtout vos informations d\'assurance décennale (assureur, numéro de contrat, zone de couverture). Ces informations apparaissent automatiquement en pied de page de tous vos devis et factures, en conformité avec la réglementation BTP française.',
  },
  {
    q: 'Comment fonctionne l\'essai gratuit ?',
    a: 'Vous avez 14 jours d\'essai gratuit, sans carte bancaire requise, avec accès à toutes les fonctionnalités. À la fin de l\'essai, vous pouvez vous abonner pour 29 € par mois, sans engagement et sans frais cachés.',
  },
  {
    q: 'Comment annuler mon abonnement ?',
    a: 'Allez dans Profil → Abonnement → Gérer mon abonnement. Vous serez redirigé vers le portail Stripe sécurisé où vous pouvez annuler à tout moment, en un clic. L\'annulation prend effet à la fin de la période en cours, sans frais supplémentaires.',
  },
  {
    q: 'Comment faire signer un devis à distance par mon client ?',
    a: 'Ouvrez le devis, appuyez sur "Envoyer pour signature". Un lien sécurisé est généré et envoyé à votre client par email. Il peut signer depuis son téléphone ou ordinateur, sans créer de compte. Vous recevez une notification dès que la signature est faite.',
  },
  {
    q: 'Comment convertir un devis en facture ?',
    a: 'Sur la fiche du devis signé, appuyez sur "Facturer ce devis". La facture est créée automatiquement avec toutes les lignes du devis, le bon numéro de série et la TVA correcte. Vous pouvez ensuite enregistrer les paiements reçus.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Oui. Toutes vos données sont chiffrées en transit (HTTPS) et stockées sur des serveurs européens (Supabase, Vercel UE). Vos mots de passe sont hachés avec bcrypt. Nous sommes conformes au RGPD : vous pouvez exporter ou supprimer toutes vos données à tout moment depuis votre profil.',
  },
  {
    q: 'Comment supprimer mon compte ?',
    a: 'Profil → Mes données → Supprimer mon compte. La suppression est irréversible : vos données personnelles sont anonymisées immédiatement. Les documents comptables (devis, factures) sont conservés en archive pendant 10 ans pour respecter l\'obligation légale française (article L123-22 du Code de commerce), mais ne contiennent plus de données identifiantes.',
  },
];

export default function AidePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>Aide</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">Aide et questions fréquentes</h1>
        <p className="mt-2 text-muted-foreground">
          Tout ce qu&apos;il faut savoir pour bien démarrer avec MonDevisMinute.
        </p>

        <section className="mt-10 rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold">Une question, un problème ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Notre équipe vous répond sous 24h ouvrées en français.
          </p>
          <p className="mt-4">
            <a
              href="mailto:mondevisminute@zohomail.eu"
              className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Nous contacter par email
            </a>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Adresse :{' '}
            <a href="mailto:mondevisminute@zohomail.eu" className="underline">
              mondevisminute@zohomail.eu
            </a>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight">Questions fréquentes</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map((item, i) => (
              <details key={i} className="group rounded-lg border bg-card p-5 open:bg-accent/30">
                <summary className="cursor-pointer list-none text-base font-semibold text-foreground flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border bg-muted/30 p-6">
          <h2 className="text-lg font-semibold">Vous ne trouvez pas votre réponse ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Écrivez-nous, on revient vers vous dans la journée.
          </p>
          <a
            href="mailto:mondevisminute@zohomail.eu"
            className="mt-4 inline-block underline"
          >
            mondevisminute@zohomail.eu
          </a>
        </section>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground flex flex-wrap gap-4">
          <Link href="/cgu" className="hover:text-foreground">
            Conditions Générales d&apos;Utilisation
          </Link>
          <span>·</span>
          <Link href="/confidentialite" className="hover:text-foreground">
            Politique de confidentialité
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-foreground">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
