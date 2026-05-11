import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { Input } from './Input';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

const CONFIRM_PHRASE = 'SUPPRIMER';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteAccountModal({ visible, onClose, onDeleted }: Props) {
  const [step, setStep] = useState<'warn' | 'confirm'>('warn');
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function reset() {
    setStep('warn');
    setPassword('');
    setConfirmText('');
    setError('');
    setLoading(false);
  }

  function handleClose() {
    if (loading) return;
    reset();
    onClose();
  }

  async function handleDelete() {
    setError('');
    if (confirmText.trim().toUpperCase() !== CONFIRM_PHRASE) {
      setError(`Tapez exactement "${CONFIRM_PHRASE}" pour confirmer.`);
      return;
    }
    if (!password) {
      setError('Mot de passe requis.');
      return;
    }
    setLoading(true);
    try {
      await api.post<{ message: string }>('/auth/rgpd/delete', { password });
      reset();
      onDeleted();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Suppression impossible. Vérifiez votre mot de passe.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.warningIcon}>
              <Ionicons name="warning" size={24} color={colors.destructive} />
            </View>
            <Pressable onPress={handleClose} hitSlop={10}>
              <Ionicons name="close" size={24} color={colors.mutedForeground} />
            </Pressable>
          </View>

          <Text style={styles.title}>Supprimer mon compte</Text>

          <ScrollView style={styles.body} contentContainerStyle={{ gap: spacing.md }}>
            {step === 'warn' ? (
              <>
                <Text style={styles.text}>
                  Cette action est <Text style={styles.bold}>définitive</Text>. Conformément au
                  RGPD, vos données personnelles seront anonymisées immédiatement et ne pourront
                  pas être restaurées.
                </Text>
                <View style={styles.checklist}>
                  <View style={styles.checkRow}>
                    <Ionicons name="ellipse" size={6} color={colors.destructive} />
                    <Text style={styles.checkText}>Vos coordonnées seront anonymisées</Text>
                  </View>
                  <View style={styles.checkRow}>
                    <Ionicons name="ellipse" size={6} color={colors.destructive} />
                    <Text style={styles.checkText}>
                      Vos clients seront anonymisés (les devis/factures conservés en archive
                      légale conformément à la loi française)
                    </Text>
                  </View>
                  <View style={styles.checkRow}>
                    <Ionicons name="ellipse" size={6} color={colors.destructive} />
                    <Text style={styles.checkText}>
                      Les enregistrements audio de la dictée vocale seront supprimés
                    </Text>
                  </View>
                  <View style={styles.checkRow}>
                    <Ionicons name="ellipse" size={6} color={colors.destructive} />
                    <Text style={styles.checkText}>
                      Votre abonnement Stripe sera annulé (depuis le portail Stripe avant suppression conseillé)
                    </Text>
                  </View>
                </View>
                <Text style={styles.hint}>
                  Avant de continuer, nous vous recommandons d'exporter vos données via le bouton
                  « Exporter mes données ».
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>
                  Pour confirmer la suppression, tapez le mot{' '}
                  <Text style={styles.bold}>{CONFIRM_PHRASE}</Text> et saisissez votre mot de
                  passe.
                </Text>
                <Input
                  label={`Tapez "${CONFIRM_PHRASE}" pour confirmer`}
                  value={confirmText}
                  onChangeText={setConfirmText}
                  autoCapitalize="characters"
                  placeholder={CONFIRM_PHRASE}
                />
                <Input
                  label="Votre mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="current-password"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </>
            )}
          </ScrollView>

          <View style={styles.actions}>
            {step === 'warn' ? (
              <>
                <Button
                  title="Annuler"
                  variant="outline"
                  onPress={handleClose}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Continuer"
                  variant="destructive"
                  onPress={() => setStep('confirm')}
                  style={{ flex: 1 }}
                />
              </>
            ) : (
              <>
                <Button
                  title="Retour"
                  variant="outline"
                  onPress={() => {
                    setStep('warn');
                    setError('');
                  }}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Supprimer"
                  variant="destructive"
                  loading={loading}
                  disabled={!password || !confirmText}
                  onPress={handleDelete}
                  style={{ flex: 1 }}
                />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warningIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  body: { maxHeight: 360 },
  text: { fontSize: fontSize.sm, color: colors.foreground, lineHeight: 20 },
  bold: { fontWeight: '700', color: colors.destructive },
  checklist: { gap: spacing.sm, paddingLeft: spacing.sm },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  checkText: { flex: 1, fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 20 },
  hint: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  errorText: {
    color: colors.destructive,
    fontSize: fontSize.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
