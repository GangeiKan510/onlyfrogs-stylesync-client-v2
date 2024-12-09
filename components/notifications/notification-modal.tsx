import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import CloseModal from "../../assets/icons/modal/close.svg";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationModal = ({ visible, onClose }: NotificationModalProps) => {
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
            <Text className="font-semibold">Actions</Text>
            <View className="flex-row justify-between items-center">
              <Text>Delete all notifs</Text>
              <Pressable className="bg-red bg-opacity-25 rounded-lg">
                <Text className="text-white p-2">Delete all</Text>
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
