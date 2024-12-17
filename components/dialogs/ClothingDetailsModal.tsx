import React, { useState, useEffect } from "react";
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
import SeasonAccordion from "../accordions/Season";
import OccasionSelection from "../accordions/Occasion";
import CategorySelection from "../accordions/Category";
import ColorAccordion from "../accordions/Color";
import Spinner from "../common/Spinner";
import MaterialAccordion from "../accordions/Material";
import PatternAccordion from "../accordions/Pattern";
import { updateClothing, deleteItem } from "@/network/web/clothes";
import Toast from "react-native-toast-message";
import { useUser } from "../config/user-context";
import DeleteIcon from "../../assets/icons/delete-icon.svg";
import SparkIcon from "../../assets/icons/spark.svg";
import { analyzeClothing } from "@/network/web/clothes";
import { LinearGradient } from "expo-linear-gradient";

interface ClothingDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  clothingImage: string | null;
  clothingId: string | null;
  wornCount: number;
}

const ClothingDetailsModal: React.FC<ClothingDetailsModalProps> = ({
  isVisible,
  onClose,
  clothingImage,
  clothingId,
  wornCount,
}) => {
  const { user, refetchMe } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState<string | string[]>("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string | null;
    type: string | null;
  }>({ name: null, type: null });
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (clothingId && user?.clothes) {
      const matchingClothing = user.clothes.find(
        (item) => item.id === clothingId
      );

      if (matchingClothing) {
        setItemName(matchingClothing.name || "");
        setBrandName(matchingClothing.brand || "");
        setSelectedSeasons(matchingClothing.season || []);
        setSelectedOccasions(matchingClothing.occasion || []);
        setSelectedColor((matchingClothing.color as string) || null);
        setSelectedCategory({
          name: matchingClothing.category?.name || null,
          type: matchingClothing.category?.type || null,
        });
        setSelectedMaterial(matchingClothing.material || null);
        setSelectedPattern(matchingClothing.pattern || null);
      }
    }
  }, [clothingId, user?.clothes]);

  // Helper function to check if all required fields are filled
  const isFormValid = () => {
    if (selectedCategory.name === "Jewelry" && selectedCategory.type) {
      return true;
    }

    return (
      selectedSeasons.length > 0 &&
      selectedOccasions.length > 0 &&
      selectedCategory.name !== null &&
      selectedCategory.type !== null &&
      selectedColor !== null &&
      selectedMaterial !== null &&
      selectedPattern !== null
    );
  };

  const handleSave = async () => {
    const clothingDetails = {
      id: clothingId,
      name: itemName,
      brand: brandName,
      season: selectedSeasons,
      occasion: selectedOccasions,
      category: {
        name: selectedCategory.name || null,
        type: selectedCategory.type || null,
      },
      color: selectedColor || null,
      material: selectedMaterial || null,
      pattern: selectedPattern || null,
    };

    setIsSaving(true);

    try {
      await updateClothing(clothingDetails);
      Toast.show({
        type: "success",
        text1: "Successfully updated clothing!",
        position: "top",
        swipeable: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to update clothing!",
        position: "top",
        swipeable: true,
      });
      console.error("Failed to update clothing:", error);
    } finally {
      setIsSaving(false);
      onClose();
      refetchMe();
    }
  };

  const handleAnalyzeWithAI = async () => {
    if (!clothingImage) return;

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeClothing(clothingImage);
      console.log("AI Analysis Result:", analysisResult);

      if (analysisResult?.tags) {
        const { category, material, occasion, pattern, season, color } =
          analysisResult.tags;

        setSelectedCategory({
          name: category?.name || null,
          type: category?.type || null,
        });
        setSelectedMaterial(material || null);
        setSelectedOccasions(occasion || []);
        setSelectedPattern(pattern || null);
        setSelectedSeasons(season || []);
        setSelectedColor(color || null);

        Toast.show({
          type: "success",
          text1: "Analysis completed and fields updated!",
          position: "top",
          swipeable: true,
        });
      }
    } catch (error) {
      console.error("Failed to analyze clothing:", error);
      Toast.show({
        type: "error",
        text1: "Failed to analyze clothing. Please try again.",
        position: "top",
        swipeable: true,
      });
      onClose();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = async () => {
    if (clothingId) {
      setIsDeleting(true);
      try {
        await deleteItem(clothingId);
        Toast.show({
          type: "success",
          text1: "Clothing deleted successfully!",
          position: "top",
          swipeable: true,
        });
        onClose();
        setShowModal(false);
        refetchMe();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to delete clothing!",
          position: "top",
          swipeable: true,
        });
        console.error("Failed to delete clothing:", error);
      } finally {
        setIsDeleting(false);
        setShowModal(false);
      }
    }
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

        <View className="flex-1 relative">
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            <View className="w-full h-full flex-1 items-center">
              {clothingImage && (
                <Image
                  source={{ uri: clothingImage }}
                  className="w-full h-60 my-4"
                  resizeMode="contain"
                />
              )}

              <TouchableOpacity
                onPress={handleAnalyzeWithAI}
                disabled={isAnalyzing}
                className="absolute w-28 right-4 top-60 ml-auto rounded-full border-2 border-transparent overflow-hidden"
                style={{
                  elevation: 6,
                  shadowOffset: { width: 5, height: 5 },
                  shadowOpacity: 0.2,
                }}
              >
                <LinearGradient
                  colors={["#7AB2B2", "#B088CD"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 10,
                    borderRadius: 9999,
                  }}
                  className="flex-row items-center justify-center"
                >
                  {isAnalyzing ? (
                    <Spinner type={"primary"} />
                  ) : (
                    <>
                      <SparkIcon width={20} height={20} color={"#ffffff"} />
                      <Text className="text-white text-center ml-1">
                        Analyze
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              <View className="mt-4 w-full px-4">
                <Text className="mb-1 text-lg text-[#484848] font-bold">
                  When will you wear it?
                </Text>
                <SeasonAccordion
                  selectedSeasons={selectedSeasons}
                  setSelectedSeasons={setSelectedSeasons}
                />
                <View className="mt-4 w-full">
                  <OccasionSelection
                    selectedOccasions={selectedOccasions}
                    setSelectedOccasions={setSelectedOccasions}
                  />
                </View>
              </View>

              <View className="mt-5 w-full px-4">
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
                    setSelectedColor={setSelectedColor}
                  />
                </View>
                <View className="w-full mb-4">
                  <MaterialAccordion
                    selectedMaterial={selectedMaterial}
                    setSelectedMaterial={setSelectedMaterial}
                  />
                </View>
                <View className="w-full mb-4">
                  <PatternAccordion
                    selectedPattern={selectedPattern}
                    setSelectedPattern={setSelectedPattern}
                  />
                </View>
                <View className="bg-[#F3F3F3] px-4 py-3 rounded-md">
                  <Text className="text-[16px] text-[#484848] mb-2">Brand</Text>
                  <TextInput
                    placeholder="Enter brand name"
                    value={brandName as string}
                    onChangeText={(text) => {
                      setBrandName(text);
                      setIsTyping(text.length > 0);
                    }}
                    style={{
                      color: isTyping ? "#7ab3b3" : "#000",
                    }}
                  />
                </View>
                <Text className="text-lg text-[#484848] font-bold mt-5">
                  Additional information
                </Text>
                <View className="bg-[#F3F3F3] px-4 py-3 rounded-md mt-1">
                  <Text className="text-[16px] text-[#484848] mb-2">Name</Text>
                  <TextInput
                    placeholder="Give it a name (optional)"
                    value={itemName}
                    onChangeText={(text) => {
                      setItemName(text);
                      setIsTyping(text.length > 0);
                    }}
                    style={{
                      color: isTyping ? "#7ab3b3" : "#000",
                    }}
                  />
                </View>
                <View className="bg-[#F3F3F3] px-4 py-3 rounded-md mt-4">
                  <Text className="text-[16px] text-[#484848] mb-2">
                    Number of wears
                  </Text>
                  <Text className="text-[16px] text-[#B7B7B7]">
                    {wornCount ? wornCount : 0}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center self-center space-x-4 mb-4 absolute bottom-2">
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <DeleteIcon width={32} height={32} color={"red"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className={`w-72 h-[42px] flex items-center justify-center rounded-[10px] ${
                  !isFormValid() ? "bg-[#9fcccc]" : "bg-bg-tertiary" // Disable button if form is invalid
                }`}
                disabled={!isFormValid() || isSaving}
              >
                {isSaving ? (
                  <Spinner type={"primary"} />
                ) : (
                  <Text className="text-white font-bold">Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* <TouchableOpacity
            onPress={handleAnalyzeWithAI}
            disabled={isAnalyzing}
            className="absolute w-28 right-4 top-60 ml-auto rounded-full border-2 border-transparent overflow-hidden"
            style={{
              elevation: 6,
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.2,
            }}
          >
            <LinearGradient
              colors={["#7AB2B2", "#B088CD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 10,
                borderRadius: 9999,
              }}
              className="flex-row items-center justify-center"
            >
              {isAnalyzing ? (
                <Spinner type={"primary"} />
              ) : (
                <>
                  <SparkIcon width={20} height={20} color={"#ffffff"} />
                  <Text className="text-white text-center ml-1">Analyze</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity> */}
        </View>

        <Modal animationType="fade" transparent={true} visible={showModal}>
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="w-4/5 bg-white rounded-[10px] p-5 items-center">
              <Text className="text-[18px] mb-1 font-bold">Confirm Delete</Text>
              <Text className="mt-2 text-center">
                Are you sure you want to delete this?
              </Text>
              <View className="flex-row justify-between items-center mt-4 space-x-4">
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  className="h-[42px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
                  disabled={isDeleting}
                >
                  <Text className="text-[#7AB2B2] text-[16px]">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  className="h-[42px] flex-1 border border-red bg-red rounded-lg mx-2 justify-center items-center"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Spinner type="primary" />
                  ) : (
                    <Text className="text-white text-[16px]">Delete</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};

export default ClothingDetailsModal;
