import { BookOpen, PenLine, ClipboardList, FileCheck2, Zap, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Bibliothèque 524 articles',
    desc: '14 métiers couverts : électricité, plomberie, maçonnerie, peinture, plâtrerie, carrelage, couverture, menuiserie. Prix moyens du marché pré-remplis.',
  },
  {
    icon: PenLine,
    title: 'Signature mobile eIDAS',
    desc: 'Vos clients signent depuis leur téléphone, sur le chantier ou à distance. Valeur juridique reconnue, horodatage certifié.',
  },
  {
    icon: ClipboardList,
    title: 'Situations & retenues 5 %',
    desc: 'Facturez vos chantiers en plusieurs fois. Retenue de garantie automatisée, libération à un an, conforme aux marchés publics et privés.',
  },
  {
    icon: FileCheck2,
    title: 'Facturation Factur-X',
    desc: 'Conforme à la réforme de septembre 2026. Factures électroniques générées et transmises automatiquement aux PDP.',
  },
  {
    icon: Zap,
    title: 'Création éclair',
    desc: 'Bouton flottant accessible depuis toutes les pages. Devis, facture, client ou article en deux taps maximum.',
  },
  {
    icon: Shield,
    title: 'Données chiffrées',
    desc: 'Hébergement français, sauvegardes automatiques, conformité RGPD. Vos données et celles de vos clients restent en sécurité.',
  },
];

export default function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Tout ce qu&apos;il vous faut
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Pensé pour le terrain.<br />
            <span className="text-muted-foreground">Pas pour la paperasse.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl bg-white p-7 border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span className="inline-flex w-12 h-12 rounded-xl bg-accent items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
