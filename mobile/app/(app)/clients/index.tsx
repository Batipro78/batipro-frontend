import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

type Categorie = 'B2C' | 'B2B' | 'B2G';

interface Client {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
  email?: string | null;
  ville?: string | null;
  codepostal?: string | null;
  categorie_client?: Categorie | null;
  siret?: string | null;
  pays?: string | null;
}

interface ClientForm {
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  ville: string;
  codepostal: string;
  categorie_client: Categorie;
  siret: string;
}

const EMPTY_FORM: ClientForm = {
  nom: '',
  adresse: '',
  telephone: '',
  email: '',
  ville: '',
  codepostal: '',
  categorie_client: 'B2C',
  siret: '',
};

const CATEGORIE_VARIANT: Record<Categorie, 'default' | 'secondary' | 'success'> = {
  B2C: 'secondary',
  B2B: 'default',
  B2G: 'success',
};

export default function ClientsScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<ClientForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const res = await api.get<{ data: { data: Client[]; pagination?: unknown } }>('/clients');
      setClients(res.data?.data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.trim().toLowerCase();
    return clients.filter(
      (c) =>
        c.nom?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.telephone?.toLowerCase().includes(q) ||
        c.ville?.toLowerCase().includes(q)
    );
  }, [clients, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({
      nom: c.nom ?? '',
      adresse: c.adresse ?? '',
      telephone: c.telephone ?? '',
      email: c.email ?? '',
      ville: c.ville ?? '',
      codepostal: c.codepostal ?? '',
      categorie_client: (c.categorie_client as Categorie) ?? 'B2C',
      siret: c.siret ?? '',
    });
    setFormError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const onSave = async () => {
    if (!form.nom.trim() || !form.adresse.trim() || !form.telephone.trim()) {
      setFormError('Nom, adresse et téléphone sont requis.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        nom: form.nom.trim(),
        adresse: form.adresse.trim(),
        telephone: form.telephone.trim(),
        email: form.email.trim(),
        ville: form.ville.trim(),
        codepostal: form.codepostal.trim(),
        categorie_client: form.categorie_client,
        siret: form.siret.trim(),
      };
      if (editing) {
        await api.put(`/clients/${editing.id}`, payload);
      } else {
        await api.post('/clients', payload);
      }
      setModalOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = (c: Client) => {
    Alert.alert(
      'Supprimer ce client ?',
      `${c.nom} sera retiré de votre liste. Les devis et factures liés seront conservés.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/clients/${c.id}`);
              await load();
            } catch (e) {
              Alert.alert(
                'Erreur',
                e instanceof Error ? e.message : 'Suppression impossible'
              );
            }
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const renderItem = ({ item }: { item: Client }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={() => openEdit(item)}
      onLongPress={() => onDelete(item)}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardName}>{item.nom}</Text>
          <Text style={styles.cardSub}>
            {[item.codepostal, item.ville].filter(Boolean).join(' ') || item.adresse}
          </Text>
        </View>
        {item.categorie_client ? (
          <Badge
            label={item.categorie_client}
            variant={CATEGORIE_VARIANT[item.categorie_client] ?? 'secondary'}
          />
        ) : null}
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardFooterItem}>
          <Ionicons
            name="call-outline"
            size={14}
            color={colors.mutedForeground}
          />
          <Text style={styles.cardFooterText}>{item.telephone}</Text>
        </View>
        {item.email ? (
          <View style={styles.cardFooterItem}>
            <Ionicons
              name="mail-outline"
              size={14}
              color={colors.mutedForeground}
            />
            <Text style={styles.cardFooterText} numberOfLines={1}>
              {item.email}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Clients</Text>
        <Text style={styles.count}>{filtered.length}</Text>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons
          name="search-outline"
          size={18}
          color={colors.mutedForeground}
          style={{ position: 'absolute', left: spacing.md, top: 15, zIndex: 1 }}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher (nom, email, téléphone, ville)"
          placeholderTextColor={colors.mutedForeground}
          style={styles.search}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: spacing.xl }}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(c) => String(c.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="people-outline"
                size={48}
                color={colors.mutedForeground}
              />
              <Text style={styles.emptyText}>
                {error ?? (search ? 'Aucun client trouvé' : 'Aucun client pour le moment')}
              </Text>
              {!error && !search ? (
                <Button title="+ Ajouter un client" onPress={openCreate} />
              ) : null}
            </View>
          }
        />
      )}

      <Pressable
        onPress={openCreate}
        style={({ pressed }) => [styles.fab, pressed && { opacity: 0.85 }]}
        accessibilityLabel="Ajouter un client"
      >
        <Text style={styles.fabPlus}>+</Text>
      </Pressable>

      <ClientFormModal
        visible={modalOpen}
        editing={editing}
        form={form}
        setForm={setForm}
        saving={saving}
        formError={formError}
        onClose={closeModal}
        onSave={onSave}
        onDelete={editing ? () => onDelete(editing) : undefined}
      />
    </SafeAreaView>
  );
}

