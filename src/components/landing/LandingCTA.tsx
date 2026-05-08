import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-foreground text-background p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary blur-3xl rounded-full" />
          </div>
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Votre prochain devis,<br />en parlant.
            </h2>
            <p className="mt-6 text-lg opacity-80 max-w-xl mx-auto">
              <span className="font-semibold text-secondary">14 jours gratuits.</span> Sans carte bancaire. Sans engagement.
              Vous gardez vos données quoi qu&apos;il arrive.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8 h-14 text-base font-semibold">
                <Link href="/signup">
                  14 jours gratuits — sans CB
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Link href="/login" className="text-sm font-medium opacity-80 hover:opacity-100 transition">
                J&apos;ai déjà un compte →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
