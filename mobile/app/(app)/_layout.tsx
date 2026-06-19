import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Tabs, router, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/auth';
import { colors } from '@/lib/theme';
import { CGUModal } from '@/components/CGUModal';

const TRIAL_DAYS = 14;

// Trial expire = pas premium ET plus de 14 j depuis trial_start. On "fail open"
// (acces autorise) si trial_start est absent/illisible, pour ne JAMAIS verrouiller
// un artisan legitime a cause d'une date manquante. Le backend ne bloque rien :
// c'est une barriere douce cote app pour pousser a l'abonnement.
function isTrialExpired(user: { is_premium: boolean; trial_start: string } | null): boolean {
  if (!user || user.is_premium || !user.trial_start) return false;
  const start = new Date(user.trial_start).getTime();
  if (Number.isNaN(start)) return false;
  return Date.now() > start + TRIAL_DAYS * 24 * 60 * 60 * 1000;
}

// Ecrans encore accessibles trial expire : abonnement (pour s'abonner) et profil
// (pour se deconnecter / gerer son compte). Tout le reste est bloque.
const ALLOWED_WHEN_EXPIRED = ['abonnement', 'profil'];

export default function AppLayout() {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (isTrialExpired(user)) {
      const current = segments[segments.length - 1];
      if (!ALLOWED_WHEN_EXPIRED.includes(current)) {
        router.replace('/abonnement');
      }
    }
  }, [user, loading, segments]);

  if (loading || !user) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <CGUModal />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.mutedForeground,
          tabBarStyle: {
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 70 + insets.bottom,
            paddingTop: 10,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 14,
            backgroundColor: colors.background,
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 6,
          },
          tabBarLabelStyle: { fontSize: 16, fontWeight: '700', marginTop: 4 },
          tabBarIconStyle: { marginBottom: 0 },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="devis"
          options={{
            title: 'Devis',
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="factures"
          options={{
            title: 'Factures',
            tabBarIcon: ({ color }) => (
              <Ionicons name="receipt-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clients"
          options={{
            title: 'Clients',
            tabBarIcon: ({ color }) => (
              <Ionicons name="people-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="articles" options={{ href: null }} />
        <Tabs.Screen name="abonnement" options={{ href: null }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
