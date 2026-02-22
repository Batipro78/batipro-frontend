'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { FileText, Receipt, TrendingUp, Clock } from 'lucide-react';

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

export default function DashboardPage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<Stats>({ totalDevis: 0, totalFactures: 0, caMonth: 0, pendingDevis: 0 });
  const [recentDevis, setRecentDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [devisRes, facturesRes] = await Promise.all([
          api.get<{ data: Devis[] }>('/devis').catch(() => ({ data: [] })),
          api.get<{ data: unknown[] }>('/factures').catch(() => ({ data: [] })),
        ]);

        const allDevis = devisRes.data || [];
        const allFactures = facturesRes.data || [];

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
    <div>
      <PageHeader title={t('dashboard')} />

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
    </div>
  );
}
