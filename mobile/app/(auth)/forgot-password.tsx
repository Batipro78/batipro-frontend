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
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post<{ message: string }>('/auth/forgot-password', { email: email.trim() });
      setSent(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur. Veuillez réessayer.');
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
              <Ionicons name="lock-closed" size={28} color="#fff" />
            </View>
            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text style={styles.subtitle}>
              Saisissez votre email, nous vous enverrons un lien pour réinitialiser votre mot de
              passe.
            </Text>

            {sent ? (
              <View style={styles.success}>
                <Ionicons name="checkmark-circle" size={48} color={colors.success} />
                <Text style={styles.successTitle}>Email envoyé</Text>
                <Text style={styles.successText}>
                  Si cet email existe, un lien de réinitialisation a été envoyé. Pensez à vérifier
                  vos spams. Le lien est valable 1 heure.
                </Text>
                <Button
                  title="Retour à la connexion"
                  onPress={() => router.replace('/login')}
                  variant="outline"
                  fullWidth
                />
              </View>
            ) : (
              <View style={styles.form}>
                <Input
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="artisan@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button
                  title="Envoyer le lien"
                  onPress={onSubmit}
                  loading={loading}
                  disabled={!email.trim()}
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
    marginBottom: spacing.sm,
  },
  form: { gap: spacing.md },
  success: { gap: spacing.sm, alignItems: 'center', paddingVertical: spacing.md },
  successTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
  },
  successText: {
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
