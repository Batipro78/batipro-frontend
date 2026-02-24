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
  Shield,
  Info,
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
  numero_tva: string | null;
  mention_rcs_rm: string | null;
  assurance_decennale_nom: string | null;
  assurance_decennale_numero: string | null;
  assurance_decennale_zone: string | null;
  profil_complet: boolean;
}

function RequiredStar() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

export default function ProfilPage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nom: '',
    nom_entreprise: '',
    telephone: '',
    email_pro: '',
    siret: '',
    adresse: '',
    ville: '',
    codepostal: '',
    numero_tva: '',
    mention_rcs_rm: '',
    assurance_decennale_nom: '',
    assurance_decennale_numero: '',
    assurance_decennale_zone: '',
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
        numero_tva: p.numero_tva || '',
        mention_rcs_rm: p.mention_rcs_rm || '',
        assurance_decennale_nom: p.assurance_decennale_nom || '',
        assurance_decennale_numero: p.assurance_decennale_numero || '',
        assurance_decennale_zone: p.assurance_decennale_zone || '',
      });
    } catch {
      toast.error('Erreur chargement profil');
    } finally {
      setLoading(false);
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.nom.trim()) newErrors.nom = 'Nom obligatoire';
    if (!form.nom_entreprise.trim()) newErrors.nom_entreprise = 'Nom entreprise obligatoire';
    if (!form.siret.trim() || form.siret.length !== 14) newErrors.siret = 'SIRET invalide (14 chiffres)';
    if (!form.adresse.trim()) newErrors.adresse = 'Adresse obligatoire';
    if (!form.ville.trim()) newErrors.ville = 'Ville obligatoire';
    if (!form.codepostal.trim() || form.codepostal.length !== 5) newErrors.codepostal = 'Code postal invalide (5 chiffres)';
    if (!form.telephone.trim()) newErrors.telephone = 'Telephone obligatoire';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSaving(true);
    try {
      const res = await api.put<{ data: { profile: Profile } }>('/profile', form);
      setProfile(res.data.profile);
      setErrors({});
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
      toast.success('Logo mis a jour');
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
      toast.success('Logo supprime');
    } catch {
      toast.error('Erreur suppression logo');
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  // Compute profile completeness percentage
  const completenessItems = profile ? [
    { done: !!profile.nom, label: t('name') },
    { done: !!profile.nom_entreprise, label: t('companyName') },
    { done: !!profile.siret && profile.siret.length === 14, label: t('siret') },
    { done: !!profile.adresse, label: t('address') },
    { done: !!profile.telephone, label: t('phone') },
    { done: !!profile.logo_url, label: t('logo') },
    { done: !!profile.assurance_decennale_nom, label: t('insuranceSection') },
    { done: !!profile.numero_tva, label: t('tvaNumber') },
  ] : [];
  const completenessPercent = completenessItems.length > 0
    ? Math.round((completenessItems.filter((i) => i.done).length / completenessItems.length) * 100)
    : 0;

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

      {/* Progress banner */}
      <div className={`mb-6 rounded-lg border p-4 ${
        completenessPercent === 100
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
          : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
      }`}>
        <div className="flex items-start gap-3">
          {completenessPercent === 100 ? (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          ) : (
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm">
                {completenessPercent === 100 ? t('profileComplete') : `Profil ${completenessPercent}% complet`}
              </p>
              <Badge variant={profile?.profil_complet ? 'default' : 'secondary'}>
                {profile?.metier === 'electricien' ? t('electrician') : t('plumber')}
              </Badge>
            </div>
            {completenessPercent < 100 && (
              <p className="text-xs text-muted-foreground">{t('encourageMsg')}</p>
            )}
            {/* Progress bar */}
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completenessPercent === 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${completenessPercent}%` }}
              />
            </div>
            {/* Checklist */}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {completenessItems.map((item) => (
                <span key={item.label} className={`text-xs flex items-center gap-1 ${item.done ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                  {item.done ? <CheckCircle className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-muted-foreground/40 inline-block" />}
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Logo card */}
        <Card className="lg:col-span-1 h-fit">
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
                <img src={profile.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
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
                {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                {t('uploadLogo')}
              </Button>
              {profile?.logo_url && (
                <Button variant="ghost" size="sm" onClick={handleDeleteLogo}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">PNG, JPG, WebP ou SVG. Max 2 Mo.</p>
          </CardContent>
        </Card>

        {/* Form cards */}
        <div className="lg:col-span-2 space-y-6">

          {/* ============================================= */}
          {/* SECTION OBLIGATOIRE */}
          {/* ============================================= */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                {t('requiredFields')}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
                Necessaires pour generer des devis conformes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Entreprise */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nom_entreprise">
                    {t('companyName')}<RequiredStar />
                  </Label>
                  <Input
                    id="nom_entreprise"
                    value={form.nom_entreprise}
                    onChange={(e) => updateField('nom_entreprise', e.target.value)}
                    placeholder="Ex: Elec Pro Services"
                    className={errors.nom_entreprise ? 'border-red-500' : ''}
                  />
                  {errors.nom_entreprise && <p className="text-xs text-red-500">{errors.nom_entreprise}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">
                    {t('name')} (dirigeant)<RequiredStar />
                  </Label>
                  <Input
                    id="nom"
                    value={form.nom}
                    onChange={(e) => updateField('nom', e.target.value)}
                    placeholder="Ex: Jean Dupont"
                    className={errors.nom ? 'border-red-500' : ''}
                  />
                  {errors.nom && <p className="text-xs text-red-500">{errors.nom}</p>}
                </div>
              </div>

              {/* SIRET */}
              <div className="space-y-2">
                <Label htmlFor="siret">
                  {t('siret')}<RequiredStar />
                </Label>
                <Input
                  id="siret"
                  value={form.siret}
                  onChange={(e) => updateField('siret', e.target.value.replace(/\D/g, ''))}
                  placeholder="12345678901234"
                  maxLength={14}
                  className={errors.siret ? 'border-red-500' : ''}
                />
                {errors.siret ? (
                  <p className="text-xs text-red-500">{errors.siret}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">14 chiffres, sans espaces</p>
                )}
              </div>

              <Separator />

              {/* Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telephone">
                    <Phone className="h-3.5 w-3.5 inline mr-1" />
                    {t('phone')}<RequiredStar />
                  </Label>
                  <Input
                    id="telephone"
                    value={form.telephone}
                    onChange={(e) => updateField('telephone', e.target.value)}
                    placeholder="06 12 34 56 78"
                    className={errors.telephone ? 'border-red-500' : ''}
                  />
                  {errors.telephone && <p className="text-xs text-red-500">{errors.telephone}</p>}
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

              {/* Adresse */}
              <div className="space-y-2">
                <Label htmlFor="adresse">
                  <MapPin className="h-3.5 w-3.5 inline mr-1" />
                  {t('address')}<RequiredStar />
                </Label>
                <Input
                  id="adresse"
                  value={form.adresse}
                  onChange={(e) => updateField('adresse', e.target.value)}
                  placeholder="123 rue de la Paix"
                  className={errors.adresse ? 'border-red-500' : ''}
                />
                {errors.adresse && <p className="text-xs text-red-500">{errors.adresse}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="codepostal">{t('zipCode')}<RequiredStar /></Label>
                  <Input
                    id="codepostal"
                    value={form.codepostal}
                    onChange={(e) => updateField('codepostal', e.target.value.replace(/\D/g, ''))}
                    placeholder="75001"
                    maxLength={5}
                    className={errors.codepostal ? 'border-red-500' : ''}
                  />
                  {errors.codepostal && <p className="text-xs text-red-500">{errors.codepostal}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ville">{t('city')}<RequiredStar /></Label>
                  <Input
                    id="ville"
                    value={form.ville}
                    onChange={(e) => updateField('ville', e.target.value)}
                    placeholder="Paris"
                    className={errors.ville ? 'border-red-500' : ''}
                  />
                  {errors.ville && <p className="text-xs text-red-500">{errors.ville}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ============================================= */}
          {/* SECTION OPTIONNELLE */}
          {/* ============================================= */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('optionalFields')}
              </CardTitle>
              <CardDescription>
                Recommande pour des devis 100% professionnels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* TVA & RCS/RM */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="numero_tva">{t('tvaNumber')}</Label>
                  <Input
                    id="numero_tva"
                    value={form.numero_tva}
                    onChange={(e) => updateField('numero_tva', e.target.value)}
                    placeholder="FR 12 345678901"
                  />
                  <p className="text-xs text-muted-foreground">Obligatoire si assujetti a la TVA</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mention_rcs_rm">{t('rcsRm')}</Label>
                  <Input
                    id="mention_rcs_rm"
                    value={form.mention_rcs_rm}
                    onChange={(e) => updateField('mention_rcs_rm', e.target.value)}
                    placeholder="RM Paris 123456 / RCS Paris B 123 456 789"
                  />
                </div>
              </div>

              <Separator />

              {/* Assurance decennale */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  {t('insuranceSection')}
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Obligatoire par la loi pour les travaux de construction. Sera affiche sur vos devis.
                </p>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="assurance_decennale_nom">{t('insuranceName')}</Label>
                      <Input
                        id="assurance_decennale_nom"
                        value={form.assurance_decennale_nom}
                        onChange={(e) => updateField('assurance_decennale_nom', e.target.value)}
                        placeholder="Ex: AXA, MAAF, Allianz..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assurance_decennale_numero">{t('insuranceNumber')}</Label>
                      <Input
                        id="assurance_decennale_numero"
                        value={form.assurance_decennale_numero}
                        onChange={(e) => updateField('assurance_decennale_numero', e.target.value)}
                        placeholder="N° de police"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assurance_decennale_zone">{t('insuranceZone')}</Label>
                    <Input
                      id="assurance_decennale_zone"
                      value={form.assurance_decennale_zone}
                      onChange={(e) => updateField('assurance_decennale_zone', e.target.value)}
                      placeholder="Ex: France metropolitaine"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save button mobile */}
          <div className="sm:hidden pb-4">
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
