import type { Metadata } from 'next';

// Même raison que pour /signup : `page.tsx` est un composant client.
export const metadata: Metadata = {
  alternates: { canonical: 'https://mondevisminute.com/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
