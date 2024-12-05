/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  View,
  Text,
  Alert,

  BackHandler,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SkinToneAnalysisImage from "../../../assets/images/svg/skin-tone-analysis-hero.svg";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import SkinToneImageOptions from "../../../components/buttons/SkinToneImageOptionButton";
import LoadingScreen from "../../../components/common/LoadingScreen";
import { analyzeUserSkinTone } from "@/network/web/user";
import Result from "../../../components/survey/result";
import Back from "../../../assets/icons/back-icon.svg";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";
import { SafeAreaView } from "react-native-safe-area-context";

const SkinToneAnalysis = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const [skinToneAnalysisResult, setSkinToneAnalysisResult] =
    useState<any>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onAnalyzeComplete = () => {
    setIsAnalyzing(false);
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedImage) {
      console.log("Captured Image URI:", selectedImage);
    }
  }, [selectedImage]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
        handleCloseModal();

        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          name: uri.split("/").pop(),
          type: "image/jpeg",
        } as any);

        setIsLoading(true);
        setIsAnalyzing(true);
        try {
          console.log("Sending image for analysis:", formData);
          const result = await analyzeUserSkinTone(formData);
          console.log("Analysis result:", result);
          setAnalysisResult(result.skinToneAnalysis);
          setSkinToneAnalysisResult(result.skinToneAnalysis);
          onAnalyzeComplete();
        } catch (error) {
          console.error("Failed to analyze skin tone:", error);
          Alert.alert("Error", "Failed to analyze skin tone.");
        } finally {
          setIsLoading(false);
        }
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
        handleCloseModal();

        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          name: uri.split("/").pop(),
          type: "image/jpeg",
        } as any);

        setIsLoading(true);
        setIsAnalyzing(true);
        try {
          console.log("Sending image for analysis:", formData);
          const result = await analyzeUserSkinTone(formData);
          console.log("Analysis result:", result);
          setAnalysisResult(result.skinToneAnalysis);
          setSkinToneAnalysisResult(JSON.stringify(result.skinToneAnalysis));
          onAnalyzeComplete();
        } catch (error) {
          console.error("Failed to analyze skin tone:", error);
          Alert.alert("Error", "Failed to analyze skin tone.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    router.push("/(tabs)/profile/result");
  };

  const handleSave = () => {
    // Save the skin tone analysis result
    console.log("Saving skin tone analysis result:", skinToneAnalysisResult);
    router.push("/(tabs)/profile");
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen message={"Analyzing your skin tone..."} />
      ) : analysisResult ? (
        <View className="mt-auto flex-1 bg-white">
          <Result
            subSeason={analysisResult.sub_season}
            complements={analysisResult.complements}
          />
          <View className="flex-row justify-between px-8 bottom-4">
            <TouchableOpacity
              onPress={handleCancel}
              className="items-center justify-center flex bg-[#F9F9F9] rounded-[10px] w-[45%] h-[42px] border border-solid border-[#7AB2B2]"
            >
              <Text className="text-center text-[#7AB2B2] text-[16px] py-2">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              className="items-center justify-center bg-[#7AB2B2] rounded-[10px] w-[45%] h-[42px] border border-solid border-[#7AB2B2]"
            >
              <Text className="text-center text-[16px] text-white py-2">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <SafeAreaView className="flex-1 bg-white">
          <View className="w-full flex-row items-center top-2 px-6 z-30">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile/result")}
              className="absolute left-6 z-40"
            >
              <Back width={20} height={20} />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-[20px] font-bold">
              Skint Tone Analysis
            </Text>
          </View>
          <View className="h-[85vh] flex justify-center items-center mt-10">
            <View className="mb-14">
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
            <View className="absolute z-10 bottom-8 right-10">
              <SkinToneImageOptions
                onCameraPress={handleTakePicture}
                onGalleryPress={handleUploadFromGallery}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SkinToneAnalysis;
