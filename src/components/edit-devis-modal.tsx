'use client';

import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Pencil, Trash2, Plus, Search, Wrench, Package } from 'lucide-react';

interface LigneServer {
  id?: number;
  article_id: number | null;
  quantite: number;
  prix_unitaire_ht: number;
  tva: number;
  metadata?: { type?: string; nom?: string; description?: string; unite?: string } | null;
  articles?: { nom: string; unite?: string };
}

interface DevisServer {
  id: number;
  numero: string;
  statut: string;
  lignes_devis: LigneServer[];
}

interface Article {
  id: number;
  nom: string;
  prix_ht: number;
  unite: string;
  tva: number;
  metier: string;
}

interface LigneMateriel {
  kind: 'materiel';
  article_id: number;
  quantite: number;
  prix_unitaire_ht: number;
  tva: number;
  nom: string;
  unite: string;
}

interface LigneMO {
  kind: 'mo';
  uid: string;
  description: string;
  quantite: number;
  prix_unitaire_ht: number;
  unite: 'heures' | 'jours' | 'forfait' | 'm²' | 'ml';
  tva: number;
}

type LigneEdit = LigneMateriel | LigneMO;

interface Props {
  devisId: number | null;
  devisNumero: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}

const UNITES_MO: Array<LigneMO['unite']> = ['heures', 'jours', 'forfait', 'm²', 'ml'];

