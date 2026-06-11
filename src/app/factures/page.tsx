'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Download, Coins } from 'lucide-react';
import { toast } from 'sonner';

interface Facture {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  created_at: string;
  pdf_url?: string;
  clients?: { nom: string };
  type?: 'finale' | 'situation' | 'retenue' | 'avoir';
  pourcentage_avancement?: number | null;
  numero_situation?: number | null;
  retenue_garantie_pct?: number;
  retenue_garantie_montant?: number;
  retenue_liberee?: boolean;
  retenue_liberable_apres?: string | null;
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

const typeLabel: Record<string, string> = {
  finale: 'Finale',
  situation: 'Situation',
  retenue: 'Retenue',
  avoir: 'Avoir',
};

const typeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  finale: 'default',
  situation: 'outline',
  retenue: 'secondary',
  avoir: 'destructive',
};

export default function FacturesPage() {
  const { t } = useI18n();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFactures() {
    try {
      setLoading(true);
      const res = await api.get<{ data: { data: Facture[] } }>('/factures');
      setFactures(res.data?.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFactures();
  }, []);

  async function handleLibererRetenue(f: Facture) {
    if (!confirm(`Libérer la retenue de garantie de ${f.retenue_garantie_montant?.toFixed(2)} € ?`)) return;
    try {
      await api.post(`/factures/${f.id}/liberer-retenue`, {});
      toast.success('Retenue libérée — facture créée');
      loadFactures();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur libération retenue');
    }
  }

  const columns = [
    { key: 'numero', header: t('invoiceNumber') },
    {
      key: 'type', header: 'Type', render: (r: Facture) => {
        const type = r.type || 'finale';
        const label =
          type === 'situation' && r.numero_situation
            ? `Situation ${r.numero_situation} (${r.pourcentage_avancement}%)`
            : typeLabel[type] || type;
        return (
          <Badge variant={typeVariant[type] || 'secondary'}>{label}</Badge>
        );
      },
    },
    {
      key: 'client', header: 'Client', render: (r: Facture) =>
        r.clients?.nom || '-',
    },
    { key: 'total_ht', header: t('totalHT'), render: (r: Facture) => `${(r.total_ht || 0).toFixed(2)} €` },
    { key: 'total_ttc', header: t('totalTTC'), render: (r: Facture) => `${(r.total_ttc || 0).toFixed(2)} €` },
    {
      key: 'retenue', header: 'Retenue', render: (r: Facture) => {
        const montant = Number(r.retenue_garantie_montant || 0);
        if (montant <= 0) return null;
        if (r.retenue_liberee) {
          return <span className="text-xs text-muted-foreground">Libérée</span>;
        }
        const liberable = r.retenue_liberable_apres ? new Date(r.retenue_liberable_apres) : null;
        const now = new Date();
        const isDue = liberable && now >= liberable;
        return (
          <div className="text-xs">
            <div className="font-medium text-amber-700">{montant.toFixed(2)} €</div>
            <div className="text-muted-foreground">
              {isDue ? 'Libérable' : `dès ${liberable?.toLocaleDateString('fr-FR')}`}
            </div>
          </div>
        );
      },
    },
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
      key: 'actions', header: 'Actions', render: (r: Facture) => {
        const montantRet = Number(r.retenue_garantie_montant || 0);
        const liberable = r.retenue_liberable_apres ? new Date(r.retenue_liberable_apres) : null;
        const isDue = liberable && new Date() >= liberable;
        const canRelease = montantRet > 0 && !r.retenue_liberee && isDue;
        return (
          <div className="flex gap-1">
            {canRelease && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLibererRetenue(r)}
                title="Libérer la retenue de garantie"
                className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
              >
                <Coins className="h-4 w-4 mr-1" />
                Libérer
              </Button>
            )}
            {r.pdf_url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  // pdf_url stocke = lien signe Supabase qui expire : on
                  // redemande un lien frais au backend avant le telechargement.
                  let pdfUrl = r.pdf_url!;
                  try {
                    const fresh = await api.get<{ data: { pdf_url: string } }>(`/factures/${r.id}/pdf-url`);
                    if (fresh.data?.pdf_url) pdfUrl = fresh.data.pdf_url;
                  } catch { /* fallback sur le lien stocke */ }
                  try {
                    const res = await fetch(pdfUrl);
                    if (!res.ok) throw new Error('fetch pdf failed');
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${r.numero}.pdf`;
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch {
                    window.open(pdfUrl, '_blank');
                  }
                }}
                title="Télécharger le PDF"
              >
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader title={t('factures')} />
      <DataTable columns={columns} data={factures} loading={loading} />
    </ProtectedLayout>
  );
}
