/**
 * Modèles de devis et de factures téléchargeables (/modeles).
 *
 * Chaque métier a une fiche `ModeleMetier` (src/content/modeles/) qui alimente
 * deux pages : /modeles/devis-[metier] et /modeles/facture-[metier], plus un
 * fichier Word par page dans public/modeles/ (générés par
 * scripts/generate-modeles-docx.cjs à partir de lignes.json).
 *
 * Leçon apprise (cf. errors.md 21/07) : ne jamais injecter un nom de métier
 * dans une phrase française partagée quand un article ou un accord en dépend.
 * Les titres, méta et phrases sensibles sont donc écrits EN ENTIER dans chaque
 * fiche métier, jamais composés par interpolation.
 */

import type { Metier } from '@/lib/metiers';

/** Ligne d'exemple du tableau de chiffrage (affichée sur la page ET dans le Word). */
export interface LigneExemple {
  designation: string;
  unite: string;
  quantite: number;
  /** Prix unitaire HT indicatif, en euros. */
  prixUnitaire: number;
  /** Taux de TVA indicatif de la ligne (10 ou 20) — à adapter par l'artisan. */
  tva: number;
}

export interface ModeleFaq {
  q: string;
  a: string;
}

export interface ModeleMetier {
  metier: Metier;
  /** Nom du métier en minuscules, pour les textes ("électricien"). */
  labelLower: string;
  /** "d'électricien" / "de plombier-chauffagiste" — élision pré-écrite. */
  deMetier: string;

  /* ---- Page devis ---- */
  titreDevis: string; // ex : "Modèle de devis électricien"
  metaTitleDevis: string;
  metaDescriptionDevis: string;
  h1Devis: string;
  excerptDevis: string;
  /** Paragraphes d'introduction spécifiques au métier (2-3). */
  introDevis: string[];
  /** Titre de la section "spécificités métier" du devis. */
  specTitreDevis: string;
  /** Paragraphes de la section spécificités (2-3). */
  specDevis: string[];

  /* ---- Page facture ---- */
  titreFacture: string;
  metaTitleFacture: string;
  metaDescriptionFacture: string;
  h1Facture: string;
  excerptFacture: string;
  introFacture: string[];

  /* ---- Commun ---- */
  /** Lignes d'exemple du tableau (mêmes lignes devis/facture). */
  lignes: LigneExemple[];
  faqDevis: ModeleFaq[];
  faqFacture: ModeleFaq[];
  /** Slugs de guides pertinents pour le maillage (ex : 'taux-tva-travaux-renovation'). */
  guides: string[];
}

export type TypeDocument = 'devis' | 'facture';

export function modeleSlug(type: TypeDocument, m: ModeleMetier): string {
  return `${type}-${m.metier}`;
}

export function docxFileName(type: TypeDocument, m: ModeleMetier): string {
  return `modele-${type}-${m.metier}.docx`;
}

export function formatEuros(n: number): string {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

export function totalHT(lignes: LigneExemple[]): number {
  return lignes.reduce((sum, l) => sum + l.quantite * l.prixUnitaire, 0);
}
