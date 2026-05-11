import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

interface SubscriptionStatus {
  is_premium: boolean;
  subscription_status: string;
  current_period_end: string | null;
  trial_start: string | null;
}

const FEATURES = [
  'Devis et factures illimités',
  'IA vocale pour dicter vos devis',
  'Gestion clients complète',
  'Export PDF professionnel',
  'Mode comparatif 3 gammes',
  'Support prioritaire',
];

const VIOLET = '#7C3AED';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function AbonnementScreen() {
  const { refreshAuth } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'annual' | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);

  async function fetchStatus() {
    try {
      const res = await api.get<{ data: SubscriptionStatus }>('/stripe/status');
      setStatus(res.data);
    } catch {
      setStatus(null);
    } finally {
      setLoadingStatus(false);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  async function openStripeUrl(url: string) {
    const result = await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    });
    if (result.type === 'cancel' || result.type === 'dismiss') {
      // Refresh auth + status after user closes browser
      try {
        await refreshAuth();
      } catch {
        // ignore
      }
      await fetchStatus();
    }
  }

  async function handleCheckout(plan: 'monthly' | 'annual') {
    setLoadingPlan(plan);
    try {
      const res = await api.post<{ data: { url: string } }>('/stripe/checkout', { plan });
      await openStripeUrl(res.data.url);
    } catch (err: unknown) {
      Alert.alert(
        'Erreur',
        err instanceof Error ? err.message : 'Création du paiement impossible.'
      );
    } finally {
      setLoadingPlan(null);
    }
  }

  async function handlePortal() {
    setLoadingPortal(true);
    try {
      const res = await api.post<{ data: { url: string } }>('/stripe/portal', {});
      await openStripeUrl(res.data.url);
    } catch (err: unknown) {
      Alert.alert(
        'Erreur',
        err instanceof Error ? err.message : 'Accès au portail impossible.'
      );
    } finally {
      setLoadingPortal(false);
    }
  }

  const isSubscribed =
    status?.subscription_status === 'active' || status?.subscription_status === 'past_due';

  if (loadingStatus) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={VIOLET} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Abonnement',
          headerStyle: { backgroundColor: colors.muted },
          headerTintColor: colors.foreground,
        }}
      />
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="card" size={32} color={VIOLET} />
            </View>
            <Text style={styles.title}>
              {isSubscribed ? 'Votre abonnement' : 'Activez MonDevisMinute'}
            </Text>
            <Text style={styles.subtitle}>
              {isSubscribed
                ? 'Gérez votre abonnement MonDevisMinute Pro ci-dessous.'
                : "Choisissez votre formule pour profiter de toutes les fonctionnalités."}
            </Text>
          </View>

          {isSubscribed ? (
            <Card style={{ ...styles.planCard, borderColor: VIOLET, borderWidth: 2 }}>
              <View style={styles.planHeaderCenter}>
                <View style={styles.shieldCircle}>
                  <Ionicons name="shield-checkmark" size={28} color={colors.success} />
                </View>
                <Text style={styles.planTitle}>MonDevisMinute Pro</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        status?.subscription_status === 'active' ? '#DCFCE7' : '#FED7AA',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      {
                        color:
                          status?.subscription_status === 'active' ? '#15803D' : '#9A3412',
                      },
                    ]}
                  >
                    {status?.subscription_status === 'active' ? 'Actif' : 'Paiement en attente'}
                  </Text>
                </View>
              </View>

              <View style={styles.renewBox}>
                <Ionicons name="calendar-outline" size={20} color={colors.mutedForeground} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.renewLabel}>Prochain renouvellement</Text>
                  <Text style={styles.renewDate}>
                    {formatDate(status?.current_period_end ?? null)}
                  </Text>
                </View>
              </View>

              <View style={styles.features}>
                {FEATURES.map((f) => (
                  <View key={f} style={styles.feature}>
                    <Ionicons name="checkmark" size={18} color={VIOLET} />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>

              <Pressable
                onPress={handlePortal}
                disabled={loadingPortal}
                style={({ pressed }) => [
                  styles.cta,
                  { backgroundColor: VIOLET },
                  pressed && { opacity: 0.85 },
                  loadingPortal && { opacity: 0.6 },
                ]}
              >
                {loadingPortal ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="open-outline" size={18} color="#fff" />
                    <Text style={styles.ctaText}>Gérer mon abonnement</Text>
                  </>
                )}
              </Pressable>
              <Text style={styles.helper}>
                Modifier le moyen de paiement, changer de formule ou annuler.
              </Text>
            </Card>
          ) : (
            <View style={{ gap: spacing.lg }}>
              {/* Mensuel */}
              <Card style={styles.planCard}>
                <View style={styles.planHeaderCenter}>
                  <Text style={styles.planTitle}>Mensuel</Text>
                  <Text style={styles.planHint}>Sans engagement</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>29€</Text>
                    <Text style={styles.priceUnit}>/mois</Text>
                  </View>
                </View>

                <View style={styles.features}>
                  {FEATURES.map((f) => (
                    <View key={f} style={styles.feature}>
                      <Ionicons name="checkmark" size={18} color={VIOLET} />
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() => handleCheckout('monthly')}
                  disabled={loadingPlan !== null}
                  style={({ pressed }) => [
                    styles.cta,
                    { backgroundColor: VIOLET },
                    pressed && { opacity: 0.85 },
                    loadingPlan !== null && { opacity: 0.6 },
                  ]}
                >
                  {loadingPlan === 'monthly' ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.ctaText}>S'abonner</Text>
                  )}
                </Pressable>
              </Card>

              {/* Annuel */}
              <Card style={{ ...styles.planCard, borderColor: VIOLET, borderWidth: 2 }}>
                <View style={styles.badgeFloat}>
                  <Text style={styles.badgeFloatText}>2 mois offerts</Text>
                </View>
                <View style={styles.planHeaderCenter}>
                  <Text style={styles.planTitle}>Annuel</Text>
                  <Text style={styles.planHint}>Meilleur rapport qualité-prix</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>290€</Text>
                    <Text style={styles.priceUnit}>/an</Text>
                  </View>
                  <Text style={styles.priceComp}>soit ~24€/mois au lieu de 29€</Text>
                </View>

                <View style={styles.features}>
                  {FEATURES.map((f) => (
                    <View key={f} style={styles.feature}>
                      <Ionicons name="checkmark" size={18} color={VIOLET} />
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() => handleCheckout('annual')}
                  disabled={loadingPlan !== null}
                  style={({ pressed }) => [
                    styles.cta,
                    { backgroundColor: VIOLET },
                    pressed && { opacity: 0.85 },
                    loadingPlan !== null && { opacity: 0.6 },
                  ]}
                >
                  {loadingPlan === 'annual' ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.ctaText}>S'abonner</Text>
                  )}
                </Pressable>
              </Card>
            </View>
          )}

          <Button
            title="Retour au profil"
            variant="outline"
            onPress={() => router.back()}
            fullWidth
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.muted,
  },
  scroll: { padding: spacing.lg, gap: spacing.lg },
  header: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  planCard: { gap: spacing.md, position: 'relative' },
  planHeaderCenter: { alignItems: 'center', gap: spacing.xs },
  shieldCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  planTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.foreground },
  planHint: { fontSize: fontSize.sm, color: colors.mutedForeground },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.sm },
  price: { fontSize: 36, fontWeight: '700', color: colors.foreground },
  priceUnit: { fontSize: fontSize.base, color: colors.mutedForeground, marginLeft: 4 },
  priceComp: {
    fontSize: fontSize.xs,
    color: VIOLET,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  statusBadgeText: { fontSize: fontSize.xs, fontWeight: '600' },
  renewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.muted,
    borderRadius: radius.md,
  },
  renewLabel: { fontSize: fontSize.sm, fontWeight: '500', color: colors.foreground },
  renewDate: { fontSize: fontSize.sm, color: colors.mutedForeground },
  features: { gap: spacing.sm },
  feature: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureText: { fontSize: fontSize.sm, color: colors.foreground, flex: 1 },
  cta: {
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  ctaText: { color: '#fff', fontWeight: '600', fontSize: fontSize.base },
  helper: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  badgeFloat: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: VIOLET,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    zIndex: 10,
  },
  badgeFloatText: { color: '#fff', fontWeight: '600', fontSize: fontSize.xs },
});
