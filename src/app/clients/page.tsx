'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ProtectedLayout } from '@/components/protected-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  code_postal: string;
}

const emptyClient = { nom: '', prenom: '', email: '', telephone: '', adresse: '', ville: '', code_postal: '' };

export default function ClientsPage() {
  const { t } = useI18n();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Partial<Client>>(emptyClient);
  const [isEditing, setIsEditing] = useState(false);

  const loadClients = async () => {
    try {
      const res = await api.get<{ data: Client[] }>(`/clients${search ? `?search=${search}` : ''}`);
      setClients(res.data || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClients(); }, [search]);

  const handleSave = async () => {
    try {
      if (isEditing && editingClient.id) {
        await api.put(`/clients/${editingClient.id}`, editingClient);
        toast.success('Client modifié');
      } else {
        await api.post('/clients', editingClient);
        toast.success('Client ajouté');
      }
      setDialogOpen(false);
      setEditingClient(emptyClient);
      loadClients();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t('confirmDeleteClient'))) return;
    try {
      await api.delete(`/clients/${id}`);
      toast.success('Client supprimé');
      loadClients();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditingClient(emptyClient);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const columns = [
    { key: 'nom', header: t('name'), render: (r: Client) => `${r.nom} ${r.prenom || ''}`.trim() },
    { key: 'email', header: t('email') },
    { key: 'telephone', header: t('phone') },
    { key: 'ville', header: t('city') },
    {
      key: 'actions',
      header: t('actions'),
      render: (r: Client) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openEdit(r); }}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ProtectedLayout>
      <PageHeader
        title={t('clients')}
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd}>
                <Plus className="h-4 w-4 mr-2" /> {t('addClient')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditing ? t('editClient') : t('addClient')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('name')}</Label>
                    <Input value={editingClient.nom || ''} onChange={(e) => setEditingClient({ ...editingClient, nom: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('firstName')}</Label>
                    <Input value={editingClient.prenom || ''} onChange={(e) => setEditingClient({ ...editingClient, prenom: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('email')}</Label>
                    <Input type="email" value={editingClient.email || ''} onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('phone')}</Label>
                    <Input value={editingClient.telephone || ''} onChange={(e) => setEditingClient({ ...editingClient, telephone: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('address')}</Label>
                  <Input value={editingClient.adresse || ''} onChange={(e) => setEditingClient({ ...editingClient, adresse: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('zipCode')}</Label>
                    <Input value={editingClient.code_postal || ''} onChange={(e) => setEditingClient({ ...editingClient, code_postal: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('city')}</Label>
                    <Input value={editingClient.ville || ''} onChange={(e) => setEditingClient({ ...editingClient, ville: e.target.value })} />
                  </div>
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
      <div className="mb-4">
        <Input
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable columns={columns} data={clients} loading={loading} />
    </ProtectedLayout>
  );
}
