type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;
type TtqFn = { track: (event: string, params?: Record<string, unknown>) => void };

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
    ttq?: TtqFn;
  }
}

function safe(fn: () => void) {
  if (typeof window === 'undefined') return;
  try { fn(); } catch { /* silent — analytics never breaks UX */ }
}

export function trackSignup(email?: string) {
  safe(() => {
    window.gtag?.('event', 'sign_up', { method: 'email' });
    window.fbq?.('track', 'CompleteRegistration', { content_name: 'trial_signup' });
    window.ttq?.track('CompleteRegistration', { email });
  });
}

export function trackPurchase(value = 29, currency = 'EUR') {
  safe(() => {
    window.gtag?.('event', 'purchase', { value, currency, transaction_id: `sub_${Date.now()}` });
    window.fbq?.('track', 'Purchase', { value, currency });
    window.ttq?.track('CompletePayment', { value, currency });
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  safe(() => {
    window.gtag?.('event', name, params);
    window.fbq?.('trackCustom', name, params);
    window.ttq?.track(name, params);
  });
}
