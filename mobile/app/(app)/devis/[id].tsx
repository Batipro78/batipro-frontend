import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, useFocusEffect, useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

interface Ligne {
  id: number;
  description: string;
  quantite: number;
  prix_unitaire_ht: number;
  tva: number;
  unite?: string;
}

interface Devis {
  id: number;
  numero: string;
  statut: string;
  total_ht: number;
  total_tva_10?: number;
  total_tva_20?: number;
  total_ttc: number;
  pdf_url: string | null;
  signature: string | null;
  signed_at: string | null;
  created_at: string;
  clients?: {
    id?: number;
    nom?: string;
    telephone?: string;
    email?: string;
  };
  lignes?: Ligne[];
  lignes_devis?: Ligne[];
}

const statusVariant: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
> = {
  brouillon: 'secondary',
  genere: 'outline',
  envoye: 'warning',
  signe: 'success',
  refuse: 'destructive',
  facture: 'default',
};

const statusLabel: Record<string, string> = {
  brouillon: 'Brouillon',
  genere: 'Généré',
  envoye: 'Envoyé',
  signe: 'Signé',
  refuse: 'Refusé',
  facture: 'Facturé',
};

export default function DevisDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [devis, setDevis] = useState<Devis | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [acting, setActing] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const res = await api.get<{ data: Devis }>(`/devis/${id}`);
      setDevis(res.data);
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

  const lignes = devis?.lignes ?? devis?.lignes_devis ?? [];

  const openPdf = async () => {
    if (!devis) return;
    try {
      let url = devis.pdf_url;
      if (!url) {
        const res = await api.get<{ data: { pdf_url: string } }>(
          `/devis/${devis.id}/pdf-url`
        );
        url = res.data?.pdf_url;
      }
      if (url) {
        await Linking.openURL(url);
      } else {
        Alert.alert('PDF indisponible', 'Le PDF n\'a pas encore été généré.');
      }
    } catch (e) {
      Alert.alert(
        'Erreur',
        e instanceof Error ? e.message : 'Impossible d\'ouvrir le PDF'
      );
    }
  };

  const onShareWhatsapp = () => {
    if (!devis) return;
    const tel = devis.clients?.telephone?.replace(/\D/g, '') ?? '';
    const cleanTel = tel.startsWith('0') ? `33${tel.slice(1)}` : tel;
    const message = `Bonjour, voici votre devis ${devis.numero} pour un montant de ${devis.total_ttc?.toFixed(2)} € TTC.${devis.pdf_url ? `\n\n${devis.pdf_url}` : ''}`;
    const url = `https://wa.me/${cleanTel}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('WhatsApp indisponible', 'Vérifiez que WhatsApp est installé.');
    });
  };

  const onShareEmail = () => {
    if (!devis) return;
    const email = devis.clients?.email ?? '';
    const subject = `Votre devis ${devis.numero}`;
    const body = `Bonjour,\n\nVeuillez trouver votre devis ${devis.numero} pour un montant de ${devis.total_ttc?.toFixed(2)} € TTC.${devis.pdf_url ? `\n\nLien : ${devis.pdf_url}` : ''}\n\nCordialement.`;
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Email', 'Aucune application email configurée.');
    });
  };

  const onShareSystem = async () => {
    if (!devis?.pdf_url) {
      Alert.alert('PDF indisponible', 'Générez d\'abord le PDF.');
      return;
    }
    try {
      await Share.share({
        message: `Devis ${devis.numero} — ${devis.total_ttc?.toFixed(2)} € TTC\n${devis.pdf_url}`,
        url: devis.pdf_url,
      });
    } catch {
      /* user cancelled */
    }
  };

  const onConvertFacture = () => {
    if (!devis) return;
    Alert.alert(
      'Convertir en facture ?',
      `Le devis ${devis.numero} sera converti en facture finale.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Convertir',
          onPress: async () => {
            setActing(true);
            try {
              await api.post(`/devis/${devis.id}/facturer`, {});
              Alert.alert('Facture créée', 'Vous pouvez la voir dans Factures.');
              await load();
            } catch (e) {
              Alert.alert(
                'Erreur',
                e instanceof Error ? e.message : 'Conversion impossible'
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

  if (!devis) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </Pressable>
          <Text style={styles.headerTitle}>Devis</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.fullCenter}>
          <Ionicons
            name="document-text-outline"
            size={48}
            color={colors.mutedForeground}
          />
          <Text style={styles.emptyText}>Devis introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>{devis.numero}</Text>
        <Pressable onPress={onShareSystem} hitSlop={12}>
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
              <Text style={styles.numero}>{devis.numero}</Text>
              <Text style={styles.date}>
                Créé le{' '}
                {new Date(devis.created_at).toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <Badge
              label={statusLabel[devis.statut] ?? devis.statut}
              variant={statusVariant[devis.statut] ?? 'secondary'}
            />
          </View>

          {devis.clients?.nom ? (
            <View style={styles.clientBlock}>
              <Ionicons name="person-outline" size={16} color={colors.mutedForeground} />
              <View style={{ flex: 1 }}>
                <Text style={styles.clientName}>{devis.clients.nom}</Text>
                {devis.clients.telephone ? (
                  <Text style={styles.clientSub}>{devis.clients.telephone}</Text>
                ) : null}
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total TTC</Text>
          <Text style={styles.totalValue}>
            {devis.total_ttc?.toFixed(2)} €
          </Text>
          <Text style={styles.totalSub}>
            HT : {devis.total_ht?.toFixed(2)} €
          </Text>
        </View>

        <View style={styles.actionsGrid}>
          <ActionButton
            icon="document-attach-outline"
            label="PDF"
            onPress={openPdf}
          />
          <ActionButton
            icon="logo-whatsapp"
            label="WhatsApp"
            onPress={onShareWhatsapp}
            disabled={!devis.clients?.telephone}
          />
          <ActionButton
            icon="mail-outline"
            label="Email"
            onPress={onShareEmail}
            disabled={!devis.clients?.email}
          />
          <ActionButton
            icon="share-outline"
            label="Partager"
            onPress={onShareSystem}
          />
        </View>

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
                    {l.description}
                  </Text>
                  <Text style={styles.ligneSub}>
                    {l.quantite} {l.unite ?? 'u'} × {l.prix_unitaire_ht?.toFixed(2)} € HT
                  </Text>
                </View>
                <Text style={styles.ligneTotal}>
                  {(l.quantite * l.prix_unitaire_ht).toFixed(2)} €
                </Text>
              </View>
            ))
          )}
        </View>

        {devis.statut !== 'facture' ? (
          <View style={{ gap: spacing.sm }}>
            <Button
              title="Convertir en facture"
              variant="outline"
              fullWidth
              onPress={onConvertFacture}
              loading={acting}
            />
          </View>
        ) : null}

        <Text style={styles.todoNote}>
          Signature client et factures de situation arrivent dans la prochaine
          mise à jour.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.actionBtn,
        pressed && !disabled && { opacity: 0.85 },
        disabled && { opacity: 0.4 },
      ]}
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
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 4,
  },
  totalLabel: {
    fontSize: fontSize.sm,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: fontSize.xxxl,
    fontWeight: '700',
    color: '#fff',
  },
  totalSub: { fontSize: fontSize.sm, color: '#94A3B8', marginTop: 4 },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
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
  ligneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  ligneDesc: { fontSize: fontSize.sm, color: colors.foreground },
  ligneSub: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
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
  todoNote: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: spacing.md,
  },
});
