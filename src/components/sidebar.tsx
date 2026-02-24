'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Receipt,
  Mic,
  UserCog,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { useI18n } from '@/lib/i18n';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' as const },
  { href: '/clients', icon: Users, labelKey: 'clients' as const },
  { href: '/articles', icon: Package, labelKey: 'articles' as const },
  { href: '/devis', icon: FileText, labelKey: 'devis' as const },
  { href: '/factures', icon: Receipt, labelKey: 'factures' as const },
  { href: '/voice', icon: Mic, labelKey: 'voiceAi' as const },
  { href: '/profil', icon: UserCog, labelKey: 'profile' as const },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">BatiPro</h1>
        <p className="text-sm text-muted-foreground">Gestion artisan</p>
      </div>
      <Separator />
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
        >
          <Globe className="h-4 w-4" />
          {locale === 'fr' ? 'English' : 'Français'}
        </Button>
        <Separator />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-card">
        <NavContent />
      </aside>

      {/* Mobile header + sheet */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-primary">BatiPro</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <NavContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
