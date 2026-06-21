import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from '@/lib/auth';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout() {
  // On BLOQUE le rendu tant que la police d'icones (Ionicons) n'est pas chargee.
  // Sinon, les ecrans montes avant la fin du chargement dessinent des icones VIDES
  // et ne se re-rendent jamais -> icones blanches partout en build de prod (bug 21/06).
  // En cas d'erreur de chargement, on affiche quand meme l'app (pas d'ecran blanc).
  const [fontsLoaded, fontError] = useFonts(Ionicons.font);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
