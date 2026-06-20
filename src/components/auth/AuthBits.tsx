import type { LucideIcon } from 'lucide-react';

/** En-tête de formulaire auth : icône optionnelle + titre + sous-titre. */
export function AuthHeader({
  icon: Icon,
  iconTone = 'primary',
  title,
  subtitle,
}: {
  icon?: LucideIcon;
  iconTone?: 'primary' | 'success' | 'destructive';
  title: string;
  subtitle?: string;
}) {
  const tone =
    iconTone === 'success'
      ? 'bg-success/10 text-success'
      : iconTone === 'destructive'
        ? 'bg-destructive/10 text-destructive'
        : 'bg-accent text-primary';

  return (
    <div className="mb-8">
      {Icon && (
        <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
          <Icon className="h-6 w-6" />
        </span>
      )}
      <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/** Bandeau d'erreur de formulaire. */
export function FormError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {message}
    </p>
  );
}
