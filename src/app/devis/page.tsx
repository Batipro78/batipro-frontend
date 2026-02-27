'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Download, FileText, PenLine, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { SignatureModal } from '@/components/signature-modal';
import { ShareModal } from '@/components/share-modal';

interface Devis {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  source_creation: string;
  created_at: string;
  pdf_url: string | null;
  clients?: { nom: string; telephone?: string };
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  brouillon: 'secondary',
  genere: 'outline',
  envoye: 'outline',
  signe: 'default',
  refuse: 'destructive',
  facture: 'default',
};

export default function DevisPage() {
  const { t } = useI18n();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [signDevis, setSignDevis] = useState<Devis | null>(null);
  const [shareDevis, setShareDevis] = useState<Devis | null>(null);

  async function loadDevis() {
    try {
      setLoading(true);
      const res = await api.get<{ data: { data: Devis[] } }>('/devis');
      setDevis(res.data?.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadDevis(); }, []);

  const statusLabel: Record<string, string> = {
    brouillon: t('draft'),
    genere: 'PDF généré',
    envoye: 'Envoyé',
    signe: t('signed'),
    refuse: t('rejected'),
    facture: 'Facturé',
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
    {
      key: 'actions', header: 'Actions', render: (r: Devis) => (
        <div className="flex gap-1">
          {r.pdf_url && (
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
          )}
          {r.statut === 'genere' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSignDevis(r)}
              title="Faire signer le client"
            >
              <PenLine className="h-4 w-4 mr-1" />
              Signer
            </Button>
          )}
          {r.statut === 'genere' && r.pdf_url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShareDevis(r)}
              title="Partager le devis"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Partager
            </Button>
          )}
          {(r.statut === 'genere' || r.statut === 'signe') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                try {
                  await api.post(`/devis/${r.id}/facturer`, { devis_id: r.id });
                  toast.success('Facture créée avec succès !');
                  loadDevis();
                } catch {
                  toast.error('Erreur lors de la création de la facture');
                }
              }}
              title="Convertir en facture"
            >
              <FileText className="h-4 w-4 mr-1" />
              Facturer
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader title={t('devis')} />
      <DataTable columns={columns} data={devis} loading={loading} />

      <SignatureModal
        devisId={signDevis?.id ?? null}
        devisNumero={signDevis?.numero ?? ''}
        open={!!signDevis}
        onOpenChange={(open) => { if (!open) setSignDevis(null); }}
        onSigned={loadDevis}
      />

      <ShareModal
        devis={shareDevis ? {
          id: shareDevis.id,
          numero: shareDevis.numero,
          pdf_url: shareDevis.pdf_url,
          total_ttc: shareDevis.total_ttc,
          clientTelephone: shareDevis.clients?.telephone,
          clientNom: shareDevis.clients?.nom,
        } : null}
        open={!!shareDevis}
        onOpenChange={(open) => { if (!open) setShareDevis(null); }}
        onShared={loadDevis}
      />
    </ProtectedLayout>
  );
}
