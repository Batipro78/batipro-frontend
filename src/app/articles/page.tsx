'use client';

import { useEffect, useState, useRef } from 'react';
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
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2, Upload, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

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

const emptyArticle = { nom: '', prix_ht: 0, unite: 'piece', tva: 20, metier: 'electricien' };

export default function ArticlesPage() {
  const { t } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [metierFilter, setMetierFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>(emptyArticle);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detail modal state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const loadArticles = async () => {
    try {
      const metierParam = metierFilter && metierFilter !== 'all' ? `&metier=${metierFilter}` : '';
      const res = await api.get<{ data: { data: Article[] } }>(`/articles?limit=200${metierParam}`);
      setArticles(res.data?.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadArticles(); }, [metierFilter]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      if (isEditing && editingArticle.id) {
        // Upload image if selected
        if (imageFile) {
          const formData = new FormData();
          formData.append('image', imageFile);
          await api.upload(`/articles/${editingArticle.id}/image`, formData);
          toast.success('Image mise à jour');
        }
      } else {
        await api.post('/articles', editingArticle);
        toast.success('Article ajouté');
      }

      setDialogOpen(false);
      setEditingArticle(emptyArticle);
      setImageFile(null);
      setImagePreview(null);
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

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setIsEditing(true);
    setImageFile(null);
    setImagePreview(article.image_url || null);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingArticle(emptyArticle);
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(null);
    setDialogOpen(true);
  };

  const handleRowClick = (article: Article) => {
    setSelectedArticle(article);
    setDetailOpen(true);
  };

  const columns = [
    {
      key: 'image', header: '', render: (r: Article) => (
        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
          {r.image_url ? (
            <img src={r.image_url} alt={r.nom} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ),
    },
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
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <Button variant="ghost" size="icon" onClick={() => openEditDialog(r)}>
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
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" /> {t('addArticle')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditing ? t('editArticle') : t('addArticle')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Image upload */}
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-32">
                        <img src={imagePreview} alt="Aperçu" className="w-full h-full object-contain rounded" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground py-2">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm">Cliquez pour ajouter une image</span>
                        <span className="text-xs text-muted-foreground/70">JPG, PNG ou WebP (max 2 Mo)</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </div>

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
      <DataTable columns={columns} data={articles} loading={loading} onRowClick={handleRowClick} />

      <ArticleDetailModal
        article={selectedArticle}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </ProtectedLayout>
  );
}