interface FormModalProps {
  visible: boolean;
  editing: Client | null;
  form: ClientForm;
  setForm: (f: ClientForm) => void;
  saving: boolean;
  formError: string | null;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
}

function ClientFormModal({
  visible,
  editing,
  form,
  setForm,
  saving,
  formError,
  onClose,
  onSave,
  onDelete,
}: FormModalProps) {
  const set = (k: keyof ClientForm, v: string) => setForm({ ...form, [k]: v });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalSafe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalHeader}>
            <Pressable onPress={onClose} disabled={saving}>
              <Text style={styles.modalCancel}>Annuler</Text>
            </Pressable>
            <Text style={styles.modalTitle}>
              {editing ? 'Modifier le client' : 'Nouveau client'}
            </Text>
            <Pressable onPress={onSave} disabled={saving}>
              <Text style={[styles.modalSave, saving && { opacity: 0.5 }]}>
                {saving ? '...' : 'Enregistrer'}
              </Text>
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalForm}
            keyboardShouldPersistTaps="handled"
          >
            <Input
              label="Nom *"
              value={form.nom}
              onChangeText={(v) => set('nom', v)}
              placeholder="Dupont SARL"
              autoCapitalize="words"
            />
            <Input
              label="Adresse *"
              value={form.adresse}
              onChangeText={(v) => set('adresse', v)}
              placeholder="12 rue de la République"
            />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Code postal"
                  value={form.codepostal}
                  onChangeText={(v) => set('codepostal', v.replace(/\D/g, ''))}
                  placeholder="75001"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Input
                  label="Ville"
                  value={form.ville}
                  onChangeText={(v) => set('ville', v)}
                  placeholder="Paris"
                  autoCapitalize="words"
                />
              </View>
            </View>
            <Input
              label="Téléphone *"
              value={form.telephone}
              onChangeText={(v) => set('telephone', v)}
              placeholder="06 12 34 56 78"
              keyboardType="phone-pad"
            />
            <Input
              label="Email"
              value={form.email}
              onChangeText={(v) => set('email', v)}
              placeholder="contact@dupont.fr"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View>
              <Text style={styles.fieldLabel}>Catégorie</Text>
              <View style={styles.segmented}>
                {(['B2C', 'B2B', 'B2G'] as Categorie[]).map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => set('categorie_client', cat)}
                    style={[
                      styles.segmentItem,
                      form.categorie_client === cat && styles.segmentItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        form.categorie_client === cat && styles.segmentTextActive,
                      ]}
                    >
                      {cat === 'B2C'
                        ? 'Particulier'
                        : cat === 'B2B'
                          ? 'Entreprise'
                          : 'Public'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {form.categorie_client !== 'B2C' ? (
              <Input
                label="SIRET"
                value={form.siret}
                onChangeText={(v) => set('siret', v.replace(/\D/g, ''))}
                placeholder="12345678901234"
                keyboardType="number-pad"
                maxLength={14}
              />
            ) : null}

            {formError ? <Text style={styles.formError}>{formError}</Text> : null}

            {editing && onDelete ? (
              <Button
                title="Supprimer ce client"
                variant="destructive"
                onPress={onDelete}
                fullWidth
              />
            ) : null}

            <View style={{ height: spacing.xl }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.foreground },
  count: { color: colors.mutedForeground, fontSize: fontSize.sm },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  search: {
    height: 48,
    paddingLeft: spacing.xl + spacing.sm,
    paddingRight: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.foreground,
    fontSize: fontSize.base,
  },
  list: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl * 2,
  },
  card: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  cardName: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  cardSub: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  cardFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  cardFooterText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.md,
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  fabPlus: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  modalSafe: { flex: 1, backgroundColor: colors.background },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalCancel: { fontSize: fontSize.base, color: colors.mutedForeground },
  modalTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
  modalSave: { fontSize: fontSize.base, fontWeight: '600', color: colors.primary },
  modalForm: { padding: spacing.lg, gap: spacing.md },
  row: { flexDirection: 'row', gap: spacing.md },
  fieldLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.muted,
    borderRadius: radius.md,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  segmentItemActive: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  segmentTextActive: {
    color: colors.foreground,
    fontWeight: '600',
  },
  formError: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
});
