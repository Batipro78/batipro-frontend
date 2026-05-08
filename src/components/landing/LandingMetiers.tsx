const METIERS = [
  { name: 'Électricien', emoji: '⚡', count: 135 },
  { name: 'Plombier-chauffagiste', emoji: '🔧', count: 172 },
  { name: 'Maçon', emoji: '🧱', count: 52 },
  { name: 'Peintre', emoji: '🎨', count: 40 },
  { name: 'Plaquiste', emoji: '🪛', count: 35 },
  { name: 'Carreleur', emoji: '◼️', count: 30 },
  { name: 'Couvreur', emoji: '🏠', count: 30 },
  { name: 'Menuisier', emoji: '🪚', count: 30 },
  { name: 'Charpentier', emoji: '🪵', count: 0 },
  { name: 'Solier', emoji: '🟫', count: 0 },
  { name: 'Serrurier', emoji: '🔐', count: 0 },
  { name: 'Vitrier', emoji: '🪟', count: 0 },
  { name: 'Terrassier', emoji: '🚜', count: 0 },
  { name: 'Paysagiste', emoji: '🌿', count: 0 },
];

export default function LandingMetiers() {
  return (
    <section id="metiers" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Pour qui
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            14 métiers du BTP<br />parlent déjà notre langue.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            BatiPro reconnaît le vocabulaire technique de chaque corps d&apos;état.
            La dictée vocale s&apos;adapte au métier sélectionné.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {METIERS.map((m) => (
            <div
              key={m.name}
              className="rounded-xl bg-background border border-border p-4 text-center hover:border-primary/40 hover:bg-accent/30 transition-all cursor-default"
            >
              <span className="text-3xl">{m.emoji}</span>
              <p className="mt-2 text-sm font-semibold text-foreground">{m.name}</p>
              {m.count > 0 ? (
                <p className="mt-0.5 text-xs text-muted-foreground">{m.count} articles</p>
              ) : (
                <p className="mt-0.5 text-xs text-secondary font-medium">Bientôt</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
