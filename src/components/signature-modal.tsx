'use client';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Eraser, Check, Loader2 } from 'lucide-react';

interface SignatureModalProps {
  devisId: number | null;
  devisNumero: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSigned: () => void;
}

export function SignatureModal({ devisId, devisNumero, open, onOpenChange, onSigned }: SignatureModalProps) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [saving, setSaving] = useState(false);

  function handleClear() {
    sigRef.current?.clear();
  }

  async function handleValidate() {
    if (!sigRef.current || sigRef.current.isEmpty()) {
      toast.error('Veuillez dessiner une signature');
      return;
    }
    if (!devisId) return;

    setSaving(true);
    try {
      const dataUrl = sigRef.current.toDataURL('image/png');
      // Extract base64 from data URL
      const base64 = dataUrl.split(',')[1];

      await api.post(`/devis/${devisId}/signature`, { signature: base64 });
      toast.success('Devis signé avec succès !');
      onOpenChange(false);
      onSigned();
    } catch {
      toast.error('Erreur lors de la signature du devis');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Signer le devis</DialogTitle>
          <DialogDescription>
            Devis {devisNumero} — Dessinez la signature du client ci-dessous
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg bg-white touch-none">
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              className: 'w-full h-48 sm:h-56',
              style: { width: '100%', height: '100%' },
            }}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClear} disabled={saving}>
            <Eraser className="h-4 w-4 mr-1" />
            Effacer
          </Button>
          <Button onClick={handleValidate} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-1" />
            )}
            Valider la signature
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
