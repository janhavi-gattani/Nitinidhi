// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       <Stack.Screen name="login" />
//       <Stack.Screen name="profile-setup" />
//       <Stack.Screen name="(tabs)" />
//       <Stack.Screen name="schemes" options={{ headerShown: false }} />
//       <Stack.Screen name="documents" options={{ headerShown: false }} />
//       <Stack.Screen name="chatbot" options={{ headerShown: false }} />
//       <Stack.Screen name="complaints" options={{ headerShown: false }} />
//       <Stack.Screen name="news" options={{ headerShown: false }} />
//       <Stack.Screen name="helpline" options={{ headerShown: false }} />
//       <Stack.Screen name="explore-schemes" options={{ headerShown: false }} />
//       <Stack.Screen name="schemes-by-category" options={{ headerShown: false }} />
//       <Stack.Screen name="scheme-details" options={{ headerShown: false }} />
//       <Stack.Screen name="application-form" options={{ headerShown: false }} />
//       <Stack.Screen name="check-status" options={{ headerShown: false }} />
//       <Stack.Screen name="menu" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingComplete = await AsyncStorage.getItem('@onboarding_complete');
      setHasSeenOnboarding(onboardingComplete === 'true');
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!hasSeenOnboarding && segments[0] !== 'onboarding') {
      // User hasn't seen onboarding, redirect to onboarding
      router.replace('/onboarding');
    } else if (hasSeenOnboarding && segments[0] === 'onboarding') {
      // User has seen onboarding but is on onboarding screen, redirect to home
      router.replace('/(tabs)');
    }
  }, [hasSeenOnboarding, segments, isLoading]);

  if (isLoading) {
    // Optional: Show a splash screen while loading
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="SchemesScreen" />
      <Stack.Screen name="DocumentsScreen" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="ComplaintFormScreen" />
      <Stack.Screen name="ComplaintDetailsScreen" />
      <Stack.Screen name="NewsScreen" />
      <Stack.Screen name="NewsDetailsScreen" />
      <Stack.Screen name="HelplineScreen" />
      <Stack.Screen name="StatusScreen" />
      <Stack.Screen name="ExploreSchemesScreen" />
      <Stack.Screen name="ExploreSchemes" />
      <Stack.Screen name="SchemeDetailsScreen" />
      <Stack.Screen name="EligibleSchemesScreen" />
      <Stack.Screen name="ApplicationFormScreen" />
      <Stack.Screen name="JobDetailsScreen" />
      <Stack.Screen name="JobUpdateScreen" />
      <Stack.Screen name="ProfileScreen" />
    </Stack>
  );
}