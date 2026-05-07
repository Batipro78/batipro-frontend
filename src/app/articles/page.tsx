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
import { ArticleDetailModal } from '@/components/article-detail-modal';
import { ArticleIcon } from '@/components/article-icon';
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
  categorie?: string | null;
  sous_categorie?: string | null;
  image_url?: string;
  description?: string;
}

interface CategoryGroup {
  categorie: string;
  sous_categories: string[];
  count: number;
}

const emptyArticle = { nom: '', prix_ht: 0, unite: 'piece', tva: 20, metier: 'electricien' };

export default function ArticlesPage() {
  const { t } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [metierFilter, setMetierFilter] = useState('');
  const [categorieFilter, setCategorieFilter] = useState('');
  const [sousCategorieFilter, setSousCategorieFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>(emptyArticle);
  const [isEditing, setIsEditing] = useState(false);

  // Detail modal state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Debounce search input (300ms) to avoid hammering the API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const loadCategories = async () => {
    try {
      const metierParam = metierFilter && metierFilter !== 'all' ? `?metier=${metierFilter}` : '';
      const res = await api.get<{ data: CategoryGroup[] }>(`/articles/categories${metierParam}`);
      setCategories(res.data || []);
    } catch { /* ignore */ }
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: '200' });
      if (metierFilter && metierFilter !== 'all') params.set('metier', metierFilter);
      if (categorieFilter && categorieFilter !== 'all') params.set('categorie', categorieFilter);
      if (sousCategorieFilter && sousCategorieFilter !== 'all') params.set('sous_categorie', sousCategorieFilter);
      if (debouncedSearch) params.set('search', debouncedSearch);
      const res = await api.get<{ data: { data: Article[] } }>(`/articles?${params.toString()}`);
      setArticles(res.data?.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  // When metier changes, reload categories and reset categorie filters
  useEffect(() => {
    loadCategories();
    setCategorieFilter('');
    setSousCategorieFilter('');
  }, [metierFilter]);

  // When categorie changes, reset sub-categorie
  useEffect(() => {
    setSousCategorieFilter('');
  }, [categorieFilter]);

  useEffect(() => { loadArticles(); }, [metierFilter, categorieFilter, sousCategorieFilter, debouncedSearch]);

  const currentSousCategories =
    categorieFilter && categorieFilter !== 'all'
      ? (categories.find((c) => c.categorie === categorieFilter)?.sous_categories || [])
      : [];

  const handleSave = async () => {
    try {
      if (isEditing && editingArticle.id) {
        toast.info('Modification non disponible pour les articles catalogue');
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

  const handleRowClick = (article: Article) => {
    setSelectedArticle(article);
    setDetailOpen(true);
  };

  const columns = [
    {
      key: 'icon', header: '', render: (r: Article) => (
        <ArticleIcon articleName={r.nom} metier={r.metier} size="sm" />
      ),
    },
    { key: 'nom', header: t('name') },
    {
      key: 'categorie', header: 'Cat\u00e9gorie', render: (r: Article) =>
        r.categorie ? <span className="text-sm text-muted-foreground">{r.categorie}</span> : null,
    },
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
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
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
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <Input
          placeholder="Rechercher un article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Select value={metierFilter} onValueChange={setMetierFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder={t('trade')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous métiers</SelectItem>
            <SelectItem value="electricien">{t('electrician')}</SelectItem>
            <SelectItem value="plombier">{t('plumber')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categorieFilter} onValueChange={setCategorieFilter}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Catégorie" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.categorie} value={c.categorie}>
                {c.categorie} ({c.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentSousCategories.length > 0 && (
          <Select value={sousCategorieFilter} onValueChange={setSousCategorieFilter}>
            <SelectTrigger className="w-56"><SelectValue placeholder="Sous-catégorie" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {currentSousCategories.map((sc) => (
                <SelectItem key={sc} value={sc}>{sc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <span className="text-sm text-muted-foreground ml-auto">
          {articles.length} article{articles.length > 1 ? 's' : ''}
        </span>
      </div>
      <DataTable columns={columns} data={articles} loading={loading} onRowClick={handleRowClick} />

      <ArticleDetailModal
        article={selectedArticle}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </ProtectedLayout>
  );
}
