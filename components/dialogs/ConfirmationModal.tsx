/* eslint-disable react/prop-types */
import {
  View,
  Text,
  Modal,
  GestureResponderEvent,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: (event: GestureResponderEvent) => void;
  onCancel: () => void;
  message: string;
  description: string;
  isLoading: boolean;
  type: "primary" | "secondary";
  confirmMessage: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  message,
  description,
  isLoading,
  type,
  confirmMessage,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="w-4/5 bg-white rounded-[10px] p-5 items-center">
          <Text className="text-[18px] mb-1 font-bold">{message}</Text>
          <Text className="text-base mb-4">{description}</Text>
          <View className="flex-row justify-between w-full">
            <TouchableOpacity
              className="h-[35px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              onPress={onCancel}
            >
              <Text className="text-base text-center text-text-tertiary">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-[35px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              onPress={onConfirm}
            >
              <Text className="text-base text-white text-center">
                {isLoading ? (
                  <ActivityIndicator
                    size={"small"}
                    color={type === "primary" ? "#fff" : "#7ab2b2"}
                  />
                ) : (
                  confirmMessage
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
