import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "@/hooks/useCustomFonts";
import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await useFonts();
  };

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
        <Stack.Screen name="survey/survey" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
        <Stack.Screen name="profile/ProfileSettings" options={{headerShown: false}}/> 
        <Stack.Screen name="profile/PersonalInformation" options={{headerShown: false}}/> 
        <Stack.Screen name="profile/PreferencesAndBudget" options={{headerShown: false}}/>
        <Stack.Screen name="profile/ResetPassword" options={{headerShown: false}}/>
        <Stack.Screen name="profile/BodyType" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <Toast />
    </ThemeProvider>
  );
}
