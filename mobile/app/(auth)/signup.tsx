import { useState } from 'react';
import {
  Alert,
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
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useAuth } from '@/lib/auth';
import { colors, spacing, fontSize } from '@/lib/theme';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await signup(nom.trim(), email.trim(), password);
      Alert.alert(
        'Compte créé',
        'Vérifiez votre email pour activer votre compte, puis connectez-vous.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la création');
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
            <Text style={styles.title}>Essai gratuit 14 jours</Text>
            <Text style={styles.subtitle}>Aucune carte requise</Text>

            <View style={styles.form}>
              <Input
                label="Nom de l'entreprise"
                value={nom}
                onChangeText={setNom}
                placeholder="SARL Dupont"
              />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="artisan@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Button
                title="Créer mon compte"
                onPress={onSubmit}
                loading={loading}
                fullWidth
              />
            </View>

            <Pressable onPress={() => router.replace('/login')} style={styles.footerLink}>
              <Text style={styles.footerText}>
                Déjà un compte ?{' '}
                <Text style={styles.footerHighlight}>Se connecter</Text>
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
  scroll: { flexGrow: 1, justifyContent: 'center', padding: spacing.lg },
  card: { gap: spacing.md },
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
  error: { color: colors.destructive, fontSize: fontSize.sm, textAlign: 'center' },
  footerLink: { marginTop: spacing.md, alignItems: 'center' },
  footerText: { color: colors.mutedForeground, fontSize: fontSize.sm },
  footerHighlight: { color: colors.primary, fontWeight: '600' },
});
