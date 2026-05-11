'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false,
  loading: () => null,
});

const StickyCTA = dynamic(() => import('./StickyCTA'), {
  ssr: false,
  loading: () => null,
});

export default function DeferredLandingExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onIdle = () => setReady(true);
    type IdleScheduler = (cb: () => void) => number;
    const w = window as unknown as { requestIdleCallback?: IdleScheduler };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(onIdle);
      return () => {
        const cancel = (window as unknown as { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback;
        if (typeof cancel === 'function') cancel(id);
      };
    }
    const t = window.setTimeout(onIdle, 1500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <>
      <StickyCTA />
      <Chatbot />
    </>
  );
}
