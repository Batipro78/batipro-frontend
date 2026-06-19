import { Ionicons } from '@expo/vector-icons';

export type MetierKey =
  | 'electricien'
  | 'plombier'
  | 'macon'
  | 'couvreur'
  | 'plaquiste'
  | 'peintre'
  | 'carreleur'
  | 'menuisier'
  | 'charpentier'
  | 'serrurier'
  | 'paysagiste'
  | 'solier'
  | 'terrassier';

export interface Metier {
  key: MetierKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  hasGammes: boolean;
}

export const METIERS: Metier[] = [
  { key: 'electricien', label: 'Électricien', icon: 'flash-outline', hasGammes: true },
  { key: 'plombier', label: 'Plombier', icon: 'water-outline', hasGammes: true },
  { key: 'macon', label: 'Maçon', icon: 'cube-outline', hasGammes: false },
  { key: 'couvreur', label: 'Couvreur', icon: 'home-outline', hasGammes: false },
  { key: 'plaquiste', label: 'Plaquiste', icon: 'grid-outline', hasGammes: false },
  { key: 'peintre', label: 'Peintre', icon: 'color-palette-outline', hasGammes: false },
  { key: 'carreleur', label: 'Carreleur', icon: 'apps-outline', hasGammes: false },
  { key: 'menuisier', label: 'Menuisier', icon: 'hammer-outline', hasGammes: false },
  { key: 'charpentier', label: 'Charpentier', icon: 'construct-outline', hasGammes: false },
  { key: 'serrurier', label: 'Serrurier', icon: 'lock-closed-outline', hasGammes: false },
  { key: 'paysagiste', label: 'Paysagiste', icon: 'leaf-outline', hasGammes: false },
  { key: 'solier', label: 'Solier', icon: 'layers-outline', hasGammes: false },
  { key: 'terrassier', label: 'Terrassier', icon: 'trail-sign-outline', hasGammes: false },
];

export const METIER_BY_KEY: Record<MetierKey, Metier> = METIERS.reduce(
  (acc, m) => ({ ...acc, [m.key]: m }),
  {} as Record<MetierKey, Metier>
);

export type Gamme = 'eco' | 'standard' | 'premium';

export const GAMMES: { key: Gamme; label: string; description: string }[] = [
  {
    key: 'eco',
    label: 'Éco',
    description: 'Matériel d\'entrée de gamme, prix mini',
  },
  {
    key: 'standard',
    label: 'Standard',
    description: 'Bon rapport qualité-prix',
  },
  {
    key: 'premium',
    label: 'Premium',
    description: 'Matériel haut de gamme',
  },
];
