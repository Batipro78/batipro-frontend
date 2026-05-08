'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  'Devis et factures illimités',
  'Dictée vocale sur 14 métiers BTP',
  'Bibliothèque de 524 articles BTP chiffrés',
  'Signature électronique mobile (eIDAS)',
  'Situations de travaux + retenue de garantie 5 %',
  'Facturation électronique Factur-X (réforme 2026)',
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
    <section id="tarifs" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Tarif simple
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Un seul prix.<br />Toutes les fonctionnalités.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Pas de menu compliqué, pas de fonction bloquée derrière une option payante.
            Vous payez 29 € par mois et vous avez tout BatiPro.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-background border border-border rounded-full p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !yearly
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annuel
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                yearly ? 'bg-secondary text-secondary-foreground' : 'bg-success/15 text-success'
              }`}>
                -2 mois
              </span>
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary to-[#6753ff] p-1 shadow-2xl shadow-primary/30">
            <div className="rounded-[calc(1.5rem-4px)] bg-white p-8 lg:p-12">
              {/* Free trial banner */}
              <div className="flex items-center justify-center gap-2 bg-success/10 text-success rounded-full px-4 py-2 mb-8 border border-success/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">
                  14 jours gratuits · Sans carte bancaire · Sans engagement
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground text-center">
                BatiPro
              </h3>
              <p className="mt-2 text-center text-muted-foreground">
                L&apos;outil complet pour piloter votre activité d&apos;artisan.
              </p>

              {/* Price */}
              <div className="mt-8 flex items-baseline justify-center gap-2">
                <span className="font-display text-7xl font-bold text-foreground">{price}</span>
                <span className="text-lg text-muted-foreground">€ HT / {period}</span>
              </div>
              {equivalent && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {equivalent} · 2 mois offerts vs mensuel
                </p>
              )}
              {!equivalent && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Annulable à tout moment, en un clic
                </p>
              )}

              {/* CTA */}
              <Button asChild size="lg" className="w-full mt-8 rounded-full h-14 text-base font-semibold shadow-lg shadow-primary/25">
                <Link href="/signup">
                  Démarrer mes 14 jours gratuits
                </Link>
              </Button>
              <p className="mt-3 text-xs text-center text-muted-foreground">
                Aucune carte bancaire ne vous sera demandée pendant l&apos;essai.
              </p>

              {/* Features */}
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm font-bold text-foreground mb-4">Tout est inclus :</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-success" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reassurance row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
          {[
            { t: '14 jours gratuits', s: 'Pour tester sans risque' },
            { t: 'Sans carte bancaire', s: 'Aucune coordonnée bancaire' },
            { t: 'Sans engagement', s: 'Annulable à tout moment' },
          ].map((r) => (
            <div key={r.t} className="rounded-2xl bg-background border border-border p-5">
              <p className="font-bold text-foreground">{r.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
