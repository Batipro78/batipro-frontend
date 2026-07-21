/**
 * Guides MonDevisMinute — pôle de contenu éditorial public (/guides).
 *
 * Chaque guide est un article de fond destiné aux artisans du bâtiment.
 * Le contenu est décrit en blocs typés plutôt qu'en HTML brut : le rendu est
 * centralisé dans `src/components/guides/GuideBody.tsx`, ce qui garantit une
 * mise en page homogène et un balisage cohérent pour le référencement.
 */

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'note'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  /** Titre affiché dans la liste et le fil d'Ariane (court). */
  title: string;
  /** Titre H1 de la page (peut être plus long et plus explicite). */
  h1: string;
  /** <title> — viser 60 caractères max, suffixe de marque compris. */
  metaTitle: string;
  metaDescription: string;
  /** Chapô affiché sous le H1 et repris comme résumé dans la liste. */
  excerpt: string;
  category: 'Obligations légales' | 'Fiscalité' | 'Chiffrage' | 'Se faire payer' | 'Vendre plus';
  /** Date de dernière mise à jour, format ISO (AAAA-MM-JJ). */
  updated: string;
  blocks: GuideBlock[];
  faq: GuideFaq[];
  /** Slugs d'autres guides, pour le maillage interne. */
  related: string[];
}

/**
 * Transforme un titre de section en identifiant d'ancre stable.
 * Utilisé pour le sommaire et pour les liens profonds.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Estimation de durée de lecture, à ~220 mots/minute. */
export function readingMinutes(guide: Guide): number {
  let words = 0;
  for (const block of guide.blocks) {
    if (block.type === 'p' || block.type === 'h2' || block.type === 'h3') {
      words += block.text.split(/\s+/).length;
    } else if (block.type === 'list' || block.type === 'steps') {
      words += block.items.join(' ').split(/\s+/).length;
    } else if (block.type === 'note') {
      words += block.text.split(/\s+/).length;
    } else if (block.type === 'table') {
      words += block.rows.flat().join(' ').split(/\s+/).length;
    }
  }
  for (const item of guide.faq) {
    words += (item.q + ' ' + item.a).split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 220));
}

/** Titres de niveau 2 d'un guide, pour construire le sommaire. */
export function tableOfContents(guide: Guide): { id: string; text: string }[] {
  return guide.blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}
