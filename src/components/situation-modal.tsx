'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Layers } from 'lucide-react';

interface Situation {
  id: number;
  numero: string;
  pourcentage_avancement: number | null;
  numero_situation: number | null;
  total_ttc: number;
  retenue_garantie_montant: number;
  date_emission: string;
}

interface SituationModalProps {
  devisId: number | null;
  devisNumero: string;
  totalTTC: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

export function SituationModal({
  devisId,
  devisNumero,
  totalTTC,
  open,
  onOpenChange,
  onCreated,
}: SituationModalProps) {
  const [situations, setSituations] = useState<Situation[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pourcentage, setPourcentage] = useState<number>(30);
  const [retenue, setRetenue] = useState<number>(0);

  useEffect(() => {
    if (!open || !devisId) return;
    setLoading(true);
    api
      .get<{ data: Situation[] }>(`/devis/${devisId}/situations`)
      .then((res) => {
        const list = res.data || [];
        setSituations(list);
        // Suggerer un pourcentage par defaut au-dessus du dernier
        const max = list.reduce(
          (m, s) => Math.max(m, Number(s.pourcentage_avancement || 0)),
          0
        );
        const next = Math.min(100, Math.max(max + 30, max + 1));
        setPourcentage(next);
        setRetenue(next === 100 ? 5 : 0);
      })
      .catch(() => setSituations([]))
      .finally(() => setLoading(false));
  }, [open, devisId]);

  const pourcentageDejaFacture = situations.reduce(
    (sum, s) => Math.max(sum, Number(s.pourcentage_avancement || 0)),
    0
  );

  const ratio = (pourcentage - pourcentageDejaFacture) / 100;
  const montantBrut = totalTTC * ratio;
  const montantRetenue = montantBrut * (retenue / 100);
  const montantNet = montantBrut - montantRetenue;

  const handleSubmit = async () => {
    if (!devisId) return;
    if (pourcentage <= pourcentageDejaFacture) {
      toast.error(`Le pourcentage doit être > ${pourcentageDejaFacture}%`);
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/devis/${devisId}/situations`, {
        pourcentage_avancement: pourcentage,
        retenue_garantie_pct: retenue,
      });
      toast.success(`Situation ${situations.length + 1} créée`);
      onOpenChange(false);
      onCreated?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur création situation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Situation de travaux — {devisNumero}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Recap devis */}
            <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total devis TTC</span>
                <span className="font-semibold">{totalTTC.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Déjà facturé</span>
                <span>
                  {pourcentageDejaFacture}% ({((totalTTC * pourcentageDejaFacture) / 100).toFixed(2)} €)
                </span>
              </div>
              {situations.length > 0 && (
                <div className="pt-2 mt-2 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Situations précédentes :
                  </p>
                  {situations.map((s) => (
                    <div key={s.id} className="flex justify-between text-xs">
                      <span>
                        Sit. {s.numero_situation} — {s.numero} ({s.pourcentage_avancement}%)
                      </span>
                      <span className="font-medium">{Number(s.total_ttc).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saisie */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>% d&apos;avancement (cumulé)</Label>
                <Input
                  type="number"
                  min={pourcentageDejaFacture + 1}
                  max={100}
                  step={1}
                  value={pourcentage}
                  onChange={(e) => setPourcentage(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Min : {pourcentageDejaFacture + 1}% &mdash; Max : 100%
                </p>
              </div>
              <div className="space-y-2">
                <Label>Retenue garantie %</Label>
                <Input
                  type="number"
                  min={0}
                  max={5}
                  step={0.5}
                  value={retenue}
                  onChange={(e) => setRetenue(parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Max légal : 5% &mdash; libérable 1 an après
                </p>
              </div>
            </div>

            {/* Calcul preview */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Pourcentage facturé sur cette situation
                </span>
                <span className="font-medium">
                  {Math.max(0, pourcentage - pourcentageDejaFacture)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant brut TTC</span>
                <span>{montantBrut.toFixed(2)} €</span>
              </div>
              {retenue > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Retenue de garantie ({retenue}%)</span>
                  <span>- {montantRetenue.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between font-bold pt-2 mt-2 border-t border-primary/20">
                <span>À facturer maintenant</span>
                <span>{montantNet.toFixed(2)} €</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
                Annuler
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Créer la situation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
