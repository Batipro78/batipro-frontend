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
import { useAuth } from '@/lib/auth';
import { colors, spacing, fontSize, radius } from '@/lib/theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/dashboard');
    } catch {
      setError('Email ou mot de passe incorrect');
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
              <Ionicons name="flash" size={28} color="#fff" />
            </View>
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>Accédez à votre espace MonDevisMinute</Text>

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
              <Input
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Button
                title="Se connecter"
                onPress={onSubmit}
                loading={loading}
                fullWidth
              />
            </View>

            <Pressable onPress={() => router.push('/signup')} style={styles.footerLink}>
              <Text style={styles.footerText}>
                Pas encore de compte ?{' '}
                <Text style={styles.footerHighlight}>Essai gratuit 14 jours</Text>
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
    marginBottom: spacing.md,
  },
  form: { gap: spacing.md },
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  footerLink: { marginTop: spacing.md, alignItems: 'center' },
  footerText: { color: colors.mutedForeground, fontSize: fontSize.sm },
  footerHighlight: { color: colors.primary, fontWeight: '600' },
});
