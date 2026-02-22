'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';

interface Facture {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  created_at: string;
  pdf_url?: string;
}

export default function FacturesPage() {
  const { t } = useI18n();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<{ data: Facture[] }>('/factures');
        setFactures(res.data || []);
      } catch { /* ignore */ } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const columns = [
    { key: 'numero', header: t('invoiceNumber') },
    { key: 'total_ht', header: t('totalHT'), render: (r: Facture) => `${(r.total_ht || 0).toFixed(2)} \u20ac` },
    { key: 'total_ttc', header: t('totalTTC'), render: (r: Facture) => `${(r.total_ttc || 0).toFixed(2)} \u20ac` },
    {
      key: 'statut', header: t('status'), render: (r: Facture) => (
        <Badge variant={r.statut === 'payee' ? 'default' : 'secondary'}>{r.statut}</Badge>
      ),
    },
    {
      key: 'date', header: t('date'), render: (r: Facture) =>
        new Date(r.created_at).toLocaleDateString('fr-FR'),
    },
  ];

  return (
    <div>
      <PageHeader title={t('factures')} />
      <DataTable columns={columns} data={factures} loading={loading} />
    </div>
  );
}
