import type { Metadata } from 'next';

// `page.tsx` est un composant client et ne peut pas exporter de metadata :
// on passe par ce layout pour déclarer le canonical de la page d'inscription,
// qui figure dans le sitemap et reçoit du trafic publicitaire (paramètres UTM).
export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mondevisminute.com/signup' },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
