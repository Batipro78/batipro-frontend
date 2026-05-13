import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { storage } from '@/lib/storage';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Button } from './Button';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

const SECTIONS: { title: string; body: string }[] = [
  {
    title: '1. Objet',
    body: "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation de la plateforme MonDevisMinute, accessible via l'application web et mobile. MonDevisMinute est un service de gestion destiné aux artisans du bâtiment, incluant la création de devis, factures, la gestion de clients et l'assistance vocale par intelligence artificielle.",
  },
  {
    title: '2. Acceptation des CGU',
    body: "L'utilisation de MonDevisMinute implique l'acceptation pleine et entière des présentes CGU. En cliquant sur « J'accepte les conditions », l'Utilisateur reconnaît avoir pris connaissance de l'ensemble des présentes conditions et les accepter sans réserve.",
  },
  {
    title: '3. Description du service',
    body: "MonDevisMinute propose les fonctionnalités suivantes : création et gestion de devis et factures, gestion de la base clients, dictée vocale assistée par IA pour la création de devis, catalogue d'articles et de prix, génération de documents PDF, et choix de gammes (éco, standard, premium) pour les métiers d'électricien et de plombier.",
  },
  {
    title: '4. Inscription et compte',
    body: "L'Utilisateur s'engage à fournir des informations exactes lors de son inscription et à maintenir la confidentialité de ses identifiants de connexion. Toute utilisation du compte est réputée faite par l'Utilisateur lui-même.",
  },
  {
    title: '5. Protection des données personnelles',
    body: "Conformément au Règlement Général sur la Protection des Données (RGPD), MonDevisMinute s'engage à protéger les données personnelles de ses utilisateurs. Les données collectées sont nécessaires au fonctionnement du service et ne sont pas cédées à des tiers. L'Utilisateur dispose d'un droit d'accès, de rectification, de portabilité et de suppression de ses données.",
  },
  {
    title: '6. Propriété intellectuelle',
    body: "L'ensemble des éléments de MonDevisMinute (logiciel, interface, contenus, marques) sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.",
  },
  {
    title: '7. Responsabilité',
    body: "MonDevisMinute s'efforce d'assurer la disponibilité et la fiabilité du service, mais ne saurait être tenu responsable des interruptions temporaires, des erreurs de transcription vocale ou des inexactitudes dans les prix du catalogue. L'Utilisateur reste seul responsable de la vérification des devis et factures générés.",
  },
  {
    title: '8. Abonnement et paiement',
    body: "L'accès à MonDevisMinute est soumis à un abonnement payant après une période d'essai gratuite de 14 jours. Les tarifs et modalités de paiement sont détaillés sur la page d'abonnement. L'Utilisateur peut résilier son abonnement à tout moment.",
  },
  {
    title: '9. Modification des CGU',
    body: "MonDevisMinute se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle et devront accepter les nouvelles conditions pour continuer à utiliser le service.",
  },
  {
    title: '10. Droit applicable',
    body: "Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents de Paris.",
  },
];

export function CGUModal() {
  const { user, refreshAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const visible = !!user && !user.cgu_accepted;

  const handleAccept = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await api.post<{ data: { token: string; refreshToken: string } }>(
        '/auth/accept-cgu',
        {}
      );
      const { token, refreshToken } = res.data;
      await storage.set('token', token);
      await storage.set('refreshToken', refreshToken);
      await refreshAuth();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Conditions Générales d'Utilisation</Text>
            <Text style={styles.subtitle}>
              Veuillez lire et accepter nos conditions avant de continuer.
            </Text>
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator
          >
            {SECTIONS.map((s) => (
              <View key={s.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{s.title}</Text>
                <Text style={styles.sectionBody}>{s.body}</Text>
              </View>
            ))}
          </ScrollView>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title={loading ? 'Traitement...' : "J'accepte les conditions"}
            onPress={handleAccept}
            loading={loading}
            fullWidth
          />
        </View>
      </View>
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
    maxWidth: 560,
    maxHeight: '90%',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: { gap: spacing.xs },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  body: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  bodyContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  section: { gap: spacing.xs },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.foreground,
  },
  sectionBody: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
});
