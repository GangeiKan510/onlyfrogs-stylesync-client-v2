import {
  View,
  Text,
  Modal,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import React from "react";

interface UploadClothingModalProps {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  onTakePicture: (event: GestureResponderEvent) => void;
  onUploadFromGallery: (event: GestureResponderEvent) => void;
  onLinkUpload: (event: GestureResponderEvent) => void;
}

const UploadClothingModal: React.FC<UploadClothingModalProps> = ({
  visible,
  onClose,
  onTakePicture,
  onUploadFromGallery,
  onLinkUpload,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        className="flex-1 justify-end items-end"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="p-5 rounded-lg w-1/3 h-1/2">
          <Text className="text-lg font-bold mb-4 text-white text-center">
            Upload
          </Text>
          <Pressable
            className="p-3 mb-2 bg-[#7ab3b3] rounded-lg"
            onPress={onTakePicture}
          >
            <Text className="text-center text-white">Camera</Text>
          </Pressable>
          <Pressable
            className="p-3 mb-2 bg-[#7ab3b3] rounded-lg"
            onPress={onUploadFromGallery}
          >
            <Text className="text-center text-white">Album</Text>
          </Pressable>
          <Pressable
            className="p-3 mb-2 bg-[#7ab3b3] rounded-lg"
            onPress={onLinkUpload}
          >
            <Text className="text-center text-white">Link</Text>
          </Pressable>
          <Pressable
            className="p-3 bg-[#E34234] border-[#7ab3b3] rounded-lg"
            onPress={onClose}
          >
            <Text className="text-center text-white">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default UploadClothingModal;
