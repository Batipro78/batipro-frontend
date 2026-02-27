'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Download } from 'lucide-react';

interface Facture {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  created_at: string;
  pdf_url?: string;
  clients?: { nom: string };
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  brouillon: 'secondary',
  emise: 'outline',
  payee_partiellement: 'outline',
  payee: 'default',
  annulee: 'destructive',
};

const statusLabel: Record<string, string> = {
  brouillon: 'Brouillon',
  emise: 'Émise',
  payee_partiellement: 'Partiellement payée',
  payee: 'Payée',
  annulee: 'Annulée',
};

export default function FacturesPage() {
  const { t } = useI18n();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get<{ data: { data: Facture[] } }>('/factures');
        setFactures(res.data?.data || []);
      } catch { /* ignore */ } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const columns = [
    { key: 'numero', header: t('invoiceNumber') },
    {
      key: 'client', header: 'Client', render: (r: Facture) =>
        r.clients?.nom || '-',
    },
    { key: 'total_ht', header: t('totalHT'), render: (r: Facture) => `${(r.total_ht || 0).toFixed(2)} \u20ac` },
    { key: 'total_ttc', header: t('totalTTC'), render: (r: Facture) => `${(r.total_ttc || 0).toFixed(2)} \u20ac` },
    {
      key: 'statut', header: t('status'), render: (r: Facture) => (
        <Badge variant={statusVariant[r.statut] || 'secondary'}>
          {statusLabel[r.statut] || r.statut}
        </Badge>
      ),
    },
    {
      key: 'date', header: t('date'), render: (r: Facture) =>
        new Date(r.created_at).toLocaleDateString('fr-FR'),
    },
    {
      key: 'actions', header: 'Actions', render: (r: Facture) =>
        r.pdf_url ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              try {
                const res = await fetch(r.pdf_url!);
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${r.numero}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
              } catch {
                window.open(r.pdf_url!, '_blank');
              }
            }}
            title="Télécharger le PDF"
          >
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
        ) : null,
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader title={t('factures')} />
      <DataTable columns={columns} data={factures} loading={loading} />
    </ProtectedLayout>
  );
}
