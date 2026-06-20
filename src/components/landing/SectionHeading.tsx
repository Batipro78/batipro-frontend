import { cn } from '@/lib/utils';

/**
 * En-tête de section partagé de la landing (eyebrow + titre + sous-titre).
 * Centralise le rythme typographique et garde TOUTES les sections sur les
 * couleurs de marque (primary/secondary) — fini les violets divergents.
 * Le second membre `gradient` reprend le duo violet→teal du hero.
 */
export default function SectionHeading({
  eyebrow,
  title,
  gradient,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  gradient?: string;
  subtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center mb-16', className)}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        {title}
        {gradient && (
          <>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {gradient}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
