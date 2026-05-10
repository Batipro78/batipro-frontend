import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { api } from '@/lib/api';
import { colors, spacing, fontSize } from '@/lib/theme';

interface Devis {
  id: number;
  numero: string;
  total_ttc: number;
  statut: string;
  created_at: string;
}

interface Stats {
  totalDevis: number;
  totalFactures: number;
  caMonth: number;
  pendingDevis: number;
}

const STAT_CARDS: {
  key: keyof Stats;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  isCurrency?: boolean;
}[] = [
  { key: 'totalDevis', label: 'Devis', icon: 'document-text', color: '#3B82F6' },
  { key: 'totalFactures', label: 'Factures', icon: 'receipt', color: '#10B981' },
  { key: 'caMonth', label: 'CA du mois', icon: 'trending-up', color: '#059669', isCurrency: true },
  { key: 'pendingDevis', label: 'En attente', icon: 'time', color: '#F97316' },
];

export default function DashboardScreen() {
  const [stats, setStats] = useState<Stats>({
    totalDevis: 0,
    totalFactures: 0,
    caMonth: 0,
    pendingDevis: 0,
  });
  const [recent, setRecent] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const [devisRes, facturesRes] = await Promise.all([
        api
          .get<{ data: { data: Devis[] } }>('/devis')
          .catch(() => ({ data: { data: [] } })),
        api
          .get<{ data: { data: unknown[] } }>('/factures')
          .catch(() => ({ data: { data: [] } })),
      ]);

      const allDevis = devisRes.data?.data || [];
      const allFactures = facturesRes.data?.data || [];

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      setStats({
        totalDevis: allDevis.length,
        totalFactures: allFactures.length,
        caMonth: allDevis
          .filter(
            (d) => new Date(d.created_at) >= monthStart && d.statut === 'signe'
          )
          .reduce((sum, d) => sum + (d.total_ttc || 0), 0),
        pendingDevis: allDevis.filter((d) => d.statut === 'brouillon').length,
      });

      setRecent(allDevis.slice(0, 5));
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, [load]);

  const formatValue = (key: keyof Stats, isCurrency?: boolean) => {
    const v = stats[key];
    if (isCurrency) return `${(v as number).toFixed(2)} €`;
    return String(v);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Tableau de bord</Text>

        <View style={styles.grid}>
          {STAT_CARDS.map((s) => (
            <Card key={s.key} style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Ionicons name={s.icon} size={18} color={s.color} />
              </View>
              <Text style={styles.statValue}>
                {loading ? '...' : formatValue(s.key, s.isCurrency)}
              </Text>
            </Card>
          ))}
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Derniers devis</Text>
          {loading ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.md }} />
          ) : recent.length === 0 ? (
            <Text style={styles.empty}>Aucune donnée</Text>
          ) : (
            <View>
              {recent.map((d, i) => (
                <View
                  key={d.id}
                  style={[
                    styles.row,
                    i < recent.length - 1 && styles.rowBorder,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowTitle}>{d.numero}</Text>
                    <Text style={styles.rowSub}>
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.rowTitle}>
                      {d.total_ttc?.toFixed(2)} €
                    </Text>
                    <Text style={styles.rowSub}>{d.statut}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  scroll: { padding: spacing.lg, gap: spacing.lg },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.foreground,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flexBasis: '47%',
    flexGrow: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  empty: { color: colors.mutedForeground, marginTop: spacing.sm },
  row: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowTitle: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.foreground,
  },
  rowSub: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textTransform: 'capitalize',
    marginTop: 2,
  },
});
