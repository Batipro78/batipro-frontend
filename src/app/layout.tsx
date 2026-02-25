import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ weight: '400', variable: '--font-inter', subsets: ['latin'] });
const interTight = Inter_Tight({ weight: '600', variable: '--font-inter-tight', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BatiPro - Gestion Artisan',
  description: 'Application de gestion pour artisans électriciens et plombiers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
