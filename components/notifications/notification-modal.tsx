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
      <View style={styles.backdrop}>
        <View className="w-72 bg-white rounded-lg shadow-lg p-5">
          <View className="flex-row justify-between items-center border-b border-[#E8E8E8] pb-2 mb-2">
            <Text className="text-base font-bold">Notification Settings</Text>
            <Pressable onPress={onClose} className="p-2">
              <CloseModal width={22} height={22} color={"#000"} />
            </Pressable>
          </View>

          <View className="mb-4">
            <Text>
              Here you can manage your notification preferences or clear them.
            </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationModal;
