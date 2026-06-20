'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const FAQS = [
  {
    q: 'Et si je ne suis pas à l\'aise avec l\'informatique ?',
    a: 'MonDevisMinute est conçu pour être utilisé sans formation. Vous parlez, l\'IA structure le devis. Pas de menus complexes, pas de tableurs. Si vous savez utiliser WhatsApp, vous savez utiliser MonDevisMinute. Notre support répond par email en moins de 24h ouvrées si vous bloquez sur quelque chose.',
  },
  {
    q: 'C\'est compatible avec mon comptable ?',
    a: 'Oui. Vos factures sont exportables au format PDF et CSV, directement transmissibles à votre comptable ou expert-comptable. L\'export se fait en 1 clic depuis votre espace, sur la période de votre choix.',
  },
  {
    q: 'Je peux récupérer mes devis si j\'arrête ?',
    a: 'Vous restez propriétaire de vos données. Vous pouvez exporter l\'intégralité de vos devis, factures et clients à tout moment au format PDF et CSV, même après l\'arrêt de votre abonnement. Aucun verrouillage commercial.',
  },
  {
    q: 'Mes données sont stockées où ? RGPD ?',
    a: 'Hébergement en France, sur serveurs certifiés. Chiffrement des données au repos et en transit. Conformité RGPD complète : droit d\'accès, de rectification et de suppression respectés. Aucune donnée n\'est partagée avec des tiers à des fins commerciales.',
  },
  {
    q: 'Je travaille hors-ligne sur le chantier, ça marche ?',
    a: 'La dictée vocale et la consultation de vos devis nécessitent une connexion internet (4G suffit largement). En cas de coupure ponctuelle, l\'application reprend automatiquement la synchronisation dès que vous retrouvez du réseau. Aucune perte de données.',
  },
  {
    q: 'Comment annuler mon abonnement ?',
    a: 'En 1 clic depuis votre espace client. Pas de relance commerciale, pas de justificatif à donner, pas de période de préavis. Si vous avez payé un abonnement annuel, le reliquat n\'est pas remboursable, mais l\'accès reste actif jusqu\'à la fin de la période payée.',
  },
];

export default function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/30 to-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <SectionHeading
          className="max-w-3xl"
          eyebrow="FAQ"
          title="Questions fréquentes"
          subtitle="Tout ce que les artisans nous demandent avant de tester."
        />

        <div className="divide-y divide-slate-200/60 rounded-3xl bg-white border border-slate-200/60 px-6 sm:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04),_0_2px_8px_rgb(0,0,0,0.02)]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left gap-4"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Une autre question ? Cliquez sur la bulle en bas à droite, on répond aux questions simples en direct.
        </p>
      </div>
    </section>
  );
}
