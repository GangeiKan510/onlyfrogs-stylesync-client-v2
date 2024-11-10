/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import ClearConversationIcon from "../../assets/icons/chat/clear-conversation-icon.svg";
import { clearConversationMessages } from "@/network/web/chat";
import { useUser } from "../config/user-context";
import Spinner from "../common/Spinner";
import Toast from "react-native-toast-message";

const SettingsDropdown = ({ visible, onClose, resetChatState }: any) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleClearConversation = async () => {
    if (!user) return;

    setLoading(true);

    try {
      await clearConversationMessages(user.id);

      Toast.show({
        type: "success",
        text1: "Conversation cleared!",
        text2: "All messages have been removed successfully.",
      });

      resetChatState();
    } catch (error) {
      console.error("Error clearing conversation:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to clear conversation!",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <>
      <Pressable
        className="absolute inset-0 z-40"
        onPress={onClose}
        style={{ backgroundColor: "transparent" }}
      />

      <View className="absolute right-12 top-24 z-50 bg-white p-4 rounded-lg shadow">
        {loading ? (
          <View className="flex items-center">
            <Spinner type="secondary" />
          </View>
        ) : (
          <Pressable
            className="flex-row items-center"
            onPress={handleClearConversation}
          >
            <ClearConversationIcon />
            <Text className="text-[#FE3B3B] ml-1">Clear conversation</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default SettingsDropdown;
