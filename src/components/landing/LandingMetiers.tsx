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
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-violet-600 mb-4">
            Métiers
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            14 métiers du BTP<br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">parlent déjà notre langue.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            MonDevisMinute reconnaît le vocabulaire technique de chaque corps d&apos;état.
            La dictée vocale s&apos;adapte au métier sélectionné.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {METIERS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className="group rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 p-5 text-center hover:border-violet-200 hover:from-violet-50 hover:to-violet-50/50 transition-all duration-300 cursor-default"
              >
                <div className="mb-3 flex justify-center">
                  <Icon className="h-7 w-7 text-slate-400 group-hover:text-violet-600 transition-colors duration-300" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{m.name}</p>
                {m.count > 0 ? (
                  <p className="mt-1 text-xs text-slate-500" style={{ fontFeatureSettings: '"tnum"' }}>
                    {m.count} articles
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-violet-600 font-medium">Bientôt</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
