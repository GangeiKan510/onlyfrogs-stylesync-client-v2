/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, Pressable } from "react-native";

const SettingsDropdown = ({ visible, onClose }: any) => {
  if (!visible) return null;

  return (
    <Pressable className="absolute inset-0" onPress={onClose}>
      <View className="absolute top-12 right-5 bg-white p-4 rounded-lg shadow-lg z-50">
        <Pressable className="py-2">
          <Text className="text-black">Settings</Text>
        </Pressable>
        <Pressable className="py-2">
          <Text className="text-black">Help</Text>
        </Pressable>
        <Pressable className="py-2">
          <Text className="text-black">About</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default SettingsDropdown;
