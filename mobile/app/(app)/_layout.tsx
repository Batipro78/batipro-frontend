import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/auth';
import { colors } from '@/lib/theme';
import { CGUModal } from '@/components/CGUModal';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading]);

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
