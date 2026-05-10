import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/signup', '/login', '/forgot-password'],
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
      ],
    },
    sitemap: 'https://mondevisminute.com/sitemap.xml',
  };
}
