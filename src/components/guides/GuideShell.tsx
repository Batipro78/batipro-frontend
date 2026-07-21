import Link from 'next/link';
import BrandPicto from '@/components/branding/BrandPicto';

/**
 * En-tête et pied de page propres à la section /guides.
 *
 * On ne réutilise pas LandingNav / LandingFooter ici : leurs liens sont des
 * ancres internes à la page d'accueil (#voix, #tarifs…) qui pointeraient dans
 * le vide depuis un guide.
 */
export default function GuideShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <BrandPicto size={32} className="rounded-lg shadow-sm" />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              MonDevisMinute
            </span>
          </Link>

          <div className="flex items-center gap-5 text-sm font-medium">
            <Link href="/guides" className="text-muted-foreground transition hover:text-foreground">
              Guides
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-violet-600 px-4 py-2 font-semibold text-white transition hover:bg-violet-700"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </header>

      {children}

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Vos devis et vos factures, dictés à la voix
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
            Mentions légales à jour, TVA calculée ligne par ligne, devis transformé en
            facture en un clic. Essai gratuit de 14 jours, sans carte bancaire.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} MonDevisMinute</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="transition hover:text-foreground">Accueil</Link>
            <Link href="/guides" className="transition hover:text-foreground">Guides</Link>
            <Link href="/aide" className="transition hover:text-foreground">Aide</Link>
            <Link href="/contact" className="transition hover:text-foreground">Contact</Link>
            <Link href="/mentions-legales" className="transition hover:text-foreground">Mentions légales</Link>
            <Link href="/confidentialite" className="transition hover:text-foreground">Confidentialité</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
