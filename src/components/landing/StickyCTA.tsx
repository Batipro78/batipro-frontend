'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Visible après le hero (≈600 px) et masqué quand on approche du footer (les 600 derniers px)
      setVisible(y > 600 && y < max - 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-border shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-foreground leading-tight truncate">
              Tester MonDevisMinute gratuitement
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              14 jours · sans CB · annulable en 1 clic
            </p>
          </div>
          <Link
            href="/signup"
            className="flex-shrink-0 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-4 h-11 text-sm font-semibold shadow-lg shadow-primary/30 active:scale-95 transition-transform"
          >
            Démarrer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
