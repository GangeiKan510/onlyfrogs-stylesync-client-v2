import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dimmed backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Centered dialog */}
      <View style={styles.centeredContainer}>
        <View className="w-[300px] h-[200px] bg-white rounded-lg shadow-lg p-6">
          {loading ? (
            <View className="flex justify-center items-center">
              <Spinner type="secondary" />
            </View>
          ) : (
            <>
              <Text className="text-lg font-bold mb-4">Chat Settings</Text>
              <Pressable
                className="flex-row items-center p-3 bg-red-100 rounded-lg mb-4"
                onPress={handleClearConversation}
              >
                <ClearConversationIcon />
                <Text className="text-red-500 ml-2">Clear conversation</Text>
              </Pressable>
              <Pressable
                className="p-3 bg-gray-100 rounded-lg"
                onPress={onClose}
              >
                <Text className="text-center text-gray-700">Cancel</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 * 300 }, { translateY: -0.5 * 200 }],
    zIndex: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsDropdown;
