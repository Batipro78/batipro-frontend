'use client';

import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Pencil, Trash2, Plus, Search } from 'lucide-react';

interface LigneServer {
  id?: number;
  article_id: number;
  quantite: number;
  prix_unitaire_ht: number;
  tva: number;
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

interface LigneEdit {
  article_id: number;
  quantite: number;
  prix_unitaire_ht: number;
  tva: number;
  nom: string;
  unite: string;
}

interface Props {
  devisId: number | null;
  devisNumero: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}

export function EditDevisModal({ devisId, devisNumero, open, onOpenChange, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lignes, setLignes] = useState<LigneEdit[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!open || !devisId) return;
    setLoading(true);
    setSearch('');
    setSearchResults([]);
    api
      .get<{ data: DevisServer }>(`/devis/${devisId}`)
      .then((res) => {
        const d = res.data;
        const init: LigneEdit[] = (d?.lignes_devis || []).map((l) => ({
          article_id: l.article_id,
          quantite: Number(l.quantite),
          prix_unitaire_ht: Number(l.prix_unitaire_ht),
          tva: Number(l.tva),
          nom: l.articles?.nom || `Article #${l.article_id}`,
          unite: l.articles?.unite || 'piece',
        }));
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

  const ajouterLigne = (a: Article) => {
    if (lignes.some((l) => l.article_id === a.id)) {
      toast.info('Article déjà dans le devis');
      return;
    }
    setLignes((prev) => [
      ...prev,
      {
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

  const supprimerLigne = (article_id: number) => {
    setLignes((prev) => prev.filter((l) => l.article_id !== article_id));
  };

  const handleSave = async () => {
    if (!devisId) return;
    if (lignes.length === 0) {
      toast.error('Le devis doit contenir au moins une ligne');
      return;
    }
    setSubmitting(true);
    try {
      await api.put(`/devis/${devisId}`, {
        lignes: lignes.map((l) => ({ article_id: l.article_id, quantite: l.quantite })),
      });
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Lignes du devis ({lignes.length})</Label>
              {lignes.length === 0 ? (
                <p className="text-sm text-muted-foreground italic px-3 py-4 border border-dashed rounded-lg text-center">
                  Aucune ligne. Ajoutez au moins un article ci-dessous.
                </p>
              ) : (
                <div className="border rounded-lg divide-y">
                  {lignes.map((l) => {
                    const sousTotal = l.prix_unitaire_ht * l.quantite;
                    return (
                      <div
                        key={l.article_id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-muted/30"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{l.nom}</p>
                          <p className="text-xs text-muted-foreground">
                            {l.prix_unitaire_ht.toFixed(2)} € / {l.unite} &middot; TVA {l.tva}%
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground">Qté</span>
                          <Input
                            type="number"
                            min={0.01}
                            step={0.01}
                            value={l.quantite}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              setLignes((prev) =>
                                prev.map((p) =>
                                  p.article_id === l.article_id
                                    ? { ...p, quantite: isNaN(v) || v <= 0 ? p.quantite : v }
                                    : p
                                )
                              );
                            }}
                            className="w-20 h-8"
                          />
                          <span className="text-sm font-semibold w-20 text-right">
                            {sousTotal.toFixed(2)} €
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => supprimerLigne(l.article_id)}
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
              <Label>Ajouter un article</Label>
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
                <div className="border rounded-lg max-h-48 overflow-y-auto divide-y">
                  {searchResults.map((a) => {
                    const deja = lignes.some((l) => l.article_id === a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        disabled={deja}
                        onClick={() => ajouterLigne(a)}
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