export function EditDevisModal({ devisId, devisNumero, open, onOpenChange, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lignes, setLignes] = useState<LigneEdit[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searching, setSearching] = useState(false);

  // Form ajout MO
  const [moDescription, setMoDescription] = useState('');
  const [moQuantite, setMoQuantite] = useState<number>(1);
  const [moPrix, setMoPrix] = useState<number>(0);
  const [moUnite, setMoUnite] = useState<LigneMO['unite']>('heures');

  useEffect(() => {
    if (!open || !devisId) return;
    setLoading(true);
    setSearch('');
    setSearchResults([]);
    setMoDescription('');
    setMoQuantite(1);
    setMoPrix(0);
    setMoUnite('heures');
    api
      .get<{ data: DevisServer }>(`/devis/${devisId}`)
      .then((res) => {
        const d = res.data;
        const init: LigneEdit[] = (d?.lignes_devis || []).map((l, i) => {
          if (l.article_id) {
            return {
              kind: 'materiel' as const,
              article_id: l.article_id,
              quantite: Number(l.quantite),
              prix_unitaire_ht: Number(l.prix_unitaire_ht),
              tva: Number(l.tva),
              nom: l.articles?.nom || `Article #${l.article_id}`,
              unite: l.articles?.unite || 'piece',
            };
          }
          const meta = l.metadata || {};
          const unite = (meta.unite as LigneMO['unite']) || 'forfait';
          return {
            kind: 'mo' as const,
            uid: `existing-${i}`,
            description: meta.description || meta.nom || 'Main d\'œuvre',
            quantite: Number(l.quantite),
            prix_unitaire_ht: Number(l.prix_unitaire_ht),
            unite: UNITES_MO.includes(unite) ? unite : 'forfait',
            tva: Number(l.tva) || 20,
          };
        });
        setLignes(init);
      })
      .catch(() => toast.error('Erreur chargement devis'))
      .finally(() => setLoading(false));
  }, [open, devisId]);

  useEffect(() => {
    const h = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(h);
  }, [search]);

  useEffect(() => {
    if (!open) return;
    if (!debouncedSearch || debouncedSearch.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const params = new URLSearchParams({ search: debouncedSearch, limit: '20' });
    api
      .get<{ data: { data: Article[] } }>(`/articles?${params.toString()}`)
      .then((res) => setSearchResults(res.data?.data || []))
      .catch(() => setSearchResults([]))
      .finally(() => setSearching(false));
  }, [debouncedSearch, open]);

  const totals = useMemo(() => {
    let ht = 0,
      tva = 0;
    for (const l of lignes) {
      const sub = l.prix_unitaire_ht * l.quantite;
      ht += sub;
      tva += sub * (l.tva / 100);
    }
    return { ht, tva, ttc: ht + tva };
  }, [lignes]);

  const ajouterMateriel = (a: Article) => {
    if (lignes.some((l) => l.kind === 'materiel' && l.article_id === a.id)) {
      toast.info('Article déjà dans le devis');
      return;
    }
    setLignes((prev) => [
      ...prev,
      {
        kind: 'materiel',
        article_id: a.id,
        quantite: 1,
        prix_unitaire_ht: Number(a.prix_ht),
        tva: Number(a.tva),
        nom: a.nom,
        unite: a.unite,
      },
    ]);
    setSearch('');
    setSearchResults([]);
  };

  const ajouterMO = () => {
    const desc = moDescription.trim();
    if (!desc) {
      toast.error('Décrivez la main d\'œuvre');
      return;
    }
    if (moQuantite <= 0 || moPrix <= 0) {
      toast.error('Quantité et prix doivent être > 0');
      return;
    }
    setLignes((prev) => [
      ...prev,
      {
        kind: 'mo',
        uid: `new-${Date.now()}`,
        description: desc,
        quantite: moQuantite,
        prix_unitaire_ht: moPrix,
        unite: moUnite,
        tva: 20,
      },
    ]);
    setMoDescription('');
    setMoQuantite(1);
    setMoPrix(0);
    setMoUnite('heures');
  };

  const supprimerLigne = (idx: number) => {
    setLignes((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateQuantite = (idx: number, v: number) => {
    if (isNaN(v) || v <= 0) return;
    setLignes((prev) => prev.map((p, i) => (i === idx ? { ...p, quantite: v } : p)));
  };

  const updatePrixMO = (idx: number, v: number) => {
    if (isNaN(v) || v < 0) return;
    setLignes((prev) =>
      prev.map((p, i) => (i === idx && p.kind === 'mo' ? { ...p, prix_unitaire_ht: v } : p))
    );
  };

  const handleSave = async () => {
    if (!devisId) return;
    if (lignes.length === 0) {
      toast.error('Le devis doit contenir au moins une ligne');
      return;
    }
    setSubmitting(true);
    try {
      const payload = lignes.map((l) =>
        l.kind === 'materiel'
          ? { article_id: l.article_id, quantite: l.quantite }
          : {
              description: l.description,
              quantite: l.quantite,
              prix_unitaire_ht: l.prix_unitaire_ht,
              unite: l.unite,
              tva: l.tva,
            }
      );
      await api.put(`/devis/${devisId}`, { lignes: payload });
      toast.success('Devis mis à jour');
      onOpenChange(false);
      onSaved?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur enregistrement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Modifier devis &mdash; {devisNumero}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Lignes du devis ({lignes.length})</Label>
              {lignes.length === 0 ? (
                <p className="text-sm text-muted-foreground italic px-3 py-4 border border-dashed rounded-lg text-center">
                  Aucune ligne. Ajoutez du matériel ou de la main d&apos;œuvre ci-dessous.
                </p>
              ) : (
                <div className="border rounded-lg divide-y">
                  {lignes.map((l, idx) => {
                    const sousTotal = l.prix_unitaire_ht * l.quantite;
                    const Icon = l.kind === 'materiel' ? Package : Wrench;
                    const colorIcon =
                      l.kind === 'materiel' ? 'text-blue-600' : 'text-amber-600';
                    return (
                      <div
                        key={l.kind === 'materiel' ? `m-${l.article_id}` : `mo-${l.uid}`}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-muted/30"
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${colorIcon}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {l.kind === 'materiel' ? l.nom : l.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {l.kind === 'materiel' ? (
                              <>
                                {l.prix_unitaire_ht.toFixed(2)} € / {l.unite} &middot; TVA {l.tva}%
                              </>
                            ) : (
                              <>Main d&apos;œuvre &middot; {l.unite} &middot; TVA {l.tva}%</>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {l.kind === 'mo' && (
                            <>
                              <span className="text-xs text-muted-foreground">€/u</span>
                              <Input
                                type="number"
                                min={0}
                                step={0.5}
                                value={l.prix_unitaire_ht}
                                onChange={(e) =>
                                  updatePrixMO(idx, parseFloat(e.target.value))
                                }
                                className="w-20 h-8"
                              />
                            </>
                          )}
                          <span className="text-xs text-muted-foreground">Qté</span>
                          <Input
                            type="number"
                            min={0.01}
                            step={0.01}
                            value={l.quantite}
                            onChange={(e) =>
                              updateQuantite(idx, parseFloat(e.target.value))
                            }
                            className="w-20 h-8"
                          />
                          <span className="text-sm font-semibold w-20 text-right">
                            {sousTotal.toFixed(2)} €
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => supprimerLigne(idx)}
                            title="Supprimer la ligne"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t">
              <Label className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" /> Ajouter du matériel
              </Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article (min. 2 lettres)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searching && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Recherche...
                </div>
              )}
              {!searching && debouncedSearch.length >= 2 && searchResults.length === 0 && (
                <p className="text-xs text-muted-foreground px-1">Aucun article trouvé.</p>
              )}
              {searchResults.length > 0 && (
                <div className="border rounded-lg max-h-40 overflow-y-auto divide-y">
                  {searchResults.map((a) => {
                    const deja = lignes.some(
                      (l) => l.kind === 'materiel' && l.article_id === a.id
                    );
                    return (
                      <button
                        key={a.id}
                        type="button"
                        disabled={deja}
                        onClick={() => ajouterMateriel(a)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{a.nom}</p>
                          <p className="text-xs text-muted-foreground">
                            {Number(a.prix_ht).toFixed(2)} € / {a.unite} &middot; {a.metier}
                          </p>
                        </div>
                        {deja ? (
                          <span className="text-xs text-muted-foreground">déjà ajouté</span>
                        ) : (
                          <Plus className="h-4 w-4 shrink-0 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t">
              <Label className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-amber-600" /> Ajouter de la main d&apos;œuvre
              </Label>
              <Input
                placeholder="Description (ex : Pose et raccordement, démontage...)"
                value={moDescription}
                onChange={(e) => setMoDescription(e.target.value)}
              />
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3">
                  <Input
                    type="number"
                    min={0.01}
                    step={0.5}
                    placeholder="Qté"
                    value={moQuantite || ''}
                    onChange={(e) => setMoQuantite(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-3">
                  <Select value={moUnite} onValueChange={(v) => setMoUnite(v as LigneMO['unite'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITES_MO.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    min={0}
                    step={0.5}
                    placeholder="€ HT / unité"
                    value={moPrix || ''}
                    onChange={(e) => setMoPrix(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={ajouterMO}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Ajouter
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total HT</span>
                <span>{totals.ht.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TVA</span>
                <span>{totals.tva.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-bold pt-2 mt-2 border-t border-border">
                <span>Total TTC</span>
                <span>{totals.ttc.toFixed(2)} €</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
                Annuler
              </Button>
              <Button onClick={handleSave} disabled={submitting || lignes.length === 0}>
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Enregistrer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
