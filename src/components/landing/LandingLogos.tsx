import { Star } from 'lucide-react';

const ARTISANS = [
  { name: 'Électricité Dupont', initials: 'ED', color: 'bg-primary/10 text-primary' },
  { name: 'Plomberie Martin', initials: 'PM', color: 'bg-secondary/15 text-secondary' },
  { name: 'Peinture Lefèvre', initials: 'PL', color: 'bg-[#f9cf58]/20 text-[#a07a00]' },
  { name: 'Maçonnerie Garcia', initials: 'MG', color: 'bg-success/10 text-success' },
  { name: 'Carrelage Bernard', initials: 'CB', color: 'bg-[#ff5963]/15 text-destructive' },
  { name: 'Menuiserie Petit', initials: 'MP', color: 'bg-primary/10 text-primary' },
  { name: 'Couverture Roux', initials: 'CR', color: 'bg-secondary/15 text-secondary' },
  { name: 'Plâtrerie Moreau', initials: 'PM', color: 'bg-[#f9cf58]/20 text-[#a07a00]' },
];

export default function LandingLogos() {
  return (
    <section className="py-14 lg:py-16 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Rating header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[#f9cf58] text-[#f9cf58]"
                strokeWidth={1.5}
              />
            ))}
            <span className="ml-2 text-sm font-bold text-foreground">4,9 / 5</span>
            <span className="text-sm text-muted-foreground ml-1">— retours bêta</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Des artisans français de tous corps d&apos;état nous font confiance
          </p>
        </div>

        {/* Marquee logos */}
        <div className="relative overflow-hidden mask-fade-x">
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...ARTISANS, ...ARTISANS].map((a, i) => (
              <div
                key={`${a.name}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-background border border-border flex-shrink-0"
              >
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm ${a.color}`}
                >
                  {a.initials}
                </span>
                <span className="text-sm font-semibold text-foreground">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edge fade mask */}
      <style>{`
        .mask-fade-x {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
