import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '@/lib/theme';
import type { OnboardingState } from '@/lib/onboarding';

export type OnboardingStep = 'profile' | 'client' | 'devis';

const STEPS: {
  key: OnboardingStep;
  label: string;
  sub: string;
}[] = [
  {
    key: 'profile',
    label: 'Complétez votre profil',
    sub: 'SIRET, adresse… pour des devis valides',
  },
  {
    key: 'client',
    label: 'Ajoutez un client',
    sub: 'Nom, adresse, téléphone',
  },
  {
    key: 'devis',
    label: 'Créez votre 1er devis vocal',
    sub: 'Dictez, l’IA rédige le devis',
  },
];

/**
 * Bloc "Premiers pas" affiché sur l'accueil tant que les 3 prérequis
 * (profil → client → devis) ne sont pas remplis. Chaque ligne mène à l'écran
 * concerné où un coach-mark montre où appuyer.
 */
export function PremiersPas({
  state,
  onPressStep,
  onDismiss,
}: {
  state: OnboardingState;
  onPressStep: (s: OnboardingStep) => void;
  onDismiss: () => void;
}) {
  const doneMap: Record<OnboardingStep, boolean> = {
    profile: state.profileDone,
    client: state.clientDone,
    devis: state.devisDone,
  };
  const doneCount = Object.values(doneMap).filter(Boolean).length;
  // Première étape non terminée = étape "active" mise en avant.
  const activeKey = STEPS.find((s) => !doneMap[s.key])?.key;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="rocket-outline" size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Premiers pas</Text>
          <Text style={styles.subtitle}>{doneCount}/3 — prêt en 2 minutes</Text>
        </View>
        <Pressable onPress={onDismiss} hitSlop={10}>
          <Text style={styles.dismiss}>Masquer</Text>
        </Pressable>
      </View>

      <View style={{ gap: spacing.sm }}>
        {STEPS.map((s, i) => {
          const done = doneMap[s.key];
          const active = s.key === activeKey;
          return (
            <Pressable
              key={s.key}
              onPress={() => onPressStep(s.key)}
              style={({ pressed }) => [
                styles.row,
                active && styles.rowActive,
                pressed && { opacity: 0.85 },
              ]}
            >
              <View
                style={[
                  styles.num,
                  done && styles.numDone,
                  active && styles.numActive,
                ]}
              >
                {done ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text style={[styles.numText, active && { color: '#fff' }]}>
                    {i + 1}
                  </Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, done && styles.rowLabelDone]}>
                  {s.label}
                </Text>
                <Text style={styles.rowSub}>{done ? 'Terminé' : s.sub}</Text>
              </View>
              {!done ? (
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={active ? colors.primary : colors.mutedForeground}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: fontSize.base, fontWeight: '800', color: colors.foreground },
  subtitle: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 1 },
  dismiss: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    backgroundColor: '#FBFCFE',
  },
  rowActive: {
    borderColor: colors.primary,
    backgroundColor: '#F5F3FF',
  },
  num: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E8F0',
  },
  numActive: { backgroundColor: colors.primary },
  numDone: { backgroundColor: colors.success },
  numText: { fontSize: fontSize.sm, fontWeight: '800', color: colors.mutedForeground },
  rowLabel: { fontSize: fontSize.sm, fontWeight: '700', color: colors.foreground },
  rowLabelDone: {
    color: colors.mutedForeground,
    textDecorationLine: 'line-through',
  },
  rowSub: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 1 },
});
