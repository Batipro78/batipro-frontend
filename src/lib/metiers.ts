// 15 metiers BTP synchronises avec le backend (articles.schema.ts::METIER_VALUES)

export const METIERS = [
  'electricien',
  'plombier',
  'macon',
  'couvreur',
  'plaquiste',
  'peintre',
  'carreleur',
  'chauffagiste',
  'menuisier',
  'charpentier',
  'solier',
  'serrurier',
  'vitrier',
  'terrassier',
  'paysagiste',
] as const;

export type Metier = (typeof METIERS)[number];

export const METIER_LABEL: Record<Metier, string> = {
  electricien: 'Électricien',
  plombier: 'Plombier',
  macon: 'Maçon',
  couvreur: 'Couvreur',
  plaquiste: 'Plaquiste',
  peintre: 'Peintre',
  carreleur: 'Carreleur',
  chauffagiste: 'Chauffagiste',
  menuisier: 'Menuisier',
  charpentier: 'Charpentier',
  solier: 'Solier',
  serrurier: 'Serrurier',
  vitrier: 'Vitrier',
  terrassier: 'Terrassier',
  paysagiste: 'Paysagiste',
};

// Classes Tailwind pour le badge metier (bg + text). Couleurs par famille de metier.
export const METIER_BADGE: Record<Metier, string> = {
  electricien: 'bg-amber-50 text-amber-700 border-amber-200',
  plombier: 'bg-blue-50 text-blue-700 border-blue-200',
  chauffagiste: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  macon: 'bg-stone-100 text-stone-700 border-stone-300',
  plaquiste: 'bg-slate-100 text-slate-700 border-slate-300',
  carreleur: 'bg-zinc-100 text-zinc-700 border-zinc-300',
  terrassier: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  menuisier: 'bg-orange-100 text-orange-800 border-orange-200',
  charpentier: 'bg-amber-100 text-amber-800 border-amber-300',
  solier: 'bg-rose-50 text-rose-700 border-rose-200',
  couvreur: 'bg-red-50 text-red-700 border-red-200',
  paysagiste: 'bg-green-50 text-green-700 border-green-200',
  peintre: 'bg-pink-50 text-pink-700 border-pink-200',
  vitrier: 'bg-sky-50 text-sky-700 border-sky-200',
  serrurier: 'bg-neutral-200 text-neutral-800 border-neutral-300',
};

export function metierLabel(metier: string | null | undefined): string {
  if (!metier) return '';
  return METIER_LABEL[metier as Metier] || metier;
}

export function metierBadgeClass(metier: string | null | undefined): string {
  if (!metier) return 'bg-muted text-muted-foreground border';
  return METIER_BADGE[metier as Metier] || 'bg-muted text-muted-foreground border';
}
