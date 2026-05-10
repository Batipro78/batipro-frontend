import { Stack } from 'expo-router';

export default function DevisStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="nouveau-vocal" />
      <Stack.Screen name="nouveau" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
