import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ||
  'https://batipro-backend.onrender.com';

const APP_VERSION = Constants.expoConfig?.version ?? '0.0.0';

let lastSentAt = 0;
const MIN_INTERVAL_MS = 2000; // pas plus d'1 crash report toutes les 2s

export async function reportCrash(
  error: Error,
  componentStack?: string,
  context?: Record<string, string | number | boolean>
): Promise<void> {
  const now = Date.now();
  if (now - lastSentAt < MIN_INTERVAL_MS) return; // throttle
  lastSentAt = now;

  const payload = {
    message: String(error?.message || 'Unknown error').slice(0, 500),
    stack: error?.stack ? String(error.stack).slice(0, 8000) : undefined,
    componentStack: componentStack ? String(componentStack).slice(0, 4000) : undefined,
    platform: Platform.OS === 'ios' || Platform.OS === 'android' ? Platform.OS : 'web',
    appVersion: APP_VERSION,
    context,
  };

  try {
    await fetch(`${API_URL}/api/errors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // pas de credentials, endpoint public (rate-limited cote backend)
    });
  } catch {
    // si meme le report fail, on swallow — sinon on cree une boucle de crashes
  }
}
