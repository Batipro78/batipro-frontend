'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Article {
  id: number;
  nom: string;
  prix_ht: number;
  unite: string;
  tva: number;
  metier: string;
}

const emptyArticle = { nom: '', prix_ht: 0, unite: 'piece', tva: 20, metier: 'electricien' };

export default function ArticlesPage() {
  const { t } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [metierFilter, setMetierFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>(emptyArticle);
  const [isEditing, setIsEditing] = useState(false);

  const loadArticles = async () => {
    try {
      const res = await api.get<{ data: { data: Article[] } }>(`/articles${metierFilter ? `?metier=${metierFilter}` : ''}`);
      setArticles(res.data?.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadArticles(); }, [metierFilter]);

  const handleSave = async () => {
    try {
      if (isEditing && editingArticle.id) {
        await api.put(`/articles/${editingArticle.id}`, editingArticle);
        toast.success('Article modifié');
      } else {
        await api.post('/articles', editingArticle);
        toast.success('Article ajouté');
      }
      setDialogOpen(false);
      setEditingArticle(emptyArticle);
      loadArticles();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      await api.delete(`/articles/${id}`);
      toast.success('Article supprimé');
      loadArticles();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const columns = [
    { key: 'nom', header: t('name') },
    { key: 'prix_ht', header: t('unitPrice'), render: (r: Article) => `${r.prix_ht.toFixed(2)} \u20ac` },
    { key: 'unite', header: t('unit') },
    { key: 'tva', header: t('tva'), render: (r: Article) => `${r.tva}%` },
    {
      key: 'metier', header: t('trade'), render: (r: Article) => (
        <Badge variant={r.metier === 'electricien' ? 'default' : 'secondary'}>
          {r.metier === 'electricien' ? t('electrician') : t('plumber')}
        </Badge>
      ),
    },
    {
      key: 'actions', header: t('actions'), render: (r: Article) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => { setEditingArticle(r); setIsEditing(true); setDialogOpen(true); }}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader
        title={t('articles')}
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingArticle(emptyArticle); setIsEditing(false); setDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" /> {t('addArticle')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditing ? t('editArticle') : t('addArticle')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{t('name')}</Label>
                  <Input value={editingArticle.nom || ''} onChange={(e) => setEditingArticle({ ...editingArticle, nom: e.target.value })} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t('unitPrice')}</Label>
                    <Input type="number" step="0.01" value={editingArticle.prix_ht || ''} onChange={(e) => setEditingArticle({ ...editingArticle, prix_ht: parseFloat(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('unit')}</Label>
                    <Select value={editingArticle.unite || 'piece'} onValueChange={(v) => setEditingArticle({ ...editingArticle, unite: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piece">Pièce</SelectItem>
                        <SelectItem value="metre">Mètre</SelectItem>
                        <SelectItem value="heure">Heure</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('tva')}</Label>
                    <Select value={String(editingArticle.tva ?? 20)} onValueChange={(v) => setEditingArticle({ ...editingArticle, tva: parseInt(v) })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('trade')}</Label>
                  <Select value={editingArticle.metier || 'electricien'} onValueChange={(v) => setEditingArticle({ ...editingArticle, metier: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricien">{t('electrician')}</SelectItem>
                      <SelectItem value="plombier">{t('plumber')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>{t('cancel')}</Button>
                <Button onClick={handleSave}>{t('save')}</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="mb-4 flex gap-2">
        <Select value={metierFilter} onValueChange={setMetierFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder={t('trade')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="electricien">{t('electrician')}</SelectItem>
            <SelectItem value="plombier">{t('plumber')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={articles} loading={loading} />
    </ProtectedLayout>
  );
}
