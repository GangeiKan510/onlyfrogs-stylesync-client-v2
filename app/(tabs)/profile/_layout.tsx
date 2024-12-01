import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile-settings"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="personal-information"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="preferences-and-budget"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="skin-tone-analysis"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="body-type"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="subscription"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="success"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
