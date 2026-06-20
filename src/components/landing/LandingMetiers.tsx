import {
  Zap,
  Wrench,
  Home,
  PaintBucket,
  Layers,
  Grid3x3,
  Triangle,
  Hammer,
  TreePine,
  Square,
  KeyRound,
  Sun,
  Construction,
  Trees,
} from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const METIERS = [
  { name: 'Électricien', icon: Zap, count: 135 },
  { name: 'Plombier-chauffagiste', icon: Wrench, count: 172 },
  { name: 'Maçon', icon: Home, count: 52 },
  { name: 'Peintre', icon: PaintBucket, count: 40 },
  { name: 'Plaquiste', icon: Layers, count: 35 },
  { name: 'Carreleur', icon: Grid3x3, count: 30 },
  { name: 'Couvreur', icon: Triangle, count: 30 },
  { name: 'Menuisier', icon: Hammer, count: 30 },
  { name: 'Charpentier', icon: TreePine, count: 0 },
  { name: 'Solier', icon: Square, count: 0 },
  { name: 'Serrurier', icon: KeyRound, count: 0 },
  { name: 'Vitrier', icon: Sun, count: 0 },
  { name: 'Terrassier', icon: Construction, count: 0 },
  { name: 'Paysagiste', icon: Trees, count: 0 },
];

export default function LandingMetiers() {
  return (
    <section id="metiers" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Métiers"
          title="14 métiers du BTP"
          gradient="parlent déjà notre langue."
          subtitle="MonDevisMinute reconnaît le vocabulaire technique de chaque corps d'état. La dictée vocale s'adapte au métier sélectionné."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {METIERS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className="group rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 p-5 text-center hover:border-primary/20 hover:from-accent hover:to-accent/50 transition-all duration-300 cursor-default"
              >
                <div className="mb-3 flex justify-center">
                  <Icon className="h-7 w-7 text-slate-400 group-hover:text-primary transition-colors duration-300" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{m.name}</p>
                {m.count > 0 ? (
                  <p className="mt-1 text-xs text-slate-500" style={{ fontFeatureSettings: '"tnum"' }}>
                    {m.count} articles
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-primary font-medium">Bientôt</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
