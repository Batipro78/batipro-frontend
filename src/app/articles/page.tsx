'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArticleDetailModal } from '@/components/article-detail-modal';
import { ArticleIcon } from '@/components/article-icon';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { METIERS, metierLabel, metierBadgeClass } from '@/lib/metiers';

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

  // Ni creation, ni modification, ni suppression ici : le catalogue est COMMUN
  // a tous les artisans (table `articles`, pas de colonne artisan_id). Y toucher
  // depuis un compte changerait les prix de tout le monde. Un prix qui ne
  // correspond pas se corrige directement sur la ligne du devis.
  // Les boutons qui existaient ici appelaient POST /articles et
  // DELETE /articles/:id, deux routes qui n'ont jamais existe : ils renvoyaient
  // un 404 et le formulaire de modification affichait juste « non disponible ».

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
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${metierBadgeClass(r.metier)}`}>
          {metierLabel(r.metier)}
        </span>
      ),
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader
        title={t('articles')}
      />
      <p className="mb-4 text-sm text-muted-foreground">
        Ce catalogue est commun à tous les artisans : il se consulte, il ne se
        modifie pas. Si un prix ne correspond pas à ce que vous payez, changez-le
        directement sur la ligne de votre devis — votre devis garde votre prix, et
        le catalogue reste intact pour les autres.
      </p>
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
            {METIERS.map((m) => (
              <SelectItem key={m} value={m}>{metierLabel(m)}</SelectItem>
            ))}
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
