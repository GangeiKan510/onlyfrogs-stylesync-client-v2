/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import SkinToneAnalysisImage from "../../assets/images/svg/skin-tone-analysis-hero.svg";
import LoadingScreen from "../common/LoadingScreen";
import Result from "./result";
import { analyzeUserSkinTone } from "@/network/web/user";
import FloatingActionMenu from "../buttons/FloatingActionMenu";
import Toast from "react-native-toast-message";

const SkinToneAnalysis = ({
  onAnalyzeComplete,
  setIsAnalyzing,
  setSkinToneAnalysisResult,
}: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      console.log("Captured Image URI:", selectedImage);
    }
  }, [selectedImage]);

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleTakePicture = async () => {
    await requestCameraPermissions();

    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        await analyzeSkinToneImage(uri);
      }
    }
  };

  const handleUploadFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        await analyzeSkinToneImage(uri);
      }
    }
  };

  const analyzeSkinToneImage = async (imageUri: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: imageUri.split("/").pop(),
      type: "image/jpeg",
    } as any);

    setIsLoading(true);
    setIsAnalyzing(true);

    try {
      const result = await analyzeUserSkinTone(formData);
      console.log("Analysis result:", result);

      if (result.error && result.error.includes("no face detected")) {
        Toast.show({
          type: "error",
          text1: "No face detected",
          text2: "Please retake the photo and ensure your face is visible.",
          position: "top",
          swipeable: true,
        });

        resetAnalysis();
        return;
      }

      setAnalysisResult(result.skinToneAnalysis);
      setSkinToneAnalysisResult(result.skinToneAnalysis);
      onAnalyzeComplete();
    } catch (error) {
      console.error("Failed to analyze skin tone:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No face detected. Please try again.",
        position: "top",
        swipeable: true,
      });
      resetAnalysis();
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setIsAnalyzing(false);
    setIsLoading(false);
  };

  const actions = [
    {
      iconName: "camera",
      onPress: handleTakePicture,
      label: "",
    },
    {
      iconName: "picture",
      onPress: handleUploadFromGallery,
      label: "",
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingScreen message={"Analyzing your skin tone..."} />
      ) : analysisResult ? (
        <Result
          subSeason={analysisResult.sub_season}
          complements={analysisResult.complements}
        />
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
              </View>
            </View>
          </View>
        </View>
      )}
      {!isLoading && !analysisResult && (
        <FloatingActionMenu actions={actions as any} loading={isLoading} />
      )}
    </>
  );
};

export default SkinToneAnalysis;
