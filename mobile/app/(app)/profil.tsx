import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useAuth } from '@/lib/auth';
import { colors, spacing, fontSize, radius } from '@/lib/theme';

export default function ProfilScreen() {
  const { user, logout } = useAuth();

  const trialDaysLeft = (() => {
    if (!user?.trial_start) return null;
    const start = new Date(user.trial_start);
    const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);
    const left = Math.ceil((end.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
    return Math.max(left, 0);
  })();

  const onLogout = () =>
    Alert.alert('Déconnexion', 'Vous êtes sûr ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Se déconnecter', style: 'destructive', onPress: () => logout() },
    ]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Profil</Text>

        <Card style={{ gap: spacing.md, alignItems: 'center' }}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#fff" />
          </View>
          <Text style={styles.email}>{user?.email}</Text>
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: user?.is_premium
                  ? '#DCFCE7'
                  : colors.muted,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: user?.is_premium ? '#15803D' : colors.foreground,
                },
              ]}
            >
              {user?.is_premium
                ? 'Abonnement Premium'
                : trialDaysLeft !== null
                  ? `Essai · ${trialDaysLeft} jour(s) restants`
                  : 'Compte gratuit'}
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>ID artisan</Text>
            <Text style={styles.rowValue}>{user?.artisan_id ?? '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>CGU acceptées</Text>
            <Text style={styles.rowValue}>{user?.cgu_accepted ? 'Oui' : 'Non'}</Text>
          </View>
        </Card>

        <Button
          title="Se déconnecter"
          variant="destructive"
          onPress={onLogout}
          fullWidth
        />

        <Text style={styles.version}>BatiPro Mobile · v0.1.0</Text>
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
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  statusPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  statusText: { fontSize: fontSize.sm, fontWeight: '600' },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rowLabel: { color: colors.mutedForeground, fontSize: fontSize.sm },
  rowValue: { color: colors.foreground, fontSize: fontSize.sm, fontWeight: '500' },
  version: {
    textAlign: 'center',
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    marginTop: spacing.lg,
  },
});
