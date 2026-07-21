import type { Guide } from '@/lib/guides';

import { guide as mentionsDevis } from './mentions-obligatoires-devis-batiment';
import { guide as mentionsFacture } from './mentions-obligatoires-facture-artisan';
import { guide as tvaTravaux } from './taux-tva-travaux-renovation';
import { guide as facturationElectronique } from './facturation-electronique-artisan-2026';
import { guide as chiffrerDevis } from './chiffrer-un-devis-btp';
import { guide as sefairePayer } from './se-faire-payer-artisan-impayes';
import { guide as devisSigne } from './devis-signe-valeur-juridique';
import { guide as devisQuiFaitSigner } from './devis-qui-fait-signer';
import { guide as depannage } from './devis-depannage-urgence-regles';
import { guide as acompte } from './facture-acompte-situation-travaux';
import { guide as microEntreprise } from './micro-entreprise-batiment';
import { guide as decennale } from './assurance-decennale-artisan';
import { guide as aides } from './devis-maprimerenov-cee';
import { guide as sousTraitance } from './sous-traitance-btp';
import { guide as tvaQuotidien } from './tva-artisan-declarer-recuperer';

/** Ordre d’affichage sur la page /guides : du plus structurant au plus spécifique. */
export const guides: Guide[] = [
  mentionsDevis,
  mentionsFacture,
  tvaTravaux,
  facturationElectronique,
  chiffrerDevis,
  sefairePayer,
  devisSigne,
  devisQuiFaitSigner,
  depannage,
  acompte,
  sousTraitance,
  tvaQuotidien,
  microEntreprise,
  decennale,
  aides,
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getRelated(guide: Guide): Guide[] {
  return guide.related
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => Boolean(g) && g!.slug !== guide.slug);
}
