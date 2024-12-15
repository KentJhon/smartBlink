import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
      <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="passwordrecovery" />
            <Stack.Screen name="signup" />
          </Stack>
      </SafeAreaProvider>
  );
};

export default RootLayout;
