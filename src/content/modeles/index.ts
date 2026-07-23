import type { ModeleMetier, TypeDocument } from '@/lib/modeles';

import { modele as electricien } from './electricien';
import { modele as plombier } from './plombier';
import { modele as macon } from './macon';
import { modele as couvreur } from './couvreur';
import { modele as plaquiste } from './plaquiste';
import { modele as peintre } from './peintre';
import { modele as carreleur } from './carreleur';
import { modele as menuisier } from './menuisier';
import { modele as charpentier } from './charpentier';
import { modele as solier } from './solier';
import { modele as serrurier } from './serrurier';
import { modele as vitrier } from './vitrier';
import { modele as terrassier } from './terrassier';
import { modele as paysagiste } from './paysagiste';

/** Ordre d'affichage sur /modeles : gros volumes de recherche d'abord. */
export const modeles: ModeleMetier[] = [
  electricien,
  plombier,
  macon,
  peintre,
  menuisier,
  carreleur,
  couvreur,
  plaquiste,
  charpentier,
  serrurier,
  paysagiste,
  vitrier,
  solier,
  terrassier,
];

export interface ModelePage {
  type: TypeDocument;
  modele: ModeleMetier;
}

/** Résout un slug de page (ex : "devis-electricien") vers son modèle. */
export function getModelePage(slug: string): ModelePage | undefined {
  const match = /^(devis|facture)-(.+)$/.exec(slug);
  if (!match) return undefined;
  const type = match[1] as TypeDocument;
  const modele = modeles.find((m) => m.metier === match[2]);
  return modele ? { type, modele } : undefined;
}

export function allModeleSlugs(): string[] {
  return modeles.flatMap((m) => [`devis-${m.metier}`, `facture-${m.metier}`]);
}
