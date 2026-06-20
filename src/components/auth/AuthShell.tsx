import Link from 'next/link';
import { Mic, FileSignature, Library } from 'lucide-react';
import BrandPicto from '@/components/branding/BrandPicto';

const HIGHLIGHTS = [
  {
    icon: Mic,
    title: 'Dictez, le devis se chiffre tout seul',
    desc: 'Dictée vocale sur 14 métiers du bâtiment.',
  },
  {
    icon: Library,
    title: '524 articles BTP déjà chiffrés',
    desc: 'Une bibliothèque prête à l’emploi, sans ressaisie.',
  },
  {
    icon: FileSignature,
    title: 'Signature client eIDAS, à distance',
    desc: 'Devis signés en 5 minutes, sur mobile.',
  },
];

const TRUST = ['Sans carte bancaire', 'RGPD · hébergé en France', 'Sans engagement'];

/**
 * Écran d'authentification "pro" en deux colonnes : panneau marque (sombre,
 * accents violet/teal) à gauche, formulaire à droite. Le panneau marque est
 * masqué sous lg ; sur mobile on affiche un logo compact au-dessus du formulaire.
 * Ne contient aucune logique métier — seulement la présentation.
 */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-[1.1fr_1fr]">
      {/* Panneau marque (desktop) */}
      <aside className="relative hidden overflow-hidden bg-[#0F172A] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        {/* halos de marque */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-28 h-96 w-96 rounded-full bg-[#4b39ef]/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-[#39d2c0]/25 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
        </div>

        <Link href="/" className="relative inline-flex items-center gap-3">
          <BrandPicto size={40} />
          <span className="font-display text-xl font-semibold tracking-tight">MonDevisMinute</span>
        </Link>

        <div className="relative space-y-10">
          <h2 className="font-display text-[2rem] font-semibold leading-tight">
            Le devis qui s’écrit{' '}
            <span className="bg-gradient-to-r from-[#7c6ff7] to-[#39d2c0] bg-clip-text text-transparent">
              à la voix
            </span>
            , signé en 5 minutes.
          </h2>

          <ul className="space-y-6">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Icon className="h-5 w-5 text-[#39d2c0]" />
                </span>
                <div>
                  <p className="font-medium leading-snug">{title}</p>
                  <p className="text-sm text-white/60">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
          {TRUST.map((t, i) => (
            <span key={t} className="inline-flex items-center gap-5">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-white/30" />}
              {t}
            </span>
          ))}
        </div>
      </aside>

      {/* Panneau formulaire */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-card px-4 py-10 sm:px-8">
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <BrandPicto size={36} />
          <span className="font-display text-lg font-semibold tracking-tight">MonDevisMinute</span>
        </Link>
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
    </div>
  );
}
