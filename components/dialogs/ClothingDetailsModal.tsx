import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import CloseModalIcon from "../../assets/icons/modal/close-modal.svg";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import SeasonAccordion from "../clothing-detail-accordion/Season";
import OccasionSelection from "../clothing-detail-accordion/Occasion";
import CategorySelection from "../clothing-detail-accordion/Category";
import ColorAccordion from "../clothing-detail-accordion/Color";

import Spinner from "../common/Spinner";
import MaterialAccordion from "../clothing-detail-accordion/Material";
import PatternAccordion from "../clothing-detail-accordion/Pattern";

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
  const [isSaving, setIsSaving] = useState(false);
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedColor, setSelectedcolor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string | null;
    type: string | null;
  }>({ name: null, type: null });

  const handleSave = () => {
    const clothingDetails = {
      name: itemName,
      brand: brandName,
      season: selectedSeasons,
      occasion: selectedOccasions,
      category: {
        name: selectedCategory.name,
        type: selectedCategory.type,
      },
      Color: selectedColor,
    };

    console.log("Clothing Details:", clothingDetails);

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="justify-center items-center bg-white bg-opacity-50 mt-2">
          <TouchableOpacity
            onPress={onClose}
            className="z-10 absolute top-6 left-7 py-2"
          >
            <CloseModalIcon width={18} height={18} />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-center mt-7">
              Item Details
            </Text>
          </View>
          <View className="z-10 absolute top-5 right-7 p-2">
            <DesignIcon width={24} height={24} />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="w-full h-full flex-1 items-center">
            {clothingImage && (
              <Image
                source={{ uri: clothingImage }}
                className="w-full h-60 my-4"
                resizeMode="contain"
              />
            )}
            {/* <View className="w-full px-4 mt-4">
              <Text className="mb-1 text-lg text-[#484848] font-bold">
                Name
              </Text>
              <TextInput
                placeholder="Enter item name"
                value={itemName}
                onChangeText={setItemName}
                className="w-full h-[42px] bg-[#F3F3F3] rounded-lg px-4"
              />
            </View>
            <View className="w-full px-4 mt-4">
              <Text className="mb-1 text-lg text-[#484848] font-bold">
                Brand
              </Text>
              <TextInput
                placeholder="Enter brand name"
                value={brandName}
                onChangeText={setBrandName}
                className="w-full h-[42px] bg-[#F3F3F3] rounded-lg px-4"
              />
            </View> */}
            <View className="mt-4 w-full px-4">
              <Text className="mb-1 text-lg text-[#484848] font-bold">
                When will you wear it?
              </Text>
              <SeasonAccordion
                selectedSeasons={selectedSeasons}
                setSelectedSeasons={setSelectedSeasons}
              />
            </View>
            <View className="mt-4 w-full px-4 mb-4">
              <OccasionSelection
                selectedOccasions={selectedOccasions}
                setSelectedOccasions={setSelectedOccasions}
              />
            </View>
            <View className="mt-4 w-full px-4">
              <Text className="mb-1 text-lg text-[#484848] font-bold">
                What kind of item is this?
              </Text>
              <CategorySelection
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <View className="mt-4 w-full mb-4">
                <ColorAccordion
                selectedColor={selectedColor}
                setSelectedColor={setSelectedcolor}
                />
              </View>
              <View className="w-full mb-4">
                <MaterialAccordion
                />
              </View>
              <View className="w-full mb-4">
                <PatternAccordion
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="w-96 h-[42px] flex items-center justify-center bg-[#7ab3b3] absolute bottom-2 self-center rounded-[10px] mb-4"
        >
          <Text className="text-center text-white">
            {isSaving ? <Spinner type={"primary"} /> : "Save"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ClothingDetailsModal;
