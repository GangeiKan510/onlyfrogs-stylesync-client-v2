/* eslint-disable react/prop-types */
import {
  View,
  Text,
  Modal,
  Pressable,
  GestureResponderEvent,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import CloseIcon from "@/assets/icons/x-icon.svg";
import { useRouter } from "expo-router";

interface TokenInfoModalProps {
  visible: boolean;
  onConfirm: (event: GestureResponderEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
  type: "primary" | "secondary";
  confirmMessage: string;
}

const TokenInfoModal: React.FC<TokenInfoModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  isLoading,
  type,
  confirmMessage,
}) => {
  const router = useRouter();

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
        <View className="relative w-[80%] bg-white rounded-xl shadow-lg">
          <View className="flex-row justify-between bg-[#F2F2F2] w-full p-4 rounded-t-[10px]">
            <Text className="text-lg font-bold">Token Information!</Text>
            <Pressable onPress={onCancel}>
              <CloseIcon width={24} height={24} color={"black"} />
            </Pressable>
          </View>
          <View className="p-4">
            <Text className="text-sm">
              Tokens are points that get used whenever you chat with Ali.
            </Text>
            <Text className="mt-4 text-sm text-[#7AB2B2] font-bold">
              1 Token = 1 Word
            </Text>
            <Text className="mt-4 text-sm">
              Note: You will get 150 tokens daily! 🎊
            </Text>
          </View>
          <View className="w-full px-4">
            <TouchableOpacity

              className="w-full items-center justify-center bg-[#7AB2B2] rounded-lg h-[42px] mb-6"
              onPress={onConfirm}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={type === "primary" ? "#fff" : "#7ab2b2"}
                />
              ) : (
                <Text className="text-white text-center">{confirmMessage}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TokenInfoModal;