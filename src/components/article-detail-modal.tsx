'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArticleIcon } from '@/components/article-icon';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { ShoppingCart, Package } from 'lucide-react';

interface Article {
  id: number;
  nom: string;
  prix_ht: number;
  unite: string;
  tva: number;
  metier: string;
  image_url?: string;
  description?: string;
}

interface DevisBrouillon {
  id: number;
  numero: string;
  clients?: { nom: string };
}

interface ArticleDetailModalProps {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArticleDetailModal({ article, open, onOpenChange }: ArticleDetailModalProps) {
  const { t } = useI18n();
  const [showDevisSelector, setShowDevisSelector] = useState(false);
  const [devisBrouillons, setDevisBrouillons] = useState<DevisBrouillon[]>([]);
  const [selectedDevisId, setSelectedDevisId] = useState<string>('');
  const [quantite, setQuantite] = useState(1);
  const [loadingDevis, setLoadingDevis] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowDevisSelector(false);
      setSelectedDevisId('');
      setQuantite(1);
    }
  }, [open]);

  const handleAddToDevisClick = async () => {
    setLoadingDevis(true);
    try {
      const res = await api.get<{ data: { data: DevisBrouillon[] } }>('/devis?statut=brouillon&limit=50');
      const list = res.data?.data || [];
      setDevisBrouillons(list);
      setShowDevisSelector(true);
      if (list.length > 0) {
        setSelectedDevisId(String(list[0].id));
      }
    } catch {
      toast.error('Erreur chargement des devis');
    } finally {
      setLoadingDevis(false);
    }
  };

  const handleConfirmAdd = async () => {
    if (!article || !selectedDevisId) return;
    setAdding(true);
    try {
      await api.post(`/devis/${selectedDevisId}/lignes`, {
        article_id: article.id,
        quantite,
      });
      const devis = devisBrouillons.find(d => String(d.id) === selectedDevisId);
      toast.success(`Article ajouté au devis ${devis?.numero || ''}`);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur ajout');
    } finally {
      setAdding(false);
    }
  };

  if (!article) return null;

  const prixTTC = (article.prix_ht * (1 + article.tva / 100)).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <ArticleIcon articleName={article.nom} metier={article.metier} size="md" />
            <span>{article.nom}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Description */}
          {article.description && (
            <p className="text-sm text-muted-foreground">{article.description}</p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">Prix HT</span>
              <p className="font-semibold text-lg">{article.prix_ht.toFixed(2)} &euro;</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Prix TTC</span>
              <p className="font-semibold text-lg">{prixTTC} &euro;</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">{t('unit')}</span>
              <p className="font-medium">{article.unite}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">TVA</span>
              <p className="font-medium">{article.tva}%</p>
            </div>
            <div className="space-y-1 col-span-2">
              <span className="text-muted-foreground">{t('trade')}</span>
              <div>
                <Badge variant={article.metier === 'electricien' ? 'default' : 'secondary'}>
                  {article.metier === 'electricien' ? t('electrician') : t('plumber')}
                </Badge>
              </div>
            </div>
          </div>

          {/* Add to devis section */}
          {!showDevisSelector ? (
            <Button
              className="w-full"
              onClick={handleAddToDevisClick}
              disabled={loadingDevis}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {loadingDevis ? 'Chargement...' : 'Ajouter au devis'}
            </Button>
          ) : devisBrouillons.length === 0 ? (
            <div className="text-center py-3 text-sm text-muted-foreground bg-muted rounded-lg">
              <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              Aucun devis en cours. Créez d&apos;abord un devis.
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
              <div className="space-y-2">
                <Label>Devis</Label>
                <Select value={selectedDevisId} onValueChange={setSelectedDevisId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un devis" />
                  </SelectTrigger>
                  <SelectContent>
                    {devisBrouillons.map(d => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.numero} {d.clients?.nom ? `— ${d.clients.nom}` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantité</Label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={quantite}
                  onChange={e => setQuantite(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <Button className="w-full" onClick={handleConfirmAdd} disabled={adding}>
                {adding ? 'Ajout...' : 'Ajouter'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
