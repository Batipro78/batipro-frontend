'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Download, MessageCircle, Loader2 } from 'lucide-react';

interface ShareModalProps {
  devis: {
    id: number;
    numero: string;
    pdf_url: string | null;
    total_ttc: number;
    clientTelephone?: string;
    clientNom?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShared: () => void;
}

export function ShareModal({ devis, open, onOpenChange, onShared }: ShareModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [sendingWa, setSendingWa] = useState(false);

  async function handleDownload() {
    if (!devis?.pdf_url) return;
    setDownloading(true);
    try {
      const res = await fetch(devis.pdf_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${devis.numero}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('PDF téléchargé');
    } catch {
      // Fallback: open in new tab
      window.open(devis.pdf_url, '_blank');
    } finally {
      setDownloading(false);
    }
  }

  async function handleWhatsApp() {
    if (!devis) return;
    setSendingWa(true);
    try {
      // Format phone number for WhatsApp (remove spaces, add country code if needed)
      let phone = devis.clientTelephone || '';
      phone = phone.replace(/[\s.-]/g, '');
      if (phone.startsWith('0')) {
        phone = '33' + phone.slice(1); // French country code
      }
      if (!phone.startsWith('+') && !phone.startsWith('33')) {
        phone = '33' + phone;
      }

      const message = encodeURIComponent(
        `Bonjour ${devis.clientNom || ''},\n\nVeuillez trouver ci-joint votre devis ${devis.numero} d'un montant de ${devis.total_ttc.toFixed(2)} € TTC.\n\nCordialement`
      );

      const waUrl = `https://wa.me/${phone}?text=${message}`;
      window.open(waUrl, '_blank');

      // Update status to 'envoye'
      await api.put(`/devis/${devis.id}`, { statut: 'envoye' });
      toast.success('Statut mis à jour : Envoyé');
      onOpenChange(false);
      onShared();
    } catch {
      toast.error('Erreur lors de la mise à jour du statut');
    } finally {
      setSendingWa(false);
    }
  }

  if (!devis) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager le devis</DialogTitle>
          <DialogDescription>
            Devis {devis.numero} — {devis.total_ttc.toFixed(2)} € TTC
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          <Button
            variant="outline"
            className="justify-start h-14"
            onClick={handleDownload}
            disabled={downloading || !devis.pdf_url}
          >
            {downloading ? (
              <Loader2 className="h-5 w-5 mr-3 animate-spin" />
            ) : (
              <Download className="h-5 w-5 mr-3" />
            )}
            <div className="text-left">
              <div className="font-medium">Télécharger le PDF</div>
              <div className="text-xs text-muted-foreground">Enregistrer sur votre appareil</div>
            </div>
          </Button>

          <Button
            className="justify-start h-14 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleWhatsApp}
            disabled={sendingWa || !devis.clientTelephone}
          >
            {sendingWa ? (
              <Loader2 className="h-5 w-5 mr-3 animate-spin" />
            ) : (
              <MessageCircle className="h-5 w-5 mr-3" />
            )}
            <div className="text-left">
              <div className="font-medium">Envoyer par WhatsApp</div>
              <div className="text-xs text-white/80">
                {devis.clientTelephone
                  ? `Vers ${devis.clientTelephone}`
                  : 'Aucun numéro de téléphone'}
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
