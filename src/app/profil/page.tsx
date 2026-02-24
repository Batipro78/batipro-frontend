'use client';

import { useEffect, useState, useRef } from 'react';
import { PageHeader } from '@/components/page-header';
import { ProtectedLayout } from '@/components/protected-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import {
  Save,
  Upload,
  Trash2,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Loader2,
  ImageIcon,
} from 'lucide-react';

interface Profile {
  id: number;
  email: string;
  nom: string;
  nom_entreprise: string | null;
  telephone: string;
  email_pro: string | null;
  metier: string;
  siret: string;
  adresse: string;
  ville: string;
  codepostal: string;
  logo_url: string | null;
  profil_complet: boolean;
}

export default function ProfilPage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    nom: '',
    nom_entreprise: '',
    telephone: '',
    email_pro: '',
    siret: '',
    adresse: '',
    ville: '',
    codepostal: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get<{ data: { profile: Profile } }>('/profile');
      const p = res.data.profile;
      setProfile(p);
      setForm({
        nom: p.nom || '',
        nom_entreprise: p.nom_entreprise || '',
        telephone: p.telephone || '',
        email_pro: p.email_pro || '',
        siret: p.siret || '',
        adresse: p.adresse || '',
        ville: p.ville || '',
        codepostal: p.codepostal || '',
      });
    } catch {
      toast.error('Erreur chargement profil');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await api.put<{ data: { profile: Profile } }>('/profile', form);
      setProfile(res.data.profile);
      toast.success(t('profileSaved'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const res = await api.upload<{ data: { logo_url: string } }>('/profile/logo', formData);
      setProfile((prev) => prev ? { ...prev, logo_url: res.data.logo_url } : prev);
      toast.success(t('uploadLogo'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDeleteLogo() {
    try {
      await api.delete('/profile/logo');
      setProfile((prev) => prev ? { ...prev, logo_url: null } : prev);
      toast.success(t('deleteLogo'));
    } catch {
      toast.error('Erreur suppression logo');
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <PageHeader
        title={t('profile')}
        description={t('profileDesc')}
        action={
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {t('save')}
          </Button>
        }
      />

      {/* Completeness banner */}
      {profile && (
        <div className={`mb-6 flex items-center gap-3 rounded-lg border p-4 ${
          profile.profil_complet
            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
            : 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950'
        }`}>
          {profile.profil_complet ? (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          )}
          <div>
            <p className="font-medium text-sm">
              {profile.profil_complet ? t('profileComplete') : t('profileIncomplete')}
            </p>
            {!profile.profil_complet && (
              <p className="text-xs text-muted-foreground">{t('profileIncompleteMsg')}</p>
            )}
          </div>
          <Badge variant={profile.profil_complet ? 'default' : 'secondary'} className="ml-auto">
            {profile.metier === 'electricien' ? t('electrician') : t('plumber')}
          </Badge>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Logo card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              {t('logo')}
            </CardTitle>
            <CardDescription>Apparaitra sur vos devis et factures</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-muted flex items-center justify-center overflow-hidden bg-muted/30">
              {profile?.logo_url ? (
                <img
                  src={profile.logo_url}
                  alt="Logo"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <Building2 className="h-12 w-12 text-muted-foreground/50" />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleLogoUpload}
            />

            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Upload className="h-4 w-4 mr-1" />
                )}
                {t('uploadLogo')}
              </Button>
              {profile?.logo_url && (
                <Button variant="ghost" size="sm" onClick={handleDeleteLogo}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              PNG, JPG, WebP ou SVG. Max 2 Mo.
            </p>
          </CardContent>
        </Card>

        {/* Form cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t('companyInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nom_entreprise">{t('companyName')} *</Label>
                  <Input
                    id="nom_entreprise"
                    value={form.nom_entreprise}
                    onChange={(e) => updateField('nom_entreprise', e.target.value)}
                    placeholder="Ex: Elec Pro Services"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">{t('name')} (dirigeant) *</Label>
                  <Input
                    id="nom"
                    value={form.nom}
                    onChange={(e) => updateField('nom', e.target.value)}
                    placeholder="Ex: Jean Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siret">{t('siret')} *</Label>
                <Input
                  id="siret"
                  value={form.siret}
                  onChange={(e) => updateField('siret', e.target.value.replace(/\s/g, ''))}
                  placeholder="12345678901234"
                  maxLength={14}
                />
                <p className="text-xs text-muted-foreground">14 chiffres, sans espaces</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {t('contactInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telephone">
                    <Phone className="h-3.5 w-3.5 inline mr-1" />
                    {t('phone')} *
                  </Label>
                  <Input
                    id="telephone"
                    value={form.telephone}
                    onChange={(e) => updateField('telephone', e.target.value)}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_pro">
                    <Mail className="h-3.5 w-3.5 inline mr-1" />
                    {t('proEmail')}
                  </Label>
                  <Input
                    id="email_pro"
                    type="email"
                    value={form.email_pro}
                    onChange={(e) => updateField('email_pro', e.target.value)}
                    placeholder="contact@monentreprise.fr"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="adresse">
                  <MapPin className="h-3.5 w-3.5 inline mr-1" />
                  {t('address')} *
                </Label>
                <Input
                  id="adresse"
                  value={form.adresse}
                  onChange={(e) => updateField('adresse', e.target.value)}
                  placeholder="123 rue de la Paix"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="codepostal">{t('zipCode')} *</Label>
                  <Input
                    id="codepostal"
                    value={form.codepostal}
                    onChange={(e) => updateField('codepostal', e.target.value.replace(/\D/g, ''))}
                    placeholder="75001"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ville">{t('city')} *</Label>
                  <Input
                    id="ville"
                    value={form.ville}
                    onChange={(e) => updateField('ville', e.target.value)}
                    placeholder="Paris"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save button mobile */}
          <div className="sm:hidden">
            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {t('save')}
            </Button>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
