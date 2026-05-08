import { Mic, BookOpen, PenLine, Smartphone, Zap, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Mic,
    title: 'Devis vocaux par IA',
    desc: 'Parlez naturellement, l\'IA structure votre devis automatiquement. Reconnaissance OpenAI calibrée sur le vocabulaire des 14 métiers du BTP.',
  },
  {
    icon: BookOpen,
    title: 'Bibliothèque 524 articles',
    desc: '14 métiers couverts : électricité, plomberie-chauffage, maçonnerie, peinture, plâtrerie, carrelage, couverture, menuiserie. Prix moyens du marché pré-remplis.',
  },
  {
    icon: PenLine,
    title: 'Signature mobile eIDAS',
    desc: 'Vos clients signent depuis leur téléphone, sur le chantier ou à distance. Valeur juridique reconnue, horodatage certifié.',
  },
  {
    icon: Smartphone,
    title: 'Pensé pour le chantier',
    desc: 'App mobile responsive, accessible depuis le téléphone. Créez un devis entre deux interventions, du parking au client.',
  },
  {
    icon: Zap,
    title: 'Création éclair',
    desc: 'Bouton flottant accessible depuis toutes les pages. Devis, facture, client ou article en deux taps maximum.',
  },
  {
    icon: Shield,
    title: 'Données chiffrées RGPD',
    desc: 'Hébergement français, sauvegardes automatiques, conformité RGPD. Vos données et celles de vos clients restent en sécurité.',
  },
];

export default function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-violet-600 mb-4">
            Fonctionnalités
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Tout ce qu&apos;il vous faut.<br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Rien de superflu.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Des outils pensés par et pour les artisans du bâtiment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-3xl bg-white border border-slate-200/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04),_0_2px_8px_rgb(0,0,0,0.02)] hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex rounded-xl bg-violet-50 border border-violet-100/50 p-2.5">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
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
