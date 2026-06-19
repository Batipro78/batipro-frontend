import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

type Methode = 'virement' | 'carte' | 'cheque' | 'especes';

interface Paiement {
  id: number;
  montant: number;
  methode: Methode;
  date_paiement: string;
}

interface Ligne {
  id: number;
  description?: string;
  quantite: number;
  prix_unitaire_ht: number;
  unite?: string;
  articles?: { nom?: string; unite?: string } | null;
  metadata?: { nom?: string; description?: string; unite?: string } | null;
}

// Le nom d'une ligne vit dans metadata.nom ou articles.nom — le champ
// description n'existe pas en BDD (meme fallback que le PDF backend).
const ligneNom = (l: Ligne) =>
  l.articles?.nom || l.metadata?.nom || l.metadata?.description || l.description || 'Article';

const ligneUnite = (l: Ligne) => l.unite ?? l.metadata?.unite ?? 'u';

interface Facture {
  id: number;
  numero: string;
  statut: string;
  type: 'finale' | 'situation' | 'retenue' | 'avoir';
  total_ht: number;
  total_ttc: number;
  pdf_url: string | null;
  date_emission: string;
  date_echeance: string | null;
  pourcentage_avancement: number | null;
  retenue_garantie_pct: number | null;
  numero_situation: number | null;
  created_at: string;
  clients?: {
    id?: number;
    nom?: string;
    telephone?: string;
    email?: string;
  };
  lignes?: Ligne[];
  factures_lignes?: Ligne[];
  paiements?: Paiement[];
}

const statusVariant: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
> = {
  brouillon: 'secondary',
  emise: 'outline',
  payee_partiellement: 'warning',
  payee: 'success',
  annulee: 'destructive',
};

const statusLabel: Record<string, string> = {
  brouillon: 'Brouillon',
  emise: 'Émise',
  payee_partiellement: 'Partielle',
  payee: 'Payée',
  annulee: 'Annulée',
};

const typeLabel: Record<string, string> = {
  finale: 'Finale',
  situation: 'Situation',
  retenue: 'Retenue de garantie',
  avoir: 'Avoir',
};

const methodeLabel: Record<Methode, string> = {
  virement: 'Virement',
  carte: 'Carte bancaire',
  cheque: 'Chèque',
  especes: 'Espèces',
};

const methodeIcon: Record<Methode, keyof typeof import('@expo/vector-icons').Ionicons.glyphMap> = {
  virement: 'swap-horizontal-outline',
  carte: 'card-outline',
  cheque: 'document-text-outline',
  especes: 'cash-outline',
};

