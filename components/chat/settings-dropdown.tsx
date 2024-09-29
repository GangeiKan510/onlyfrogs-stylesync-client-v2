/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, Pressable } from "react-native";
import ClearConversationIcon from "../../assets/icons/chat/clear-conversation-icon.svg";

const SettingsDropdown = ({ visible, onClose }: any) => {
  if (!visible) return null;

  return (
    <>
      <Pressable
        className="absolute inset-0 z-40"
        onPress={onClose}
        style={{ backgroundColor: "transparent" }}
      />

      <View className="absolute right-12 top-24 z-50 bg-white p-2 rounded-lg shadow">
        <Pressable className="flex-row items-center">
          <ClearConversationIcon />
          <Text className="text-[#FE3B3B] ml-1">Clear conversation</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SettingsDropdown;
