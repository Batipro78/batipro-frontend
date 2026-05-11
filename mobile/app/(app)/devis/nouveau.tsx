import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { api } from '@/lib/api';
import { METIERS, MetierKey } from '@/lib/metiers';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

interface Client {
  id: number;
  nom: string;
  telephone: string;
  ville?: string | null;
}

interface Article {
  id: number;
  nom: string;
  prix_ht: number;
  unite?: string;
  tva: number;
  metier?: string;
  categorie?: string;
}

interface DraftLigne {
  uid: string;
  article_id: number;
  nom: string;
  prix_unitaire_ht: number;
  tva: number;
  unite?: string;
  quantite: string;
}

const newUid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function NouveauDevisScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<number | null>(null);
  const [clientPickerOpen, setClientPickerOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState('');

  const [metierFilter, setMetierFilter] = useState<MetierKey | null>(null);
  const [lignes, setLignes] = useState<DraftLigne[]>([]);

  const [articlePickerOpen, setArticlePickerOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleSearch, setArticleSearch] = useState('');
  const [articlesLoading, setArticlesLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<{ data: Client[] }>('/clients');
        setClients(res.data || []);
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const selectedClient = clients.find((c) => c.id === clientId) ?? null;

  const fetchArticles = async (search: string, metier: MetierKey | null) => {
    setArticlesLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (metier) params.set('metier', metier);
      params.set('limit', '50');
      const res = await api.get<{ data: { data: Article[] } }>(
        `/articles?${params.toString()}`
      );
      setArticles(res.data?.data || []);
    } catch {
      setArticles([]);
    } finally {
      setArticlesLoading(false);
    }
  };

  const openArticlePicker = () => {
    setArticleSearch('');
    setArticles([]);
    setArticlePickerOpen(true);
    fetchArticles('', metierFilter);
  };

  useEffect(() => {
    if (!articlePickerOpen) return;
    const timer = setTimeout(() => {
      fetchArticles(articleSearch, metierFilter);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleSearch, metierFilter, articlePickerOpen]);

  const onAddArticle = (a: Article) => {
    setLignes((prev) => [
      ...prev,
      {
        uid: newUid(),
        article_id: a.id,
        nom: a.nom,
        prix_unitaire_ht: a.prix_ht,
        tva: a.tva,
        unite: a.unite,
        quantite: '1',
      },
    ]);
    setArticlePickerOpen(false);
  };

  const updateLigneQte = (uid: string, value: string) => {
    setLignes((prev) =>
      prev.map((l) => (l.uid === uid ? { ...l, quantite: value } : l))
    );
  };

  const removeLigne = (uid: string) => {
    setLignes((prev) => prev.filter((l) => l.uid !== uid));
  };

  const totals = useMemo(() => {
    let ht = 0;
    let tva = 0;
    for (const l of lignes) {
      const q = parseFloat(l.quantite.replace(',', '.')) || 0;
      const ligneHt = q * l.prix_unitaire_ht;
      ht += ligneHt;
      tva += ligneHt * (l.tva / 100);
    }
    return { ht, tva, ttc: ht + tva };
  }, [lignes]);

  const filteredClients = clients.filter((c) => {
    const q = clientSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      c.nom?.toLowerCase().includes(q) ||
      c.telephone?.toLowerCase().includes(q) ||
      c.ville?.toLowerCase().includes(q)
    );
  });

  const onSubmit = async () => {
    setError(null);
    if (!clientId) {
      setError('Sélectionnez un client.');
      return;
    }
    if (lignes.length === 0) {
      setError('Ajoutez au moins une ligne.');
      return;
    }
    const payloadLignes = lignes
      .map((l) => ({
        article_id: l.article_id,
        quantite: parseFloat(l.quantite.replace(',', '.')) || 0,
      }))
      .filter((l) => l.quantite > 0);

    if (payloadLignes.length === 0) {
      setError('Toutes les quantités doivent être > 0.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post<{ data: { id: number; numero: string } }>(
        '/devis',
        { client_id: clientId, lignes: payloadLignes }
      );
      const id = res.data?.id;
      if (id) {
        router.replace(`/devis/${id}`);
      } else {
        router.replace('/devis');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>Nouveau devis</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client</Text>
            <Pressable
              onPress={() => setClientPickerOpen(true)}
              style={styles.selectorRow}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={colors.mutedForeground}
              />
              <Text
                style={[
                  styles.selectorText,
                  !selectedClient && { color: colors.mutedForeground },
                ]}
              >
                {selectedClient ? selectedClient.nom : 'Sélectionner un client'}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.mutedForeground}
              />
            </Pressable>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lignes ({lignes.length})</Text>
              <Pressable onPress={openArticlePicker} hitSlop={8}>
                <Text style={styles.addLink}>+ Ajouter</Text>
              </Pressable>
            </View>

            {lignes.length === 0 ? (
              <Pressable onPress={openArticlePicker} style={styles.empty}>
                <Ionicons
                  name="add-circle-outline"
                  size={32}
                  color={colors.mutedForeground}
                />
                <Text style={styles.emptyText}>Ajouter une ligne</Text>
              </Pressable>
            ) : (
              lignes.map((l) => {
                const q = parseFloat(l.quantite.replace(',', '.')) || 0;
                const total = q * l.prix_unitaire_ht;
                return (
                  <View key={l.uid} style={styles.ligneCard}>
                    <View style={styles.ligneTop}>
                      <Text style={styles.ligneNom} numberOfLines={2}>
                        {l.nom}
                      </Text>
                      <Pressable onPress={() => removeLigne(l.uid)} hitSlop={8}>
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color={colors.destructive}
                        />
                      </Pressable>
                    </View>
                    <View style={styles.ligneBottom}>
                      <View style={styles.qteWrap}>
                        <TextInput
                          style={styles.qteInput}
                          value={l.quantite}
                          onChangeText={(v) => updateLigneQte(l.uid, v)}
                          keyboardType="decimal-pad"
                          selectTextOnFocus
                        />
                        <Text style={styles.unite}>{l.unite ?? 'u'}</Text>
                        <Text style={styles.x}>×</Text>
                        <Text style={styles.prix}>
                          {l.prix_unitaire_ht.toFixed(2)} €
                        </Text>
                      </View>
                      <Text style={styles.ligneTotal}>{total.toFixed(2)} €</Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          {lignes.length > 0 ? (
            <View style={styles.totalCard}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total HT</Text>
                <Text style={styles.totalValueSm}>{totals.ht.toFixed(2)} €</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TVA</Text>
                <Text style={styles.totalValueSm}>{totals.tva.toFixed(2)} €</Text>
              </View>
              <View style={[styles.totalRow, styles.totalRowFinal]}>
                <Text style={styles.totalLabelFinal}>Total TTC</Text>
                <Text style={styles.totalValueFinal}>
                  {totals.ttc.toFixed(2)} €
                </Text>
              </View>
            </View>
          ) : null}

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={colors.destructive} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Button
            title="Créer le devis"
            onPress={onSubmit}
            loading={submitting}
            fullWidth
          />

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={clientPickerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setClientPickerOpen(false)}
      >
        <SafeAreaView style={styles.modalSafe} edges={['top', 'bottom']}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setClientPickerOpen(false)}>
              <Text style={styles.modalCancel}>Fermer</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Choisir un client</Text>
            <View style={{ width: 50 }} />
          </View>
          <View style={styles.modalSearchWrap}>
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.mutedForeground}
              style={{ position: 'absolute', left: spacing.md, top: 15, zIndex: 1 }}
            />
            <TextInput
              value={clientSearch}
              onChangeText={setClientSearch}
              placeholder="Rechercher"
              placeholderTextColor={colors.mutedForeground}
              style={styles.modalSearch}
            />
          </View>
          <FlatList
            data={filteredClients}
            keyExtractor={(c) => String(c.id)}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.pickerRow,
                  pressed && { backgroundColor: colors.muted },
                ]}
                onPress={() => {
                  setClientId(item.id);
                  setClientPickerOpen(false);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.pickerName}>{item.nom}</Text>
                  <Text style={styles.pickerSub}>
                    {item.telephone}
                    {item.ville ? ` · ${item.ville}` : ''}
                  </Text>
                </View>
                {clientId === item.id ? (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                ) : null}
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={styles.modalEmpty}>
                <Text style={styles.emptyText}>
                  Aucun client. Créez-en un dans l'onglet Clients.
                </Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={articlePickerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setArticlePickerOpen(false)}
      >
        <SafeAreaView style={styles.modalSafe} edges={['top', 'bottom']}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setArticlePickerOpen(false)}>
              <Text style={styles.modalCancel}>Fermer</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Ajouter une ligne</Text>
            <View style={{ width: 50 }} />
          </View>

          <View style={styles.modalSearchWrap}>
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.mutedForeground}
              style={{ position: 'absolute', left: spacing.md, top: 15, zIndex: 1 }}
            />
            <TextInput
              value={articleSearch}
              onChangeText={setArticleSearch}
              placeholder="Rechercher un article"
              placeholderTextColor={colors.mutedForeground}
              style={styles.modalSearch}
              autoCorrect={false}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metierBar}
            contentContainerStyle={styles.metierBarContent}
          >
            <Pressable
              onPress={() => setMetierFilter(null)}
              style={[
                styles.metierChipSm,
                !metierFilter && styles.metierChipSmActive,
              ]}
            >
              <Text
                style={[
                  styles.metierChipSmText,
                  !metierFilter && styles.metierChipSmTextActive,
                ]}
              >
                Tous
              </Text>
            </Pressable>
            {METIERS.map((m) => {
              const active = m.key === metierFilter;
              return (
                <Pressable
                  key={m.key}
                  onPress={() => setMetierFilter(m.key)}
                  style={[
                    styles.metierChipSm,
                    active && styles.metierChipSmActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.metierChipSmText,
                      active && styles.metierChipSmTextActive,
                    ]}
                  >
                    {m.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {articlesLoading ? (
            <ActivityIndicator
              color={colors.primary}
              style={{ marginTop: spacing.xl }}
            />
          ) : (
            <FlatList
              data={articles}
              keyExtractor={(a) => String(a.id)}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.pickerRow,
                    pressed && { backgroundColor: colors.muted },
                  ]}
                  onPress={() => onAddArticle(item)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pickerName} numberOfLines={2}>
                      {item.nom}
                    </Text>
                    {item.categorie ? (
                      <Text style={styles.pickerSub}>{item.categorie}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.pickerPrice}>
                    {item.prix_ht?.toFixed(2)} € / {item.unite ?? 'u'}
                  </Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <View style={styles.modalEmpty}>
                  <Text style={styles.emptyText}>
                    {articleSearch ? 'Aucun article trouvé' : 'Aucun article'}
                  </Text>
                </View>
              }
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
  },
  scroll: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  section: { gap: spacing.sm },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addLink: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorText: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
  empty: {
    backgroundColor: colors.background,
    padding: spacing.xl,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  ligneCard: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  ligneTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  ligneNom: { flex: 1, fontSize: fontSize.sm, color: colors.foreground, fontWeight: '500' },
  ligneBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qteWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  qteInput: {
    width: 56,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    color: colors.foreground,
    fontSize: fontSize.base,
    textAlign: 'center',
  },
  unite: { fontSize: fontSize.sm, color: colors.mutedForeground },
  x: { fontSize: fontSize.sm, color: colors.mutedForeground, marginHorizontal: 4 },
  prix: { fontSize: fontSize.sm, color: colors.mutedForeground },
  ligneTotal: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  totalCard: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRowFinal: {
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: { fontSize: fontSize.sm, color: colors.mutedForeground },
  totalValueSm: { fontSize: fontSize.sm, color: colors.foreground, fontWeight: '500' },
  totalLabelFinal: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
  totalValueFinal: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FEE2E2',
    padding: spacing.md,
    borderRadius: radius.md,
  },
  errorText: { color: colors.destructive, fontSize: fontSize.sm, flex: 1 },
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
  modalTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  modalSearchWrap: { padding: spacing.lg, paddingBottom: spacing.sm },
  modalSearch: {
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
  metierBar: { maxHeight: 50 },
  metierBarContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  metierChipSm: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  metierChipSmActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  metierChipSmText: { fontSize: fontSize.sm, color: colors.foreground },
  metierChipSmTextActive: { color: '#fff', fontWeight: '600' },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  pickerName: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.foreground,
  },
  pickerSub: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  pickerPrice: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  modalEmpty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
});
