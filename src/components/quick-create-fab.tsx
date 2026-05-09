'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Plus, Mic, UserPlus, FileText, X, Package } from 'lucide-react';

interface FabAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  bg: string;
}

export function QuickCreateFab() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Hide on auth pages and /abonnement (focus on main work pages)
  const hiddenOn = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];
  if (hiddenOn.includes(pathname)) return null;

  const actions: FabAction[] = [
    {
      icon: Mic,
      label: 'Créer un devis',
      onClick: () => router.push('/voice'),
      bg: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      icon: Package,
      label: 'Articles',
      onClick: () => router.push('/articles'),
      bg: 'bg-amber-600 hover:bg-amber-700',
    },
    {
      icon: UserPlus,
      label: 'Nouveau client',
      onClick: () => router.push('/clients'),
      bg: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: FileText,
      label: 'Factures',
      onClick: () => router.push('/factures'),
      bg: 'bg-emerald-600 hover:bg-emerald-700',
    },
  ];

  return (
    <>
      {/* Backdrop quand ouvert */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FAB + actions */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
        {/* Bouton principal */}
        <button
          aria-label={open ? 'Fermer le menu rapide' : 'Ouvrir le menu rapide'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all ${
            open
              ? 'bg-destructive hover:bg-destructive/90 rotate-45'
              : 'bg-primary hover:bg-primary/90'
          } text-primary-foreground`}
        >
          {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>

        {/* Actions empilees */}
        {open &&
          actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background shadow">
                  {action.label}
                </span>
                <button
                  aria-label={action.label}
                  onClick={() => {
                    action.onClick();
                    setOpen(false);
                  }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors ${action.bg} text-white`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
