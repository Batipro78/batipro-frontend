import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { DeleteAccountModal } from '@/components/DeleteAccountModal';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

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
  tva_intracommunautaire: string | null;
  mention_rcs_rm: string | null;
  assurance_decennale_nom: string | null;
  assurance_decennale_numero: string | null;
  assurance_decennale_zone: string | null;
  profil_complet: boolean;
}

interface FormState {
  nom: string;
  nom_entreprise: string;
  telephone: string;
  email_pro: string;
  siret: string;
  adresse: string;
  ville: string;
  codepostal: string;
  tva_intracommunautaire: string;
  mention_rcs_rm: string;
  assurance_decennale_nom: string;
  assurance_decennale_numero: string;
  assurance_decennale_zone: string;
}

const EMPTY_FORM: FormState = {
  nom: '',
  nom_entreprise: '',
  telephone: '',
  email_pro: '',
  siret: '',
  adresse: '',
  ville: '',
  codepostal: '',
  tva_intracommunautaire: '',
  mention_rcs_rm: '',
  assurance_decennale_nom: '',
  assurance_decennale_numero: '',
  assurance_decennale_zone: '',
};

export default function ProfilScreen() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get<{ data: { profile: Profile } }>('/profile');
      const p = res.data?.profile;
      if (p) {
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
          tva_intracommunautaire: p.tva_intracommunautaire || '',
          mention_rcs_rm: p.mention_rcs_rm || '',
          assurance_decennale_nom: p.assurance_decennale_nom || '',
          assurance_decennale_numero: p.assurance_decennale_numero || '',
          assurance_decennale_zone: p.assurance_decennale_zone || '',
        });
      }
    } catch {
      // First-time onboarding — keep empty form
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.nom.trim()) newErrors.nom = 'Nom obligatoire';
    if (!form.nom_entreprise.trim()) newErrors.nom_entreprise = 'Nom entreprise obligatoire';
    if (!form.siret.trim() || form.siret.length !== 14)
      newErrors.siret = 'SIRET invalide (14 chiffres)';
    if (!form.adresse.trim()) newErrors.adresse = 'Adresse obligatoire';
    if (!form.ville.trim()) newErrors.ville = 'Ville obligatoire';
    if (!form.codepostal.trim() || form.codepostal.length !== 5)
      newErrors.codepostal = 'Code postal invalide (5 chiffres)';
    if (!form.telephone.trim()) newErrors.telephone = 'Téléphone obligatoire';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setSaving(true);
    try {
      const res = await api.put<{ data: { profile: Profile } }>('/profile', form);
      setProfile(res.data.profile);
      setErrors({});
      Alert.alert('Profil enregistré', 'Vos informations ont été sauvegardées.');
    } catch (err: unknown) {
      Alert.alert('Erreur', err instanceof Error ? err.message : 'Sauvegarde impossible.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePickLogo() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        'Permission requise',
        'Autorisez l\'accès à vos photos pour ajouter un logo.'
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];

    setUploading(true);
    try {
      const formData = new FormData();
      const uriParts = asset.uri.split('.');
      const fileType = uriParts[uriParts.length - 1] || 'jpg';
      formData.append('logo', {
        uri: asset.uri,
        type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
        name: `logo.${fileType}`,
      } as unknown as Blob);
      const res = await api.upload<{ data: { logo_url: string } }>('/profile/logo', formData);
      setProfile((prev) => (prev ? { ...prev, logo_url: res.data.logo_url } : prev));
      Alert.alert('Logo mis à jour');
    } catch (err: unknown) {
      Alert.alert('Erreur', err instanceof Error ? err.message : 'Upload impossible.');
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteLogo() {
    Alert.alert('Supprimer le logo ?', '', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete('/profile/logo');
            setProfile((prev) => (prev ? { ...prev, logo_url: null } : prev));
          } catch {
            Alert.alert('Erreur', 'Suppression impossible.');
          }
        },
      },
    ]);
  }

  const onLogout = () =>
    Alert.alert('Déconnexion', 'Vous êtes sûr ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Se déconnecter', style: 'destructive', onPress: () => logout() },
    ]);

  async function handleExportData() {
    setExporting(true);
    try {
      const res = await api.get<{ data: Record<string, unknown> }>('/auth/rgpd/export');
      const json = JSON.stringify(res.data, null, 2);
      await Share.share({
        title: 'Mes données MonDevisMinute',
        message: json,
      });
    } catch (err: unknown) {
      Alert.alert('Erreur', err instanceof Error ? err.message : 'Export impossible.');
    } finally {
      setExporting(false);
    }
  }

  function handleAccountDeleted() {
    setDeleteOpen(false);
    Alert.alert(
      'Compte supprimé',
      'Vos données ont été anonymisées. Merci d\'avoir utilisé MonDevisMinute.',
      [{ text: 'OK', onPress: () => logout() }]
    );
  }

  const trialDaysLeft = (() => {
    if (!user?.trial_start) return null;
    const start = new Date(user.trial_start);
    const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);
    const left = Math.ceil((end.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
    return Math.max(left, 0);
  })();

  const completenessItems = profile
    ? [
        { done: !!profile.nom, label: 'Nom' },
        { done: !!profile.nom_entreprise, label: 'Entreprise' },
        { done: !!profile.siret && profile.siret.length === 14, label: 'SIRET' },
        { done: !!profile.adresse, label: 'Adresse' },
        { done: !!profile.telephone, label: 'Téléphone' },
        { done: !!profile.logo_url, label: 'Logo' },
        { done: !!profile.assurance_decennale_nom, label: 'Assurance' },
        { done: !!profile.tva_intracommunautaire, label: 'TVA' },
      ]
    : [];
  const completenessPercent =
    completenessItems.length > 0
      ? Math.round(
          (completenessItems.filter((i) => i.done).length / completenessItems.length) * 100
        )
      : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Profil</Text>

          {/* Header user */}
          <Card style={{ gap: spacing.sm, alignItems: 'center' }}>
            <View style={styles.avatar}>
              {profile?.logo_url ? (
                <Image source={{ uri: profile.logo_url }} style={styles.avatarImg} />
              ) : (
                <Ionicons name="person" size={32} color="#fff" />
              )}
            </View>
            <Text style={styles.email}>{user?.email}</Text>
            <View
              style={[
                styles.statusPill,
                { backgroundColor: user?.is_premium ? '#DCFCE7' : colors.muted },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: user?.is_premium ? '#15803D' : colors.foreground },
                ]}
              >
                {user?.is_premium
                  ? 'Abonnement Premium'
                  : trialDaysLeft !== null
                    ? `Essai · ${trialDaysLeft} jour(s) restants`
                    : 'Compte gratuit'}
              </Text>
            </View>
            <Pressable
              style={styles.subLink}
              onPress={() => router.push('/abonnement')}
            >
              <Text style={styles.subLinkText}>
                {user?.is_premium ? 'Gérer mon abonnement' : "Voir l'offre Premium"}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </Pressable>
          </Card>

          {/* Progress banner */}
          <Card
            style={{
              gap: spacing.sm,
              borderColor: completenessPercent === 100 ? colors.success : colors.info,
            }}
          >
            <View style={styles.rowBetween}>
              <Text style={styles.bannerTitle}>
                {completenessPercent === 100
                  ? 'Profil 100% complet'
                  : `Profil ${completenessPercent}% complet`}
              </Text>
              <Ionicons
                name={completenessPercent === 100 ? 'checkmark-circle' : 'information-circle'}
                size={20}
                color={completenessPercent === 100 ? colors.success : colors.info}
              />
            </View>
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${completenessPercent}%`,
                    backgroundColor:
                      completenessPercent === 100 ? colors.success : colors.info,
                  },
                ]}
              />
            </View>
            <View style={styles.checklist}>
              {completenessItems.map((item) => (
                <View key={item.label} style={styles.checkItem}>
                  <Ionicons
                    name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
                    size={14}
                    color={item.done ? colors.success : colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.checkLabel,
                      { color: item.done ? colors.success : colors.mutedForeground },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Logo */}
          <Card style={{ gap: spacing.md }}>
            <View style={styles.sectionHeader}>
              <Ionicons name="image-outline" size={20} color={colors.foreground} />
              <Text style={styles.sectionTitle}>Logo</Text>
            </View>
            <Text style={styles.hint}>Apparaîtra sur vos devis et factures.</Text>

            <View style={styles.logoBox}>
              {profile?.logo_url ? (
                <Image source={{ uri: profile.logo_url }} style={styles.logoImg} />
              ) : (
                <Ionicons name="business-outline" size={48} color={colors.mutedForeground} />
              )}
            </View>

            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <Button
                title={uploading ? 'Envoi...' : profile?.logo_url ? 'Changer' : 'Importer'}
                onPress={handlePickLogo}
                loading={uploading}
                variant="outline"
                style={{ flex: 1 }}
              />
              {profile?.logo_url && (
                <Button
                  title="Supprimer"
                  onPress={handleDeleteLogo}
                  variant="ghost"
                />
              )}
            </View>
            <Text style={styles.hint}>PNG, JPG ou WebP. Max 2 Mo.</Text>
          </Card>

          {/* Section obligatoire */}
          <Card style={{ gap: spacing.md }}>
            <View style={styles.sectionHeader}>
              <Ionicons name="business" size={20} color={colors.info} />
              <Text style={styles.sectionTitle}>Champs obligatoires</Text>
            </View>
            <Text style={styles.hint}>Nécessaires pour générer des devis conformes.</Text>

            <Input
              label="Nom de l'entreprise *"
              value={form.nom_entreprise}
              onChangeText={(v) => updateField('nom_entreprise', v)}
              placeholder="Ex : Elec Pro Services"
              error={errors.nom_entreprise}
            />
            <Input
              label="Nom du dirigeant *"
              value={form.nom}
              onChangeText={(v) => updateField('nom', v)}
              placeholder="Ex : Jean Dupont"
              error={errors.nom}
            />
            <Input
              label="SIRET * (14 chiffres)"
              value={form.siret}
              onChangeText={(v) => updateField('siret', v.replace(/\D/g, ''))}
              placeholder="12345678901234"
              keyboardType="number-pad"
              maxLength={14}
              error={errors.siret}
            />
            <Input
              label="Téléphone *"
              value={form.telephone}
              onChangeText={(v) => updateField('telephone', v)}
              placeholder="06 12 34 56 78"
              keyboardType="phone-pad"
              error={errors.telephone}
            />
            <Input
              label="Email professionnel"
              value={form.email_pro}
              onChangeText={(v) => updateField('email_pro', v)}
              placeholder="contact@monentreprise.fr"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Adresse *"
              value={form.adresse}
              onChangeText={(v) => updateField('adresse', v)}
              placeholder="123 rue de la Paix"
              error={errors.adresse}
            />
            <Input
              label="Code postal *"
              value={form.codepostal}
              onChangeText={(v) => updateField('codepostal', v.replace(/\D/g, ''))}
              placeholder="75001"
              keyboardType="number-pad"
              maxLength={5}
              error={errors.codepostal}
            />
            <Input
              label="Ville *"
              value={form.ville}
              onChangeText={(v) => updateField('ville', v)}
              placeholder="Paris"
              error={errors.ville}
            />
          </Card>

          {/* Section optionnelle */}
          <Card style={{ gap: spacing.md }}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark" size={20} color={colors.warning} />
              <Text style={styles.sectionTitle}>Recommandé</Text>
            </View>
            <Text style={styles.hint}>Pour des devis 100% professionnels.</Text>

            <Input
              label="N° TVA intracommunautaire"
              value={form.tva_intracommunautaire}
              onChangeText={(v) => updateField('tva_intracommunautaire', v)}
              placeholder="FR 12 345678901"
              autoCapitalize="characters"
            />
            <Input
              label="Mention RCS / RM"
              value={form.mention_rcs_rm}
              onChangeText={(v) => updateField('mention_rcs_rm', v)}
              placeholder="RCS Paris B 123 456 789"
            />

            <View style={styles.subSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="shield-outline" size={16} color={colors.warning} />
                <Text style={styles.subSectionTitle}>Assurance décennale</Text>
              </View>
              <Text style={styles.hint}>
                Obligatoire par la loi pour les travaux de construction.
              </Text>
            </View>

            <Input
              label="Assureur"
              value={form.assurance_decennale_nom}
              onChangeText={(v) => updateField('assurance_decennale_nom', v)}
              placeholder="Ex : AXA, MAAF, Allianz"
            />
            <Input
              label="N° de police"
              value={form.assurance_decennale_numero}
              onChangeText={(v) => updateField('assurance_decennale_numero', v)}
              placeholder="N° de police"
            />
            <Input
              label="Zone géographique"
              value={form.assurance_decennale_zone}
              onChangeText={(v) => updateField('assurance_decennale_zone', v)}
              placeholder="Ex : France métropolitaine"
            />
          </Card>

          <Button
            title="Enregistrer le profil"
            onPress={handleSave}
            loading={saving}
            fullWidth
          />

          {/* Mes données (RGPD) */}
          <Card style={{ gap: spacing.md }}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.foreground} />
              <Text style={styles.sectionTitle}>Mes données</Text>
            </View>
            <Text style={styles.hint}>
              Conformément au RGPD, vous pouvez à tout moment exporter vos données ou demander la
              suppression de votre compte.
            </Text>

            <Button
              title={exporting ? 'Export...' : 'Exporter mes données'}
              onPress={handleExportData}
              loading={exporting}
              variant="outline"
              fullWidth
            />

            <Pressable onPress={() => setDeleteOpen(true)} style={styles.dangerLink}>
              <Ionicons name="trash-outline" size={16} color={colors.destructive} />
              <Text style={styles.dangerLinkText}>Supprimer mon compte</Text>
            </Pressable>
          </Card>

          <Button
            title="Se déconnecter"
            variant="destructive"
            onPress={onLogout}
            fullWidth
          />

          <Text style={styles.version}>MonDevisMinute Mobile · v1.0.0</Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <DeleteAccountModal
        visible={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDeleted={handleAccountDeleted}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: spacing.lg, gap: spacing.lg },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.foreground,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%', resizeMode: 'contain' },
  email: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
  statusPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  statusText: { fontSize: fontSize.sm, fontWeight: '600' },
  subLink: {
    marginTop: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  subLinkText: { color: colors.primary, fontWeight: '600', fontSize: fontSize.sm },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: { fontSize: fontSize.sm, fontWeight: '600', color: colors.foreground },
  progressBg: {
    height: 6,
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: radius.full },
  checklist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  checkLabel: { fontSize: fontSize.xs },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.foreground },
  subSectionTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
  subSection: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.xs,
  },
  hint: { fontSize: fontSize.xs, color: colors.mutedForeground },
  logoBox: {
    width: 128,
    height: 128,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.muted,
  },
  logoImg: { width: '100%', height: '100%', resizeMode: 'contain' },
  version: {
    textAlign: 'center',
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    marginTop: spacing.md,
  },
  dangerLink: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
  },
  dangerLinkText: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
