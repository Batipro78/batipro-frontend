import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/guides', '/modeles', '/generateur-devis', '/tarifs', '/logiciel-devis', '/signup', '/login', '/forgot-password'],
      disallow: [
        '/api/',
        '/dashboard',
        '/devis',
        '/factures',
        '/clients',
        '/articles',
        '/voice',
        '/profil',
        '/abonnement',
        '/verify-email',
        '/reset-password',
        '/admin',
      ],
    },
    sitemap: 'https://www.mondevisminute.com/sitemap.xml',
  };
}
