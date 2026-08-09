import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Updates from 'expo-updates';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

/**
 * Recherche et applique une mise a jour a distance, a la demande.
 *
 * Par defaut expo-updates telecharge au lancement et n'applique qu'a l'ouverture
 * SUIVANTE : sur Android, revenir a l'accueil ne fermant pas l'application, une
 * correction pouvait rester invisible plusieurs jours. Ce bouton rend l'operation
 * explicite et immediate, et affiche ce qui tourne reellement.
 */
export function BoutonMiseAJour() {
  const [enCours, setEnCours] = useState(false);

  // `Updates.updateId` est nul tant qu'on tourne sur le code livre avec l'APK.
  const idCourt = Updates.updateId ? Updates.updateId.slice(0, 8) : null;
  const versionExecution = Updates.runtimeVersion ?? '—';

  const chercher = async () => {
    if (!Updates.isEnabled) {
      Alert.alert(
        'Indisponible',
        "Les mises a jour a distance ne fonctionnent pas dans cette version de l'application."
      );
      return;
    }
    setEnCours(true);
    try {
      const res = await Updates.checkForUpdateAsync();
      if (!res.isAvailable) {
        Alert.alert('A jour', "Vous avez deja la derniere version de l'application.");
        return;
      }
      await Updates.fetchUpdateAsync();
      Alert.alert(
        'Mise a jour prete',
        "L'application va redemarrer pour l'appliquer.",
        [{ text: 'Redemarrer', onPress: () => Updates.reloadAsync() }],
        { cancelable: false }
      );
    } catch (e) {
      // Reseau coupe sur un chantier : on le dit, on ne laisse pas croire a un bug.
      Alert.alert(
        'Echec',
        `Impossible de recuperer la mise a jour.\n\n${e instanceof Error ? e.message : String(e)}`
      );
    } finally {
      setEnCours(false);
    }
  };

  return (
    <View style={styles.bloc}>
      <Pressable
        onPress={chercher}
        disabled={enCours}
        style={({ pressed }) => [styles.bouton, pressed && { opacity: 0.85 }]}
      >
        {enCours ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Ionicons name="cloud-download-outline" size={18} color={colors.primary} />
        )}
        <Text style={styles.texte}>
          {enCours ? 'Recherche…' : 'Rechercher une mise à jour'}
        </Text>
      </Pressable>
      <Text style={styles.detail}>
        Version {versionExecution}
        {idCourt ? ` · mise à jour ${idCourt}` : ' · version d’origine'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bloc: { gap: spacing.xs },
  bouton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  texte: { fontSize: fontSize.base, fontWeight: '600', color: colors.primary },
  detail: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
});
