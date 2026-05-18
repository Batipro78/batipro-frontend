import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import { AnalyticsScripts } from '@/components/AnalyticsScripts';

const inter = Inter({ weight: '400', variable: '--font-inter', subsets: ['latin'] });
const interTight = Inter_Tight({ weight: '600', variable: '--font-inter-tight', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mondevisminute.com'),
  title: {
    default: 'MonDevisMinute — Devis BTP en 30 secondes par dictée vocale',
    template: '%s | MonDevisMinute',
  },
  description:
    "Logiciel SaaS pour artisans : créez devis et factures en moins de 30 secondes par dictée vocale. 14 métiers BTP couverts. Essai gratuit 14 jours sans carte bancaire.",
  keywords: [
    'logiciel devis artisan',
    'logiciel facturation BTP',
    'devis vocal',
    'logiciel artisan électricien',
    'logiciel artisan plombier',
    'devis maçon',
    'devis peintre',
    'devis carreleur',
    'logiciel BTP',
    'IA devis artisan',
    'application devis facture',
    'logiciel auto-entrepreneur BTP',
    'mondevisminute',
  ],
  authors: [{ name: 'MonDevisMinute' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mondevisminute.com',
    title: 'MonDevisMinute — Devis BTP en 30 secondes',
    description:
      "Devis et factures pour artisans en moins de 30 secondes par dictée vocale. 14 métiers BTP. Essai 14 jours gratuit sans CB.",
    siteName: 'MonDevisMinute',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MonDevisMinute — Devis BTP en 30 secondes',
    description:
      "Devis et factures pour artisans en moins de 30 secondes par dictée vocale. Essai 14 jours gratuit.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mondevisminute.com',
  },
  verification: {
    google: 'QxU3v4fcs4iHa9a9uYOFkAJAL25l4bp0C8Jq0hkJ_bA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <Providers>{children}</Providers>
        <Toaster />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
