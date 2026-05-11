import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ token?: string }>();
  const token = typeof params.token === 'string' ? params.token : '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async () => {
    setError('');
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await api.post<{ message: string }>('/auth/reset-password', { token, password });
      setDone(true);
      setTimeout(() => router.replace('/login'), 2500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur. Lien invalide ou expiré.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <View style={styles.logo}>
              <Ionicons name="key" size={28} color="#fff" />
            </View>
            <Text style={styles.title}>Réinitialiser le mot de passe</Text>

            {!token ? (
              <View style={styles.message}>
                <Ionicons name="alert-circle" size={48} color={colors.destructive} />
                <Text style={styles.errorTitle}>Lien invalide</Text>
                <Text style={styles.errorText}>
                  Ce lien de réinitialisation est invalide. Veuillez recommencer.
                </Text>
                <Button
                  title="Retour à la connexion"
                  onPress={() => router.replace('/login')}
                  fullWidth
                />
              </View>
            ) : done ? (
              <View style={styles.message}>
                <Ionicons name="checkmark-circle" size={48} color={colors.success} />
                <Text style={styles.successTitle}>Mot de passe modifié</Text>
                <Text style={styles.successText}>
                  Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                </Text>
              </View>
            ) : (
              <View style={styles.form}>
                <Text style={styles.subtitle}>
                  Choisissez un nouveau mot de passe (8 caractères minimum).
                </Text>
                <Input
                  label="Nouveau mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="new-password"
                />
                <Input
                  label="Confirmer le mot de passe"
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry
                  autoComplete="new-password"
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button
                  title="Réinitialiser"
                  onPress={onSubmit}
                  loading={loading}
                  disabled={!password || !confirm}
                  fullWidth
                />
              </View>
            )}

            <Pressable onPress={() => router.replace('/login')} style={styles.footerLink}>
              <Text style={styles.footerText}>
                <Text style={styles.footerHighlight}>← Retour à la connexion</Text>
              </Text>
            </Pressable>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: { gap: spacing.md },
  logo: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.mutedForeground,
    textAlign: 'center',
    fontSize: fontSize.sm,
  },
  form: { gap: spacing.md },
  message: { gap: spacing.sm, alignItems: 'center', paddingVertical: spacing.md },
  successTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
  },
  successText: {
    color: colors.mutedForeground,
    textAlign: 'center',
    fontSize: fontSize.sm,
  },
  errorTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.destructive,
  },
  errorText: {
    color: colors.mutedForeground,
    textAlign: 'center',
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  footerLink: { marginTop: spacing.md, alignItems: 'center' },
  footerText: { color: colors.mutedForeground, fontSize: fontSize.sm },
  footerHighlight: { color: colors.primary, fontWeight: '600' },
});
