import type { MetadataRoute } from 'next';
import { guides } from '@/content/guides';
import { allModeleSlugs } from '@/content/modeles';

const BASE = 'https://www.mondevisminute.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/modeles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/generateur-devis`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/signup`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/facture-electronique`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/aide`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/cgu`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/suppression-compte`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // `updated` est une date ISO (AAAA-MM-JJ) : on la normalise en Date pour que
  // le lastModified du sitemap reflète la vraie date de mise à jour du guide.
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE}/guides/${guide.slug}`,
    lastModified: new Date(`${guide.updated}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Les 28 pages de modèles téléchargeables (devis + facture par métier).
  const modelePages: MetadataRoute.Sitemap = allModeleSlugs().map((slug) => ({
    url: `${BASE}/modeles/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...pages, ...guidePages, ...modelePages];
}
