'use client';

import Link from 'next/link';
import { Mic, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingHero() {
  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-white">
      {/* ============ MESH GRADIENT BACKGROUND ============ */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Liquid distortion filter — turbulence + displacement = mesh organique */}
            <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.018"
                numOctaves="2"
                seed="7"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="24s"
                  values="0.012 0.018; 0.020 0.014; 0.012 0.018"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="60"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Soft blur to keep edges silky */}
            <filter id="silk" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="50" />
            </filter>

            {/* Color blobs */}
            <radialGradient id="g-violet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4b39ef" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#4b39ef" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-teal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#39d2c0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#39d2c0" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-yellow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f9cf58" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f9cf58" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-pink" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff8aa6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ff8aa6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-indigo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6753ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6753ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Mesh layer 1 — colors blurred and distorted */}
          <g filter="url(#liquid)">
            <g filter="url(#silk)">
              <circle className="animate-mesh-1" cx="280" cy="260" r="320" fill="url(#g-violet)" />
              <circle className="animate-mesh-2" cx="1180" cy="220" r="360" fill="url(#g-teal)" />
              <circle className="animate-mesh-3" cx="720" cy="500" r="340" fill="url(#g-yellow)" />
              <circle className="animate-mesh-4" cx="1080" cy="640" r="300" fill="url(#g-pink)" />
              <circle className="animate-mesh-5" cx="380" cy="700" r="320" fill="url(#g-indigo)" />
            </g>
          </g>
        </svg>

        {/* Whiteish veil so text stays readable on top of the mesh */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 35%, rgba(241,244,248,0.55) 100%)',
          }}
        />

        {/* Subtle vignette at bottom for mockup contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(20,24,27,0.06), transparent 60%)',
          }}
        />
      </div>

      {/* ============ CONTENT ============ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur text-success px-4 py-1.5 text-xs font-bold mb-8 border border-success/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            14 jours d&apos;essai · Sans carte bancaire · Sans engagement
          </div>

          <h1 className="animate-fade-up delay-100 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[1.02]">
            Votre devis,
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer">
              à la voix.
            </span>
            <br />
            En 2 minutes.
          </h1>

          <p className="animate-fade-up delay-200 mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dictez votre devis sur le chantier. BatiPro le rédige, le calcule
            et l&apos;envoie à votre client. Pensé par et pour les artisans français.
          </p>

          <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <Link href="/signup">
                Essayer gratuitement 14 jours
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-14 text-base font-semibold border-2 bg-white/80 backdrop-blur-md hover:bg-white"
            >
              <a href="#voix">
                <Mic className="w-4 h-4 mr-1" />
                Voir la démo
              </a>
            </Button>
          </div>

          <div className="animate-fade-up delay-400 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-success" />
              Aucune carte bancaire
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-success" />
              Annulable en un clic
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-success" />
              Conforme facturation 2026
            </span>
          </div>
        </div>

        {/* ============ PRODUCT MOCKUP ============ */}
        <div
          className="animate-fade-up delay-500 mt-16 lg:mt-20 relative max-w-5xl mx-auto"
          style={{ perspective: '1400px' }}
        >
          <div className="animate-mockup-tilt relative rounded-3xl bg-gradient-to-br from-primary via-primary to-[#6753ff] p-2 shadow-2xl shadow-primary/40">
            <div className="rounded-2xl bg-white overflow-hidden">
              <div className="h-9 bg-muted/50 flex items-center px-4 gap-2 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full bg-chart-5/80" />
                <span className="w-3 h-3 rounded-full bg-success/70" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">
                  app.batipro.fr/devis/nouveau
                </span>
              </div>
              <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 flex flex-col items-center justify-center bg-gradient-to-br from-accent to-white rounded-2xl p-8 border border-border">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                    <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-glow">
                      <Mic className="w-9 h-9 text-primary-foreground" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground">Je vous écoute…</p>
                  <p className="mt-1 text-xs text-muted-foreground text-center">
                    « Devis pour 50 m² de peinture blanche, deux couches… »
                  </p>
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm font-bold text-foreground">Devis #2026-0847</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-success/15 text-success font-semibold">
                      Généré
                    </span>
                  </div>
                  {[
                    { d: 'Préparation murs', q: '50 m²', t: '450 €' },
                    { d: 'Peinture acrylique 2 couches', q: '50 m²', t: '1 250 €' },
                    { d: 'Protection sol et mobilier', q: '1', t: '120 €' },
                  ].map((l) => (
                    <div
                      key={l.d}
                      className="grid grid-cols-12 gap-3 py-2 text-sm border-b border-border/60"
                    >
                      <span className="col-span-7 text-foreground">{l.d}</span>
                      <span className="col-span-2 text-muted-foreground">{l.q}</span>
                      <span className="col-span-3 text-right font-semibold text-foreground">
                        {l.t}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-sm text-muted-foreground">Total HT</span>
                    <span className="text-2xl font-bold text-primary">1 820 €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl px-4 py-3 items-center gap-3 border border-border animate-fade-in delay-700">
            <span className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center">
              <Check className="w-5 h-5 text-secondary" />
            </span>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Signé en mobilité</p>
              <p className="text-sm font-semibold text-foreground">Conforme eIDAS</p>
            </div>
          </div>
          <div className="hidden lg:flex absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl px-4 py-3 items-center gap-3 border border-border animate-fade-in delay-700">
            <span className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Mic className="w-5 h-5 text-primary" />
            </span>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Généré en</p>
              <p className="text-sm font-semibold text-foreground">1 min 47 s</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
