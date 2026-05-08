const STATS = [
  { value: '2 min', label: 'pour générer un devis complet à la voix' },
  { value: '524', label: 'articles BTP déjà chiffrés et prêts à l\'emploi' },
  { value: '14', label: 'métiers du BTP supportés nativement' },
  { value: '100 %', label: 'conforme à la facturation électronique 2026' },
];

export default function LandingStats() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary via-primary to-[#6753ff] text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
                {s.value}
              </p>
              <p className="mt-3 text-sm lg:text-base opacity-80 leading-snug max-w-[14rem] mx-auto">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
