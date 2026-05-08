import { Mic, Sparkles, FileText, Send } from 'lucide-react';

const STEPS = [
  {
    icon: Mic,
    title: 'Vous parlez',
    desc: 'Décrivez votre chantier en langage naturel. BatiPro comprend les 14 métiers du BTP.',
    color: 'bg-primary text-primary-foreground',
  },
  {
    icon: Sparkles,
    title: 'L\'IA structure',
    desc: 'OpenAI extrait les prestations, surfaces, quantités et matériaux mentionnés.',
    color: 'bg-secondary text-secondary-foreground',
  },
  {
    icon: FileText,
    title: 'Le devis se remplit',
    desc: 'Lignes, prix unitaires, totaux et TVA calculés depuis votre bibliothèque de 524 articles.',
    color: 'bg-success text-white',
  },
  {
    icon: Send,
    title: 'Vous envoyez',
    desc: 'PDF généré, signature électronique conforme eIDAS, envoi au client en un clic.',
    color: 'bg-foreground text-background',
  },
];

export default function LandingVoiceDemo() {
  return (
    <section id="voix" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Ce que personne ne fait en France
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Parlez. Le devis<br />s&apos;écrit tout seul.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Pendant que vous mesurez le chantier, votre téléphone fait le reste.
            Plus de prise de notes, plus de saisie le soir, plus de devis en retard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative group rounded-2xl bg-background p-7 hover:bg-accent/40 transition-colors border border-border"
              >
                <span className="absolute -top-3 left-7 text-xs font-bold text-muted-foreground bg-white px-2 py-0.5 rounded-full border border-border">
                  Étape {i + 1}
                </span>
                <span className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center ${step.color} shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote bubble */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[#6753ff] p-8 lg:p-12 text-primary-foreground shadow-xl shadow-primary/20">
            <Mic className="w-8 h-8 opacity-80" />
            <p className="mt-4 text-xl lg:text-2xl font-medium leading-relaxed">
              « Devis pour Madame Martin, peinture salon 32 mètres carrés blanc cassé,
              ponçage et deux couches, plus protection du parquet. »
            </p>
            <div className="mt-6 pt-6 border-t border-primary-foreground/20 flex items-center justify-between text-sm">
              <span className="opacity-80">→ Devis structuré et chiffré en 1 min 47 s</span>
              <span className="font-semibold">14 métiers BTP supportés</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
