'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';

interface Devis {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  source_creation: string;
  created_at: string;
  clients?: { nom: string };
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  brouillon: 'secondary',
  envoye: 'outline',
  signe: 'default',
  refuse: 'destructive',
};

export default function DevisPage() {
  const { t } = useI18n();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<{ data: Devis[] }>('/devis');
        setDevis(res.data || []);
      } catch { /* ignore */ } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statusLabel: Record<string, string> = {
    brouillon: t('draft'),
    envoye: t('sent'),
    signe: t('signed'),
    refuse: t('rejected'),
  };

  const columns = [
    { key: 'numero', header: t('devisNumber') },
    {
      key: 'client', header: t('client'), render: (r: Devis) =>
        (r.clients as unknown as { nom: string })?.nom || '-',
    },
    { key: 'total_ht', header: t('totalHT'), render: (r: Devis) => `${(r.total_ht || 0).toFixed(2)} \u20ac` },
    { key: 'total_ttc', header: t('totalTTC'), render: (r: Devis) => `${(r.total_ttc || 0).toFixed(2)} \u20ac` },
    {
      key: 'statut', header: t('status'), render: (r: Devis) => (
        <Badge variant={statusVariant[r.statut] || 'secondary'}>
          {statusLabel[r.statut] || r.statut}
        </Badge>
      ),
    },
    {
      key: 'source', header: 'Source', render: (r: Devis) =>
        r.source_creation === 'vocal_ia' ? (
          <Badge variant="outline">IA Vocale</Badge>
        ) : null,
    },
    {
      key: 'date', header: t('date'), render: (r: Devis) =>
        new Date(r.created_at).toLocaleDateString('fr-FR'),
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader title={t('devis')} />
      <DataTable columns={columns} data={devis} loading={loading} />
    </ProtectedLayout>
  );
}
