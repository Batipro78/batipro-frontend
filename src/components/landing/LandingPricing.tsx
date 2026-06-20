'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/landing/SectionHeading';

const FEATURES = [
  'Devis et factures illimités',
  'Dictée vocale sur 14 métiers BTP',
  'Bibliothèque de 524 articles BTP chiffrés',
  'Signature électronique mobile (eIDAS)',
  'Création éclair (bouton flottant)',
  'Gestion clients et chantiers illimitée',
  'Mises à jour incluses à vie',
  'Support par email sous 24 h',
  'Données hébergées en France · RGPD',
];

export default function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  const price = yearly ? 290 : 29;
  const period = yearly ? 'an' : 'mois';
  const equivalent = yearly ? 'soit 24,17 € / mois' : null;

  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/30 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          className="mb-12"
          eyebrow="Tarifs transparents"
          title="Un seul prix."
          gradient="Toutes les fonctionnalités."
          subtitle="Pas de plan compliqué, pas de fonction bloquée. 29 € par mois et vous avez tout MonDevisMinute."
        />

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-white border border-slate-200/60 rounded-full p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !yearly
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Annuel
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                yearly ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
              }`}>
                -2 mois
              </span>
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl bg-white ring-2 ring-primary/20 p-8 lg:p-12 shadow-[0_20px_60px_rgb(75,57,239,0.15),_0_4px_12px_rgb(0,0,0,0.03)]">
            {/* Free trial banner */}
            <div className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-8 border border-emerald-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                14 jours gratuits · Sans carte bancaire · Sans engagement
              </span>
            </div>

            <h3 className="font-display text-3xl font-semibold tracking-tight text-slate-900 text-center">
              MonDevisMinute
            </h3>
            <p className="mt-2 text-center text-slate-600">
              L&apos;outil complet pour piloter votre activité d&apos;artisan.
            </p>

            {/* Price */}
            <div className="mt-8 flex items-baseline justify-center gap-2">
              <span
                className="font-display text-7xl font-semibold text-slate-900 tracking-tight"
                style={{ fontFeatureSettings: '"tnum", "ss01"' }}
              >
                {price}
              </span>
              <span className="text-lg text-slate-500">€ HT / {period}</span>
            </div>
            {equivalent && (
              <p className="mt-2 text-center text-sm text-slate-500">
                {equivalent} · 2 mois offerts vs mensuel
              </p>
            )}
            {!equivalent && (
              <p className="mt-2 text-center text-sm text-slate-500">
                Annulable à tout moment, en un clic
              </p>
            )}

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="w-full mt-8 rounded-2xl h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.01]"
            >
              <Link href="/signup">
                14 jours gratuits — sans CB
              </Link>
            </Button>
            <p className="mt-3 text-xs text-center text-slate-500">
              Aucune carte bancaire pendant l&apos;essai. Annulable en 1 clic.
            </p>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-slate-200/60">
              <p className="text-sm font-semibold text-slate-900 mb-4">Tout est inclus :</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="flex-shrink-0 rounded-full bg-emerald-50 p-1 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-slate-700 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reassurance row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
          {[
            { t: '14 jours gratuits', s: 'Pour tester sans risque' },
            { t: 'Sans carte bancaire', s: 'Aucune coordonnée bancaire' },
            { t: 'Annulable en 1 clic', s: 'Sans engagement, sans frais' },
          ].map((r) => (
            <div key={r.t} className="rounded-2xl bg-white border border-slate-200/60 p-5 shadow-[0_4px_16px_rgb(0,0,0,0.02)]">
              <p className="font-semibold text-slate-900">{r.t}</p>
              <p className="mt-1 text-sm text-slate-500">{r.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
