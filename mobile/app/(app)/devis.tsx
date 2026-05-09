import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/Badge';
import { api } from '@/lib/api';
import { colors, spacing, fontSize, radius } from '@/lib/theme';

interface Devis {
  id: number;
  numero: string;
  total_ht: number;
  total_ttc: number;
  statut: string;
  source_creation?: string;
  created_at: string;
  pdf_url: string | null;
  clients?: { nom?: string };
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

export default function DevisScreen() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const res = await api.get<{ data: { data: Devis[] } }>('/devis');
      setDevis(res.data?.data || []);
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

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const openPdf = (url: string | null) => {
    if (!url) return;
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Devis }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={() => openPdf(item.pdf_url)}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardNumero}>{item.numero}</Text>
          {item.clients?.nom ? (
            <Text style={styles.cardClient}>{item.clients.nom}</Text>
          ) : null}
        </View>
        <Badge
          label={statusLabel[item.statut] ?? item.statut}
          variant={statusVariant[item.statut] ?? 'secondary'}
        />
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardDate}>
          {new Date(item.created_at).toLocaleDateString('fr-FR')}
        </Text>
        <Text style={styles.cardAmount}>{item.total_ttc?.toFixed(2)} € TTC</Text>
      </View>
      {item.pdf_url ? (
        <View style={styles.pdfHint}>
          <Ionicons name="document-attach-outline" size={14} color={colors.primary} />
          <Text style={styles.pdfHintText}>Voir le PDF</Text>
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Devis</Text>
        <Text style={styles.count}>{devis.length}</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: spacing.xl }}
        />
      ) : (
        <FlatList
          data={devis}
          keyExtractor={(d) => String(d.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="document-text-outline"
                size={48}
                color={colors.mutedForeground}
              />
              <Text style={styles.emptyText}>
                {error ?? 'Aucun devis pour le moment'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
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
  list: { padding: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
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
  cardNumero: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  cardClient: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: { fontSize: fontSize.sm, color: colors.mutedForeground },
  cardAmount: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  pdfHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pdfHintText: { color: colors.primary, fontSize: fontSize.xs, fontWeight: '500' },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.md,
  },
  emptyText: { color: colors.mutedForeground, fontSize: fontSize.sm },
});
