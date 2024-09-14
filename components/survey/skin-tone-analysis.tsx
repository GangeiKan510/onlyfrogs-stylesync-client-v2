/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import SkinToneAnalysisImage from "../../assets/images/svg/skin-tone-analysis-hero.svg";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import SkinToneImageOptions from "../buttons/SkinToneImageOptionButton";
import LoadingScreen from "../common/LoadingScreen";

const SkinToneAnalysis = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const analyzeSkinTone = () => {
    setTimeout(() => {}, 2000);
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  const handleTakePicture = async () => {
    await requestCameraPermissions();

    if (hasPermission) {
      if (selectedImage) {
        Alert.alert("Image Already Selected", "You can only select one image.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        handleCloseModal();
      }
    }
  };

  const handleUploadFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      if (selectedImage) {
        Alert.alert("Image Already Selected", "You can only select one image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        handleCloseModal();
      }
    }
  };

  return (
    <>
      {selectedImage ? (
        <LoadingScreen message={"Analyzing your skin tone..."} />
      ) : (
        <View>
          <View className="h-[85vh] flex justify-center items-center mt-10">
            <View className="mb-14">
              <Text className="text-[20px] font-bold text-center">
                Skin Tone Analysis
              </Text>
              <Text className="text-[16px] text-center mb-5">
                Let&apos;s find your perfect shades.
              </Text>
              <SkinToneAnalysisImage />
              <View className="w-[272px]">
                <Text className="text-[12px] text-center">
                  We&apos;ll use your camera to analyze your skin tone and
                  recommend the best colors for you.
                </Text>
                <Text className="text-[12px] text-center underline text-tertiary">
                  I already know my skin tone
                </Text>
              </View>
            </View>
            <View className="absolute z-10 bottom-8 right-10">
              <SkinToneImageOptions
                onCameraPress={handleTakePicture}
                onGalleryPress={handleUploadFromGallery}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default SkinToneAnalysis;
