'use client';

import { useEffect } from 'react';
import { API_BASE } from '@/lib/api';

const FLAG = 'mdm_visit_sent';

// Compte une visite 1x par session (top de l'entonnoir visiteurs -> inscriptions).
// sendBeacon = fire-and-forget, pas de preflight CORS, ne bloque pas la page.
export function VisitBeacon() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(FLAG)) return;
      sessionStorage.setItem(FLAG, '1');
      const url = `${API_BASE}/track/visit`;
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon(url);
      } else {
        fetch(url, { method: 'POST', keepalive: true }).catch(() => {});
      }
    } catch {
      /* ignore */
    }
  }, []);
  return null;
}
