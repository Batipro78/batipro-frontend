import { api } from './api';
import { storage } from './storage';

// Clé compatible expo-secure-store ([A-Za-z0-9._-]).
const KEY_DISMISSED = 'onboarding_premiers_pas_dismissed';

export interface OnboardingState {
  /** Profil artisan complet (SIRET, adresse, etc.) — requis pour des devis valides. */
  profileDone: boolean;
  /** Au moins un client enregistré. */
  clientDone: boolean;
  /** Au moins un devis créé. */
  devisDone: boolean;
  /** Les 3 prérequis sont remplis. */
  allDone: boolean;
}

/**
 * Récupère l'état d'onboarding (profil / client / devis) en parallèle.
 * Tolérant aux erreurs réseau : une requête en échec compte comme "non fait"
 * plutôt que de faire planter l'accueil.
 */
export async function fetchOnboardingState(): Promise<OnboardingState> {
  const [profileRes, clientsRes, devisRes] = await Promise.all([
    api
      .get<{ data: { profile: { profil_complet?: boolean } } }>('/profile')
      .catch(() => null),
    api.get<{ data: { data: unknown[] } }>('/clients').catch(() => null),
    api.get<{ data: { data: unknown[] } }>('/devis').catch(() => null),
  ]);

  const profileDone = !!profileRes?.data?.profile?.profil_complet;
  const clientDone = (clientsRes?.data?.data?.length ?? 0) > 0;
  const devisDone = (devisRes?.data?.data?.length ?? 0) > 0;

  return {
    profileDone,
    clientDone,
    devisDone,
    allDone: profileDone && clientDone && devisDone,
  };
}

export const onboarding = {
  /** L'artisan a-t-il masqué le bloc "Premiers pas" ? */
  async isDismissed(): Promise<boolean> {
    return (await storage.get(KEY_DISMISSED)) === '1';
  },
  async dismiss(): Promise<void> {
    await storage.set(KEY_DISMISSED, '1');
  },
  async reset(): Promise<void> {
    await storage.remove(KEY_DISMISSED);
  },
};
