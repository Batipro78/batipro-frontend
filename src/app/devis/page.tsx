'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Download, FileText, PenLine, MessageCircle, Mail, Mic, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SignatureModal } from '@/components/signature-modal';
import { EditDevisModal } from '@/components/edit-devis-modal';

interface ArtisanProfile {
  nom: string;
  email: string;
  telephone: string;
}

interface Devis {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  source_creation: string;
  created_at: string;
  pdf_url: string | null;
  clients?: { nom: string; telephone?: string; email?: string };
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  brouillon: 'secondary',
  genere: 'outline',
  envoye: 'outline',
  signe: 'default',
  refuse: 'destructive',
  facture: 'default',
};

function formatPhone(phone: string): string {
  let clean = phone.replace(/[\s.\-()]/g, '');
  if (clean.startsWith('0')) {
    clean = '33' + clean.slice(1);
  }
  if (!clean.startsWith('+') && !clean.startsWith('33')) {
    clean = '33' + clean;
  }
  return clean;
}

export default function DevisPage() {
  const { t } = useI18n();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [signDevis, setSignDevis] = useState<Devis | null>(null);
  const [editDevis, setEditDevis] = useState<Devis | null>(null);
  const [artisan, setArtisan] = useState<ArtisanProfile | null>(null);
  const router = useRouter();

  async function loadDevis() {
    try {
      setLoading(true);
      const res = await api.get<{ data: { data: Devis[] } }>('/devis');
      setDevis(res.data?.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }

  async function loadProfile() {
    try {
      const res = await api.get<{ data: { profile: ArtisanProfile } }>('/profile');
      setArtisan(res.data?.profile || null);
    } catch { /* ignore */ }
  }

  useEffect(() => {
    loadDevis();
    loadProfile();
  }, []);

  // Les pdf_url stockes en base sont des liens signes Supabase qui expirent :
  // on redemande un lien frais au backend avant tout partage/telechargement,
  // sinon le client recoit "Invalid Jwt / exp claim timestamp check failed".
  async function getFreshPdfUrl(r: Devis): Promise<string | null> {
    try {
      const res = await api.get<{ data: { pdf_url: string } }>(`/devis/${r.id}/pdf-url`);
      return res.data?.pdf_url ?? r.pdf_url;
    } catch {
      return r.pdf_url;
    }
  }

  async function handleWhatsApp(r: Devis) {
    const clientNom = r.clients?.nom || 'Client';
    const phone = r.clients?.telephone;
    if (!phone) {
      toast.error('Aucun numéro de téléphone pour ce client');
      return;
    }
    // Onglet ouvert AVANT l'await : un window.open hors du geste utilisateur
    // serait bloque par l'anti-popup.
    const win = window.open('', '_blank');
    const entreprise = artisan?.nom || 'Notre entreprise';
    const pdfUrl = await getFreshPdfUrl(r);
    const message = `Bonjour ${clientNom}, c'est ${entreprise}. Ravi d'avoir échangé avec vous. Voici votre devis n°${r.numero} pour vos travaux. Montant : ${r.total_ttc.toFixed(2)} € TTC.${pdfUrl ? ` Vous pouvez le consulter ici : ${pdfUrl}` : ''} Je reste à votre disposition !`;

    const waUrl = `https://wa.me/${formatPhone(phone)}?text=${encodeURIComponent(message)}`;
    if (win) {
      win.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank');
    }

    // Mettre à jour le statut en 'envoye' si le devis est 'genere'
    if (r.statut === 'genere') {
      api.put(`/devis/${r.id}`, { statut: 'envoye' })
        .then(() => loadDevis())
        .catch(() => {
          toast.error('Message ouvert mais le statut du devis n\'a pas pu passer à "Envoyé"');
        });
    }
  }

  async function handleEmail(r: Devis) {
    const clientNom = r.clients?.nom || 'Client';
    const clientEmail = r.clients?.email;
    if (!clientEmail) {
      toast.error('Aucune adresse email pour ce client');
      return;
    }
    const entreprise = artisan?.nom || 'Notre entreprise';
    const subject = `Devis n°${r.numero} - ${entreprise}`;
    const pdfUrl = await getFreshPdfUrl(r);
    const body = `Bonjour ${clientNom},\n\nSuite à notre visite de chantier, veuillez trouver ci-joint votre devis détaillé d'un montant de ${r.total_ttc.toFixed(2)} € TTC.\n\n${pdfUrl ? `Vous pouvez y accéder via ce lien sécurisé : ${pdfUrl}\n\n` : ''}N'hésitez pas à me contacter pour toute précision.\n\nBien cordialement,\n${entreprise}`;

    window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');

    // Mettre à jour le statut en 'envoye' si le devis est 'genere'
    if (r.statut === 'genere') {
      api.put(`/devis/${r.id}`, { statut: 'envoye' })
        .then(() => loadDevis())
        .catch(() => {
          toast.error('Email ouvert mais le statut du devis n\'a pas pu passer à "Envoyé"');
        });
    }
  }

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
        r.clients?.nom || '-',
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
      key: 'partage', header: 'Partage', render: (r: Devis) => (
        <div className="flex gap-1">
          {r.pdf_url && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleWhatsApp(r)}
                title={r.clients?.telephone ? `WhatsApp : ${r.clients.telephone}` : 'Pas de téléphone'}
                disabled={!r.clients?.telephone}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => handleEmail(r)}
                title={r.clients?.email ? `Email : ${r.clients.email}` : 'Pas d\'email'}
                disabled={!r.clients?.email}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'actions', header: 'Actions', render: (r: Devis) => (
        <div className="flex gap-1">
          {r.statut === 'brouillon' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/voice?devis_id=${r.id}`)}
              title="Ajouter des travaux vocaux"
            >
              <Mic className="h-4 w-4 mr-1" />
              + Travaux
            </Button>
          )}
          {(r.statut === 'brouillon' || r.statut === 'genere') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditDevis(r)}
              title="Modifier les lignes du devis"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          )}
          {r.pdf_url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                const pdfUrl = (await getFreshPdfUrl(r)) || r.pdf_url!;
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
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={async () => {
              const confirmation = window.confirm(
                `Supprimer le devis ${r.numero} ?\n\nCette action est irréversible.`
              );
              if (!confirmation) return;
              try {
                await api.delete(`/devis/${r.id}`);
                toast.success('Devis supprimé');
                loadDevis();
              } catch (err) {
                toast.error(err instanceof Error ? err.message : 'Erreur suppression');
              }
            }}
            title="Supprimer le devis"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
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

      <EditDevisModal
        devisId={editDevis?.id ?? null}
        devisNumero={editDevis?.numero ?? ''}
        open={!!editDevis}
        onOpenChange={(open) => { if (!open) setEditDevis(null); }}
        onSaved={loadDevis}
      />
    </ProtectedLayout>
  );
}
