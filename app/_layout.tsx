import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Href, Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "@/hooks/useCustomFonts";
import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { routes } from "@/utils/routes";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await useFonts();
  };

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      router.push(routes.noConnection as Href<string>);
    }
  });

  unsubscribe();

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
        <Stack.Screen
          name="verificationCode"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="setUpNewPassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="no-connection" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="skinToneCamera" options={{headerShown: false}} />
      </Stack>

      <Toast />
    </ThemeProvider>
  );
}
