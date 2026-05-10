import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Marc Dupont',
    role: 'Électricien',
    city: 'Lyon (69)',
    initials: 'MD',
    color: 'bg-primary text-primary-foreground',
    metric: '~2 h gagnées par semaine',
    text:
      'Avant je rentrais le soir et je faisais 2 h de devis. Maintenant je dicte sur le chantier et c\'est fini avant de remonter dans le camion. J\'ai récupéré mes soirées.',
    rating: 5,
  },
  {
    name: 'Julien Petit',
    role: 'Plombier-chauffagiste',
    city: 'Bordeaux (33)',
    initials: 'JP',
    color: 'bg-secondary text-secondary-foreground',
    metric: '8 devis sur 10 signés sur place',
    text:
      'La signature mobile, c\'est ce qui change tout. Le client signe sur place, le chantier est verrouillé. Plus de devis qui traînent trois semaines à attendre un retour.',
    rating: 5,
  },
  {
    name: 'Sophie Lefèvre',
    role: 'Peintre en bâtiment',
    city: 'Nantes (44)',
    initials: 'SL',
    color: 'bg-success text-white',
    metric: '~30 min économisées par devis',
    text:
      'Les 524 articles déjà chiffrés, ça me fait gagner un temps fou. Je n\'ai plus à fouiller mes anciens devis pour retrouver mes prix, MonDevisMinute propose des montants déjà ajustés.',
    rating: 5,
  },
];

export default function LandingTestimonials() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Ce qu&apos;ils en disent
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Des artisans qui<br />ont récupéré leurs soirées.
          </h2>
          <p className="mt-6 text-sm text-muted-foreground italic">
            Témoignages issus de notre programme bêta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative rounded-3xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent" strokeWidth={2.5} />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f9cf58] text-[#f9cf58]" strokeWidth={1.5} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed text-[15px]">« {t.text} »</p>

              {/* Metric chip */}
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success text-xs font-bold px-3 py-1">
                {t.metric}
              </p>

              {/* Author */}
              <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm shadow-sm ${t.color}`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
