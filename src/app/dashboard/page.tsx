'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { ProtectedLayout } from '@/components/protected-layout';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { FileText, Receipt, TrendingUp, Clock, UserCog, AlertTriangle } from 'lucide-react';

interface Stats {
  totalDevis: number;
  totalFactures: number;
  caMonth: number;
  pendingDevis: number;
}

interface Devis {
  id: number;
  numero: string;
  total_ttc: number;
  statut: string;
  created_at: string;
}

interface ProfileStatus {
  profil_complet: boolean;
  logo_url: string | null;
  assurance_decennale_nom: string | null;
}

export default function DashboardPage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<Stats>({ totalDevis: 0, totalFactures: 0, caMonth: 0, pendingDevis: 0 });
  const [recentDevis, setRecentDevis] = useState<Devis[]>([]);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [devisRes, facturesRes, profileRes] = await Promise.all([
          api.get<{ data: { devis: Devis[] } }>('/devis').catch(() => ({ data: { devis: [] } })),
          api.get<{ data: { factures: unknown[] } }>('/factures').catch(() => ({ data: { factures: [] } })),
          api.get<{ data: { profile: ProfileStatus } }>('/profile').catch(() => null),
        ]);

        const allDevis = devisRes.data?.devis || [];
        const allFactures = devisRes.data ? (facturesRes.data?.factures || []) : [];

        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        setStats({
          totalDevis: allDevis.length,
          totalFactures: allFactures.length,
          caMonth: allDevis
            .filter((d) => new Date(d.created_at) >= monthStart && d.statut === 'signe')
            .reduce((sum, d) => sum + (d.total_ttc || 0), 0),
          pendingDevis: allDevis.filter((d) => d.statut === 'brouillon').length,
        });

        setRecentDevis(allDevis.slice(0, 5));

        if (profileRes?.data?.profile) {
          setProfileStatus(profileRes.data.profile);
        }
      } catch {
        // API might not be fully available
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    { label: t('totalDevis'), value: stats.totalDevis, icon: FileText, color: 'text-blue-500' },
    { label: t('totalFactures'), value: stats.totalFactures, icon: Receipt, color: 'text-green-500' },
    { label: t('caMonth'), value: `${stats.caMonth.toFixed(2)} \u20ac`, icon: TrendingUp, color: 'text-emerald-500' },
    { label: t('pendingDevis'), value: stats.pendingDevis, icon: Clock, color: 'text-orange-500' },
  ];

  return (
    <ProtectedLayout>
      <PageHeader title={t('dashboard')} />

      {/* Profile incomplete banner */}
      {profileStatus && (!profileStatus.profil_complet || !profileStatus.logo_url || !profileStatus.assurance_decennale_nom) && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950 p-4">
          <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
          <p className="text-sm text-orange-800 dark:text-orange-200 flex-1">
            {t('dashboardProfileBanner')}
          </p>
          <Link href="/profil">
            <Button size="sm" variant="outline" className="shrink-0 gap-1">
              <UserCog className="h-4 w-4" />
              {t('fillProfile')}
            </Button>
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('recentDevis')}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">{t('loading')}</p>
          ) : recentDevis.length === 0 ? (
            <p className="text-muted-foreground">{t('noData')}</p>
          ) : (
            <div className="space-y-3">
              {recentDevis.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{d.numero}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{d.total_ttc?.toFixed(2)} &euro;</p>
                    <p className="text-sm text-muted-foreground capitalize">{d.statut}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ProtectedLayout>
  );
}
