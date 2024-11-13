/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { clearConversationMessages } from "@/network/web/chat";
import {
  updateConsiderSkinTone,
  updatePrioritizePreferences,
} from "@/network/web/user";
import { useUser } from "../config/user-context";
import Spinner from "../common/Spinner";
import Toast from "react-native-toast-message";
import CloseModal from "../../assets/icons/modal/close.svg";
import ToggleButton from "../buttons/ToggleButton";

const SettingsDropdown = ({ visible, onClose, resetChatState }: any) => {
  const { user, refetchMe } = useUser();
  const [loading, setLoading] = useState(false);

  const [prioritizePreferences, setPrioritizePreferences] = useState(false);
  const [considerSkinTone, setConsiderSkinTone] = useState(false);

  useEffect(() => {
    if (user && user.promptSettings) {
      console.log("User in SettingsDropdown:", user);
      setPrioritizePreferences(
        user.promptSettings.prioritize_preferences || false
      );
      setConsiderSkinTone(user.promptSettings.consider_skin_tone || false);
    }
  }, [user, visible]);

  const handleTogglePrioritizePreferences = async (state: boolean) => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not found!",
      });
      return;
    }

    try {
      const response = await updatePrioritizePreferences({
        userId: user.id,
        prioritizePreferences: state,
      });

      if (!response) {
        throw new Error("Empty response from server");
      }

      setPrioritizePreferences(state);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Prioritize Preferences updated successfully!",
      });

      refetchMe();
    } catch (error: any) {
      console.error("Error updating Prioritize Preferences:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: `Failed to update Prioritize Preferences: ${error.message}`,
      });
    }
  };

  const handleToggleConsiderSkinTone = async (state: boolean) => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not found!",
      });
      return;
    }

    try {
      const response = await updateConsiderSkinTone({
        userId: user.id,
        considerSkinTone: state,
      });

      if (!response) {
        throw new Error("Empty response from server");
      }

      setConsiderSkinTone(state);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Consider Skin Tone updated successfully!",
      });
      refetchMe();
    } catch (error: any) {
      console.error("Error updating Consider Skin Tone:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: `Failed to update Consider Skin Tone: ${error.message}`,
      });
    }
  };

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
        <View className="w-[300px] pb-4 bg-white rounded-lg shadow-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2 border-b border-[#E8E8E8] py-2 pl-4 pr-1">
            <Text className="text-base font-bold">Controls & Settings</Text>

            <Pressable className="p-2 bg-gray-100 rounded-lg" onPress={onClose}>
              <CloseModal width={22} height={22} color={"#000"} />
            </Pressable>
          </View>

          {/* Preferences Section */}
          <View>
            <Text className="mb-1 mx-4 font-semibold">Preferences</Text>
            <View className="flex-row items-center justify-between py-1 mx-4">
              <Text className="text-gray-700">Prioritize Preferences</Text>
              <ToggleButton
                initialState={prioritizePreferences}
                onToggle={(state) => handleTogglePrioritizePreferences(state)}
                showLabel={false}
              />
            </View>
            <View className="flex-row items-center justify-between border-b border-[#E8E8E8] py-2 mx-4">
              <Text className="text-gray-700">Consider Skin Tone</Text>
              <ToggleButton
                initialState={considerSkinTone}
                onToggle={(state) => handleToggleConsiderSkinTone(state)}
                showLabel={false}
              />
            </View>
          </View>

          {/* Chat Section */}
          <View>
            <Text className="mb-1 mx-4 font-semibold mt-2">Chat</Text>
            <View className="flex-row items-center justify-between pt-2 mx-4">
              <Text className="mb-4">Delete all messages</Text>
              <Pressable
                className="flex-row items-center p-2 bg-red bg-opacity-25 rounded-lg"
                onPress={handleClearConversation}
              >
                {loading ? (
                  <Spinner type="primary" />
                ) : (
                  <Text className="text-white font-semibold">Delete all</Text>
                )}
              </Pressable>
            </View>
          </View>
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
    top: "40%",
    left: "50%",
    transform: [{ translateX: -0.5 * 300 }, { translateY: -0.5 * 200 }],
    zIndex: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsDropdown;
