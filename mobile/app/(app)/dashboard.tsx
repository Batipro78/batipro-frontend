import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { colors, spacing, fontSize, radius } from '@/lib/theme';

interface Devis {
  id: number;
  numero: string;
  total_ttc: number;
  statut: string;
  created_at: string;
  clients?: { nom?: string };
}

interface Stats {
  totalDevis: number;
  totalFactures: number;
  caMonth: number;
  caPrevMonth: number;
  pendingDevis: number;
}

const STATUT_COLOR: Record<string, string> = {
  brouillon: '#94A3B8',
  genere: '#3B82F6',
  envoye: '#F59E0B',
  signe: '#10B981',
  refuse: '#EF4444',
  facture: '#7C3AED',
};

const STATUT_LABEL: Record<string, string> = {
  brouillon: 'Brouillon',
  genere: 'Généré',
  envoye: 'Envoyé',
  signe: 'Signé',
  refuse: 'Refusé',
  facture: 'Facturé',
};

const formatEuros = (n: number) => {
  if (n >= 1000) {
    return new Intl.NumberFormat('fr-FR').format(Math.round(n));
  }
  return n.toFixed(0);
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalDevis: 0,
    totalFactures: 0,
    caMonth: 0,
    caPrevMonth: 0,
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

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

      const inRange = (d: Devis, from: Date, to: Date) => {
        const created = new Date(d.created_at);
        return created >= from && created <= to;
      };

      setStats({
        totalDevis: allDevis.length,
        totalFactures: allFactures.length,
        caMonth: allDevis
          .filter(
            (d) => new Date(d.created_at) >= monthStart && d.statut === 'signe'
          )
          .reduce((sum, d) => sum + (d.total_ttc || 0), 0),
        caPrevMonth: allDevis
          .filter((d) => inRange(d, prevMonthStart, prevMonthEnd) && d.statut === 'signe')
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

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  })();

  const firstName = user?.email?.split('@')[0] ?? '';
  const initial = firstName ? firstName.charAt(0).toUpperCase() : '?';

  const delta = stats.caPrevMonth > 0
    ? ((stats.caMonth - stats.caPrevMonth) / stats.caPrevMonth) * 100
    : null;

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        {/* Top bar discrète */}
        <View style={styles.topbar}>
          <Text style={styles.brand}>
            MonDevis<Text style={styles.brandAccent}>Minute</Text>
          </Text>
          <Pressable
            onPress={() => router.push('/profil')}
            style={styles.avatar}
            hitSlop={8}
          >
            <Text style={styles.avatarText}>{initial}</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        >
          {/* Greeting sobre */}
          <View style={styles.greetingBlock}>
            <Text style={styles.greetingHello}>
              {greeting}
              {firstName ? `, ${firstName}` : ''} 👋
            </Text>
            <Text style={styles.greetingSub}>Voici votre activité du moment</Text>
          </View>

          {/* Carte CA vedette */}
          <View style={styles.heroCard}>
            {/* Cercle décoratif */}
            <View style={styles.heroDecoCircle1} />
            <View style={styles.heroDecoCircle2} />

            <Text style={styles.heroLabel}>CA DU MOIS</Text>
            <View style={styles.heroAmountRow}>
              <Text style={styles.heroAmount}>
                {loading ? '—' : formatEuros(stats.caMonth)}
              </Text>
              <Text style={styles.heroCurrency}>€</Text>
            </View>

            {!loading && delta !== null ? (
              <View style={styles.heroDeltaRow}>
                <Ionicons
                  name={delta >= 0 ? 'trending-up' : 'trending-down'}
                  size={14}
                  color="rgba(255,255,255,0.95)"
                />
                <Text style={styles.heroDeltaText}>
                  {delta >= 0 ? '+' : ''}
                  {delta.toFixed(0)}% vs mois dernier
                </Text>
              </View>
            ) : !loading ? (
              <Text style={styles.heroDeltaText}>Premier mois d'activité</Text>
            ) : null}
          </View>

          {/* Mini-stats en ligne */}
          <View style={styles.miniGrid}>
            <View style={styles.miniCard}>
              <View style={[styles.miniIcon, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="document-text" size={16} color="#3B82F6" />
              </View>
              <Text style={styles.miniValue}>
                {loading ? '—' : stats.totalDevis}
              </Text>
              <Text style={styles.miniLabel}>Devis</Text>
            </View>
            <View style={styles.miniCard}>
              <View style={[styles.miniIcon, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="receipt" size={16} color="#10B981" />
              </View>
              <Text style={styles.miniValue}>
                {loading ? '—' : stats.totalFactures}
              </Text>
              <Text style={styles.miniLabel}>Factures</Text>
            </View>
            <View style={styles.miniCard}>
              <View style={[styles.miniIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="time" size={16} color="#F59E0B" />
              </View>
              <Text style={styles.miniValue}>
                {loading ? '—' : stats.pendingDevis}
              </Text>
              <Text style={styles.miniLabel}>En attente</Text>
            </View>
          </View>

          {/* CTA vocal */}
          <Pressable
            onPress={() => router.push('/devis/nouveau-vocal')}
            style={({ pressed }) => [
              styles.cta,
              pressed && { opacity: 0.94, transform: [{ scale: 0.99 }] },
            ]}
          >
            <View style={styles.ctaIconWrap}>
              <Ionicons name="mic" size={26} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Nouveau devis vocal</Text>
              <Text style={styles.ctaSub}>Dictez, l'IA fait le reste</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>

          {/* Derniers devis */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Derniers devis</Text>
              <Pressable onPress={() => router.push('/devis')} hitSlop={8}>
                <Text style={styles.seeAll}>Voir tout</Text>
              </Pressable>
            </View>

            {loading ? (
              <View style={styles.emptyBox}>
                <ActivityIndicator color={colors.primary} />
              </View>
            ) : recent.length === 0 ? (
              <View style={styles.emptyBox}>
                <View style={styles.emptyIconWrap}>
                  <Ionicons
                    name="document-text-outline"
                    size={28}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.emptyTitle}>Pas encore de devis</Text>
                <Text style={styles.emptyText}>
                  Créez le premier en 30 secondes
                </Text>
                <Pressable
                  onPress={() => router.push('/devis/nouveau-vocal')}
                  style={styles.emptyBtn}
                >
                  <Ionicons name="mic" size={16} color="#fff" />
                  <Text style={styles.emptyBtnText}>Devis vocal</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.list}>
                {recent.map((d) => (
                  <Pressable
                    key={d.id}
                    onPress={() => router.push(`/devis/${d.id}`)}
                    style={({ pressed }) => [
                      styles.devisRow,
                      pressed && { backgroundColor: colors.muted },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: STATUT_COLOR[d.statut] ?? '#94A3B8' },
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.devisNumero}>{d.numero}</Text>
                      <Text style={styles.devisMeta} numberOfLines={1}>
                        {d.clients?.nom ?? 'Client inconnu'}
                        {' · '}
                        {new Date(d.created_at).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.devisAmount}>
                        {formatEuros(d.total_ttc || 0)} €
                      </Text>
                      <Text
                        style={[
                          styles.devisStatus,
                          { color: STATUT_COLOR[d.statut] ?? colors.mutedForeground },
                        ]}
                      >
                        {STATUT_LABEL[d.statut] ?? d.statut}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  safe: { flex: 1 },

  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  brand: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.foreground,
    letterSpacing: -0.3,
  },
  brandAccent: { color: colors.primary },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: fontSize.base,
  },

  scrollView: { flex: 1 },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },

  greetingBlock: { gap: 2 },
  greetingHello: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  greetingSub: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },

  /* Hero card CA */
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    padding: spacing.xl,
    paddingVertical: spacing.xl + spacing.xs,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  heroDecoCircle1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  heroDecoCircle2: {
    position: 'absolute',
    bottom: -50,
    right: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  heroLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.5,
  },
  heroAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.sm,
  },
  heroAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  heroCurrency: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 4,
  },
  heroDeltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  heroDeltaText: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  },

  /* Mini stats */
  miniGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  miniCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 6,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  miniIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniValue: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.foreground,
    marginTop: 2,
  },
  miniLabel: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    fontWeight: '500',
  },

  /* CTA vocal */
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: 18,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: '#fff',
  },
  ctaSub: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.92)',
    marginTop: 2,
  },

  /* Section devis */
  section: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.foreground,
  },
  seeAll: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  emptyIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.foreground,
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.full,
  },
  emptyBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
  list: { gap: 2 },
  devisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  devisNumero: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  devisMeta: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  devisAmount: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.foreground,
  },
  devisStatus: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
});
