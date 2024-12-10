/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  View,
  Text,
  Alert,
  BackHandler,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import SkinToneAnalysisImage from "../../../assets/images/svg/skin-tone-analysis-hero.svg";
import { Camera, CameraView, CameraMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import SkinToneImageOptions from "../../../components/buttons/SkinToneImageOptionButton";
import LoadingScreen from "../../../components/common/LoadingScreen";
import {
  analyzeUserSkinTone,
  updateUser,
  updateUserSkinToneDetails,
} from "@/network/web/user";
import Result from "../../../components/survey/result";
import Back from "../../../assets/icons/back-icon.svg";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/components/config/user-context";
import Toast from "react-native-toast-message";
import CheckMark from "@/assets/icons/check-mark.svg";
import SkinToneCamera from "@/app/skinToneCamera";

const SkinToneAnalysis = () => {
  const { user, refetchMe } = useUser();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [skinToneAnalysisResult, setSkinToneAnalysisResult] =
    useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [isCameraActive, setIsCameraActive] = useState(false);

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

  const handleOpenCamera = () => {
    setIsCameraActive(true);
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
  };

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleSwitchCamera = () => {
    setCameraFacing(cameraFacing === "back" ? "front" : "front");
  };

  const handleTakePicture = async (uri: string) => {
    setSelectedImage(uri);

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

  const handleCancel = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    router.push("/(tabs)/profile/result");
  };

  const handleSave = async () => {
    if (!skinToneAnalysisResult) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No skin tone analysis result to save.",
        position: "top",
        swipeable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      const userData = {
        id: user?.id,
        skin_tone_classification: skinToneAnalysisResult.skin_tone,
        skin_tone_complements: skinToneAnalysisResult.complements,
        season: skinToneAnalysisResult.season,
        sub_season: skinToneAnalysisResult.sub_season,
      };

      console.log("Sending user data for update:", userData);

      const updatedUser = await updateUserSkinToneDetails(userData as any);

      console.log("User updated successfully:", updatedUser);
      refetchMe();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your skin tone analysis has been saved.",
        position: "top",
        swipeable: true,
      });

      router.push("/(tabs)/profile");
    } catch (error) {
      console.error("Failed to save skin tone analysis result:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save skin tone analysis result.",
        position: "top",
        swipeable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile/result")}
              className="absolute left-6 z-40"
            >
              <Back width={20} height={20} />
            </TouchableOpacity>
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
          <View className="absolute z-10 bottom-8 right-10">
            <SkinToneImageOptions
              onCameraPress={handleOpenCamera}
              onGalleryPress={handleUploadFromGallery}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SkinToneAnalysis;
