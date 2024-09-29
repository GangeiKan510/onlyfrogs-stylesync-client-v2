/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, Pressable } from "react-native";

const SettingsDropdown = ({ visible, onClose }: any) => {
  if (!visible) return null;

  return (
    <>
      <Pressable
        className="absolute inset-0 z-40"
        onPress={onClose}
        style={{ backgroundColor: "transparent" }}
      />

      <View className="absolute right-12 top-24 z-50 bg-white p-4 rounded-lg shadow">
        <Pressable>
          <Text className="text-black">Settings</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SettingsDropdown;
