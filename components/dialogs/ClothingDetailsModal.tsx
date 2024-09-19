import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";

interface ClothingDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  clothingImage: string | null;
}

const ClothingDetailsModal: React.FC<ClothingDetailsModalProps> = ({
  isVisible,
  onClose,
  clothingImage,
}) => {
  return (
    <Modal visible={isVisible} transparent={false} animationType="slide" presentationStyle="fullScreen">
    <View className="flex-1 justify-center items-center bg-white bg-opacity-50">
      <View className="w-full h-full flex-1 items-center">
        {clothingImage && (
          <>
            <Image
              source={{ uri: clothingImage }}
              className="w-full h-60 my-4"
              resizeMode="contain"
            />
            <TouchableOpacity onPress={onClose} className="w-3/4 p-2 bg-[#7ab3b3] rounded-md absolute bottom-8 transform -translate-x-1/2">
              <Text className="text-center">Close</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  </Modal>
  );
};

export default ClothingDetailsModal;
