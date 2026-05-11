import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { Card } from '@/components/Card';
import { api } from '@/lib/api';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

type Status = 'verifying' | 'success' | 'error';

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ token?: string }>();
  const token = typeof params.token === 'string' ? params.token : '';

  const [status, setStatus] = useState<Status>('verifying');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('Lien de vérification invalide.');
      return;
    }
    (async () => {
      try {
        await api.get<{ message: string }>(
          `/auth/verify-email?token=${encodeURIComponent(token)}`
        );
        setStatus('success');
      } catch (e: unknown) {
        setStatus('error');
        setErrorMsg(
          e instanceof Error ? e.message : 'Lien de vérification invalide ou expiré.'
        );
      }
    })();
  }, [token]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <View style={styles.logo}>
            <Ionicons name="mail" size={28} color="#fff" />
          </View>
          <Text style={styles.title}>Vérification de l'email</Text>

          {status === 'verifying' ? (
            <View style={styles.message}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.text}>Vérification en cours...</Text>
            </View>
          ) : status === 'success' ? (
            <View style={styles.message}>
              <Ionicons name="checkmark-circle" size={64} color={colors.success} />
              <Text style={styles.successTitle}>Email vérifié</Text>
              <Text style={styles.text}>
                Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous
                connecter.
              </Text>
              <Button
                title="Se connecter"
                onPress={() => router.replace('/login')}
                fullWidth
              />
            </View>
          ) : (
            <View style={styles.message}>
              <Ionicons name="alert-circle" size={64} color={colors.destructive} />
              <Text style={styles.errorTitle}>Vérification impossible</Text>
              <Text style={styles.text}>{errorMsg}</Text>
              <Button
                title="Retour à la connexion"
                onPress={() => router.replace('/login')}
                variant="outline"
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
  message: { gap: spacing.md, alignItems: 'center', paddingVertical: spacing.lg },
  successTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
  },
  errorTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.destructive,
  },
  text: {
    color: colors.mutedForeground,
    textAlign: 'center',
    fontSize: fontSize.sm,
  },
  footerLink: { marginTop: spacing.md, alignItems: 'center' },
  footerText: { color: colors.mutedForeground, fontSize: fontSize.sm },
  footerHighlight: { color: colors.primary, fontWeight: '600' },
});
