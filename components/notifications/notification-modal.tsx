import React, { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import CloseModal from "../../assets/icons/modal/close.svg";
import Spinner from "../common/Spinner";
import { deleteAllNotifications } from "@/network/web/notification";
import { useUser } from "../config/user-context";
import Toast from "react-native-toast-message";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationModal = ({ visible, onClose }: NotificationModalProps) => {
  const { user, refetchMe } = useUser();
  const [loading, setLoading] = useState(false);

  const handleDeleteAllNotifications = async () => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not found!",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await deleteAllNotifications(user.id);

      Toast.show({
        type: "success",
        text1: "Notifications Cleared",
        text2: `${result.count || 0} notifications deleted successfully!`,
      });

      onClose();
    } catch (error) {
      console.error("Error deleting notifications:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete notifications.",
      });
    } finally {
      setLoading(false);
      refetchMe();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
          <View className="flex-row justify-between items-center border-b border-[#E8E8E8] pb-2 mb-2">
            <Text className="text-base font-bold">Notification Settings</Text>
            <Pressable onPress={onClose} className="p-2">
              <CloseModal width={22} height={22} color={"#000"} />
            </Pressable>
          </View>

          <View className="mb-4">
            <Text className="font-semibold mb-2">Actions</Text>
            <View className="flex-row justify-between items-center">
              <Text>Delete all notifs</Text>
              <Pressable
                className="bg-red bg-opacity-25 rounded-lg px-3 py-2"
                onPress={handleDeleteAllNotifications}
                disabled={loading}
              >
                {loading ? (
                  <Spinner type="primary" />
                ) : (
                  <Text className="text-white">Delete all</Text>
                )}
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default NotificationModal;
