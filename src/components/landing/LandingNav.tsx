'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            BatiPro
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#voix" className="hover:text-foreground transition">Devis vocal</a>
          <a href="#fonctionnalites" className="hover:text-foreground transition">Fonctionnalités</a>
          <a href="#metiers" className="hover:text-foreground transition">Métiers</a>
          <a href="#tarifs" className="hover:text-foreground transition">Tarifs</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm font-medium text-foreground hover:text-primary transition"
          >
            Connexion
          </Link>
          <Button asChild size="sm" className="rounded-full px-5">
            <Link href="/signup">14 jours gratuits</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
