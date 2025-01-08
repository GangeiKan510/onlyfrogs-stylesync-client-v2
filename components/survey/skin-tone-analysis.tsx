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
import { SafeAreaView } from "react-native-safe-area-context";
import CheckMark from "@/assets/icons/check-mark.svg";
import SkinToneCamera from "@/app/skinToneCamera";

const SkinToneAnalysis = ({
  onAnalyzeComplete,
  setIsAnalyzing,
  setSkinToneAnalysisResult,
}: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("front");
  const [isCameraActive, setIsCameraActive] = useState(false);

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

  const handleOpenCamera = () => {
    setIsCameraActive(true);
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
  };

  const handleSwitchCamera = () => {
    setCameraFacing(cameraFacing === "front" ? "back" : "front");
  };

  const handleTakePicture = async (uri: string) => {
    await requestCameraPermissions();

    if (hasPermission) {
      setSelectedImage(uri);
      await analyzeSkinToneImage(uri);
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
      onPress: handleOpenCamera,
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
      ) : isCameraActive ? (
        <View className="flex-1 bg-white">
          <SkinToneCamera
            onTakePicture={handleTakePicture}
            onCancel={handleCloseCamera}
            onSwitchCamera={handleSwitchCamera}
            cameraFacing={cameraFacing}
            isVisible={isCameraActive}
          />
        </View>
      ) : (
        <SafeAreaView className="flex-1 bg-white">
          <View className="w-full flex-row items-center top-2 px-6 z-30">
            <Text className="flex-1 text-center text-[20px] font-bold">
              Skin Tone Analysis
            </Text>
          </View>
          <View className="h-[85vh] flex justify-center items-center mt-10">
            <View className="mb-14">
              <Text className="text-[16px] text-center mb-5">
                Let&apos;s find your perfect shades.
              </Text>
              <SkinToneAnalysisImage />
            </View>
            <View className="w-[85%]">
              <Text className=" text-sm font-bold text-center">
                To Achieve Accurate Skin Tone Analysis Result:
              </Text>
              <View className="flex-col ml-8 w-[80%] ">
                <View className="mt-2 flex-row items-start">
                  <CheckMark width={16} height={16} className="mt-1" />
                  <Text className="text-xs ml-3">
                    Ensure even lighting to avoid shadows or overexposure.
                  </Text>
                </View>
                <View className="mt-2 flex-row items-start">
                  <CheckMark width={16} height={16} className="mt-1" />
                  <Text className="text-xs ml-3">
                    Remove any accessories like hats or glasses.
                  </Text>
                </View>
                <View className="mt-2 flex-row items-start">
                  <CheckMark width={16} height={16} className="mt-1" />
                  <Text className="text-xs ml-3">
                    Move your face closer to the screen so it fills the frame
                    completely.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {!isLoading && !analysisResult && (
            <FloatingActionMenu actions={actions as any} loading={isLoading} />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default SkinToneAnalysis;