export default function FactureDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [facture, setFacture] = useState<Facture | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [acting, setActing] = useState(false);

  const [paiementOpen, setPaiementOpen] = useState(false);
  const [paiementMontant, setPaiementMontant] = useState('');
  const [paiementMethode, setPaiementMethode] = useState<Methode>('virement');
  const [paiementSubmitting, setPaiementSubmitting] = useState(false);
  const [paiementError, setPaiementError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setLoadError(null);
      const res = await api.get<{ data: Facture }>(`/factures/${id}`);
      setFacture(res.data);
    } catch (e) {
      setLoadError(
        e instanceof Error ? e.message : 'Impossible de charger la facture. Vérifiez votre connexion.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  // L'API renvoie les lignes sous la cle factures_lignes (pas lignes) :
  // sans ce fallback l'ecran affichait "Aucune ligne" sur toutes les factures.
  const lignes = facture?.lignes ?? facture?.factures_lignes ?? [];
  const paiements = facture?.paiements ?? [];
  const totalPaye = paiements.reduce((s, p) => s + (p.montant || 0), 0);
  const restant = facture ? Math.max(0, facture.total_ttc - totalPaye) : 0;

  // Les pdf_url stockes en base sont des liens signes Supabase qui expirent :
  // on redemande systematiquement un lien frais au backend (qui le re-signe).
  const ensurePdfUrl = async (): Promise<string | null> => {
    if (!facture) return null;
    try {
      const res = await api.get<{ data: { pdf_url: string } }>(
        `/factures/${facture.id}/pdf-url`
      );
      const url = res.data?.pdf_url;
      if (url) {
        setFacture({ ...facture, pdf_url: url });
        return url;
      }
      return facture.pdf_url;
    } catch (e) {
      if (facture.pdf_url) return facture.pdf_url;
      Alert.alert(
        'PDF indisponible',
        e instanceof Error ? e.message : 'Impossible de générer le PDF de la facture.'
      );
      return null;
    }
  };

  const openPdf = async () => {
    const url = await ensurePdfUrl();
    if (!url) return;
    Linking.openURL(url);
  };

  const onShare = async () => {
    if (!facture) return;
    const url = await ensurePdfUrl();
    try {
      await Share.share({
        message: `Facture ${facture.numero} — ${facture.total_ttc?.toFixed(2)} € TTC${url ? `\n${url}` : ''}`,
        url: url ?? undefined,
      });
    } catch {
      /* user cancelled */
    }
  };

  const onDelete = () => {
    if (!facture) return;
    Alert.alert(
      'Supprimer cette facture ?',
      `La facture ${facture.numero} sera définitivement supprimée. Cette action est irréversible.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            setActing(true);
            try {
              await api.delete(`/factures/${facture.id}`);
              router.replace('/factures');
            } catch (e) {
              Alert.alert(
                'Erreur',
                e instanceof Error ? e.message : 'Suppression impossible'
              );
            } finally {
              setActing(false);
            }
          },
        },
      ]
    );
  };

  const openPaiement = () => {
    setPaiementMontant(restant.toFixed(2));
    setPaiementMethode('virement');
    setPaiementError(null);
    setPaiementOpen(true);
  };

  const onSubmitPaiement = async () => {
    if (!facture) return;
    const montant = parseFloat(paiementMontant.replace(',', '.'));
    if (!montant || montant <= 0) {
      setPaiementError('Le montant doit être supérieur à 0.');
      return;
    }
    if (montant > restant + 0.01) {
      setPaiementError(
        `Le montant ne peut pas dépasser le restant dû (${restant.toFixed(2)} €).`
      );
      return;
    }
    setPaiementSubmitting(true);
    setPaiementError(null);
    try {
      await api.post(`/factures/${facture.id}/paiements`, {
        montant,
        methode: paiementMethode,
      });
      setPaiementOpen(false);
      Alert.alert('Paiement enregistré', `${montant.toFixed(2)} € enregistrés.`);
      await load();
    } catch (e) {
      setPaiementError(
        e instanceof Error ? e.message : "Impossible d'enregistrer le paiement"
      );
    } finally {
      setPaiementSubmitting(false);
    }
  };

  const onLibererRetenue = () => {
    if (!facture) return;
    Alert.alert(
      'Libérer la retenue de garantie ?',
      `Une facture de retenue de garantie sera créée. Elle est généralement émise après la fin du délai légal (1 an).`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Libérer',
          onPress: async () => {
            setActing(true);
            try {
              await api.post(`/factures/${facture.id}/liberer-retenue`, {});
              Alert.alert('Retenue libérée', 'La facture a été créée.');
              await load();
            } catch (e) {
              Alert.alert(
                'Erreur',
                e instanceof Error ? e.message : 'Libération impossible'
              );
            } finally {
              setActing(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.fullCenter}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!facture) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </Pressable>
          <Text style={styles.headerTitle}>Facture</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.fullCenter}>
          <Text style={styles.emptyText}>{loadError ?? 'Facture introuvable'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const canAddPaiement =
    facture.statut !== 'payee' &&
    facture.statut !== 'annulee' &&
    restant > 0;
  const canLibererRetenue =
    facture.type === 'finale' &&
    (facture.retenue_garantie_pct ?? 0) > 0 &&
    facture.statut !== 'annulee';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>{facture.numero}</Text>
        <Pressable onPress={onShare} hitSlop={12}>
          <Ionicons name="share-outline" size={22} color={colors.foreground} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerCard}>
          <View style={styles.headerCardTop}>
            <View>
              <Text style={styles.numero}>{facture.numero}</Text>
              <Text style={styles.date}>
                {typeLabel[facture.type] ?? facture.type}
                {facture.type === 'situation' && facture.numero_situation
                  ? ` n°${facture.numero_situation} (${facture.pourcentage_avancement}%)`
                  : ''}
              </Text>
            </View>
            <Badge
              label={statusLabel[facture.statut] ?? facture.statut}
              variant={statusVariant[facture.statut] ?? 'secondary'}
            />
          </View>

          {facture.clients?.nom ? (
            <View style={styles.clientBlock}>
              <Ionicons
                name="person-outline"
                size={16}
                color={colors.mutedForeground}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.clientName}>{facture.clients.nom}</Text>
                {facture.clients.telephone ? (
                  <Text style={styles.clientSub}>{facture.clients.telephone}</Text>
                ) : null}
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC</Text>
            <Text style={styles.totalValueSm}>{facture.total_ttc?.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Payé</Text>
            <Text style={[styles.totalValueSm, { color: colors.success }]}>
              {totalPaye.toFixed(2)} €
            </Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowFinal]}>
            <Text style={styles.totalLabelFinal}>Restant dû</Text>
            <Text
              style={[
                styles.totalValueFinal,
                restant === 0 && { color: colors.success },
              ]}
            >
              {restant.toFixed(2)} €
            </Text>
          </View>
        </View>

        <View style={styles.actionsGrid}>
          <ActionButton icon="document-attach-outline" label="PDF" onPress={openPdf} />
          <ActionButton icon="share-outline" label="Partager" onPress={onShare} />
          <ActionButton
            icon="paper-plane-outline"
            label="Factur-X"
            onPress={() =>
              Linking.openURL(
                `https://mondevisminute.com/facture-electronique?numero=${encodeURIComponent(facture?.numero ?? '')}`
              )
            }
          />
        </View>

        {paiements.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paiements ({paiements.length})</Text>
            {paiements.map((p, i) => (
              <View
                key={p.id ?? i}
                style={[styles.paiementRow, i === paiements.length - 1 && { borderBottomWidth: 0 }]}
              >
                <Ionicons
                  name={methodeIcon[p.methode] ?? 'cash-outline'}
                  size={18}
                  color={colors.success}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.paiementMethode}>
                    {methodeLabel[p.methode] ?? p.methode}
                  </Text>
                  <Text style={styles.paiementDate}>
                    {new Date(p.date_paiement).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <Text style={styles.paiementMontant}>
                  + {p.montant?.toFixed(2)} €
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lignes ({lignes.length})</Text>
          {lignes.length === 0 ? (
            <Text style={styles.emptyText}>Aucune ligne</Text>
          ) : (
            lignes.map((l, i) => (
              <View
                key={l.id ?? i}
                style={[styles.ligneRow, i === lignes.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.ligneDesc} numberOfLines={2}>
                    {ligneNom(l)}
                  </Text>
                  <Text style={styles.ligneSub}>
                    {l.quantite} {ligneUnite(l)} × {l.prix_unitaire_ht?.toFixed(2)} € HT
                  </Text>
                </View>
                <Text style={styles.ligneTotal}>
                  {(l.quantite * l.prix_unitaire_ht).toFixed(2)} €
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={{ gap: spacing.sm }}>
          {canAddPaiement ? (
            <Button
              title="Enregistrer un paiement"
              onPress={openPaiement}
              fullWidth
            />
          ) : null}
          {canLibererRetenue ? (
            <Button
              title="Libérer la retenue de garantie"
              variant="outline"
              fullWidth
              onPress={onLibererRetenue}
              loading={acting}
            />
          ) : null}
          <Button
            title="Supprimer la facture"
            variant="destructive"
            fullWidth
            onPress={onDelete}
            loading={acting}
          />
        </View>
      </ScrollView>

      <Modal
        visible={paiementOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setPaiementOpen(false)}
      >
        <SafeAreaView style={styles.modalSafe} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.modalHeader}>
              <Pressable
                onPress={() => setPaiementOpen(false)}
                disabled={paiementSubmitting}
              >
                <Text style={styles.modalCancel}>Annuler</Text>
              </Pressable>
              <Text style={styles.modalTitle}>Nouveau paiement</Text>
              <Pressable onPress={onSubmitPaiement} disabled={paiementSubmitting}>
                <Text
                  style={[
                    styles.modalSave,
                    paiementSubmitting && { opacity: 0.5 },
                  ]}
                >
                  {paiementSubmitting ? '...' : 'Enregistrer'}
                </Text>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.modalForm}>
              <Input
                label="Montant *"
                value={paiementMontant}
                onChangeText={setPaiementMontant}
                placeholder="100.00"
                keyboardType="decimal-pad"
                selectTextOnFocus
              />
              <View>
                <Text style={styles.fieldLabel}>Méthode *</Text>
                <View style={styles.methodeGrid}>
                  {(['virement', 'carte', 'cheque', 'especes'] as Methode[]).map(
                    (m) => {
                      const active = m === paiementMethode;
                      return (
                        <Pressable
                          key={m}
                          onPress={() => setPaiementMethode(m)}
                          style={[
                            styles.methodeBtn,
                            active && styles.methodeBtnActive,
                          ]}
                        >
                          <Ionicons
                            name={methodeIcon[m]}
                            size={20}
                            color={active ? '#fff' : colors.foreground}
                          />
                          <Text
                            style={[
                              styles.methodeText,
                              active && styles.methodeTextActive,
                            ]}
                          >
                            {methodeLabel[m]}
                          </Text>
                        </Pressable>
                      );
                    }
                  )}
                </View>
              </View>
              {paiementError ? (
                <Text style={styles.formError}>{paiementError}</Text>
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.85 }]}
    >
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
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
  scroll: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl * 2,
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  headerCard: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  headerCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  numero: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  date: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  clientBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  clientName: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.foreground,
  },
  clientSub: { fontSize: fontSize.sm, color: colors.mutedForeground },
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
  totalValueSm: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    fontWeight: '500',
  },
  totalLabelFinal: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  totalValueFinal: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  actionsGrid: { flexDirection: 'row', gap: spacing.sm },
  actionBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 4,
  },
  actionLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  paiementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  paiementMethode: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.foreground,
  },
  paiementDate: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  paiementMontant: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.success,
  },
  ligneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  ligneDesc: { fontSize: fontSize.sm, color: colors.foreground },
  ligneSub: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  ligneTotal: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.foreground,
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    textAlign: 'center',
    paddingVertical: spacing.md,
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
  modalTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  modalSave: { fontSize: fontSize.base, fontWeight: '600', color: colors.primary },
  modalForm: { padding: spacing.lg, gap: spacing.md },
  fieldLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  methodeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  methodeBtn: {
    flexBasis: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  methodeBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  methodeText: { fontSize: fontSize.sm, color: colors.foreground, fontWeight: '500' },
  methodeTextActive: { color: '#fff', fontWeight: '600' },
  formError: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
});
