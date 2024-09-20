import React, { useState } from "react";
import { Modal, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import BackIcon from "../../assets/icons/back-icon.svg";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import SeasonAccordion from "../clothing-detail-accordion/Season";
import OccasionSelection from "../clothing-detail-accordion/Occasion";
import CategorySelection from "../clothing-detail-accordion/Category";

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
  const [isSaving, setIsSaving] = useState(false); // Track saving state

  const handleSave = () => {
    setIsSaving(true); // Indicate saving process (optional)

    setTimeout(() => {
      setIsSaving(false); // End saving process
      onClose();
      console.log("Clothing item saved!");
    }, 500);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 justify-center items-center bg-white bg-opacity-50">
        <TouchableOpacity
          onPress={onClose}
          className="z-10 absolute top-6 left-7 p-2"
        >
          <BackIcon width={22} height={22} />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold text-center mt-7">
            Item Details
          </Text>
        </View>
        <View className="z-10 absolute top-6 right-7 p-2">
          <DesignIcon width={24} height={24} />
        </View>
        <ScrollView>
          <View className="w-full h-full flex-1 items-center">
            {clothingImage && (
              <Image
                source={{ uri: clothingImage }}
                className="w-full h-60 my-4"
                resizeMode="contain"
              />
            )}
            {/*  Accordion */}
            <View className="mt-4 w-full px-4">
              <Text className="font-bold text-xl mb-2 text-[#484848]">
                When will you wear it?
              </Text>
              <SeasonAccordion />
            </View>
            <View className="mt-4 w-full px-4 mb-4">
              <OccasionSelection />
            </View>
            <View className="mt-4 w-full px-4">
              <Text className="font-bold text-xl mb-2">
                What kind of item is this??
              </Text>
              <CategorySelection />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleSave} // Saving and closing the modal
          className="w-96 p-4 bg-[#7ab3b3] absolute bottom-2 rounded-2xl"
        >
          <Text className="text-center text-white text-lg font-bold">
            {isSaving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ClothingDetailsModal;
