/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import AnalysisFrame from "../assets/images/svg/analysis-frame.svg";
import Face from "../assets/images/svg/face.svg";
import Back from "../assets/icons/back-icon.svg";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import LoadingScreen from "@/components/common/LoadingScreen";
import Result from "../components/survey/result";
import { useRouter } from "expo-router";
import { analyzeUserSkinTone } from "@/network/web/user";

const analyzeSkinToneIntructions = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [skinToneAnalysisResult, setSkinToneAnalysisResult] = useState<any>(null);




  const onAnalyzeComplete = () => {
    setIsAnalyzing(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    requestCameraPermissions();
  }, []);
  
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestPermissions();
  }, []);

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

  const handleCancel = () => {
    setAnalysisResult(null);
  };

  const handleSave = () => {
    // Save the skin tone analysis result
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
          <View className="flex-row justify-between mt-[-40px] px-4">
            <Pressable
              onPress={handleCancel}
              className="flex bg-[#F9F9F9] rounded-[10px] w-[45%] h-[42px] border border-solid border-[#7AB2B2]"
            >
              <Text className="text-center text-[#7AB2B2] text-[16px] py-2">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              className="bg-[#7AB2B2] rounded-[10px] w-[45%] h-[42px] border border-solid border-[#7AB2B2]"
            >
              <Text className="text-center text-[16px] text-white py-2">
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <SafeAreaView className="flex-1 bg-[#ffffff] items-center">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            className="absolute left-8 z-40 top-16"
          >
            <Back width={20} height={20} />
          </TouchableOpacity>
          <View className="flex justify-center items-center pt-4">
            <Text className="text-4xl font-bold pt-32">Take A Selfie</Text>
            <View className="mt-8">
              <Text className="text-center">
                Move your face closer to the screen, ensuring it fills the
                frame. Keep the lighting even and avoid any shadows for accurate
                analysis.
              </Text>
            </View>
            <View className="items-center relative w-52 h-52 mt-6">
              {/* Frame */}
              <AnalysisFrame className="absolute w-full h-full" />
              <View className=" items-center mt-12 absolute w-28 h-28 ">
                <Face />
              </View>
            </View>
          </View>
         
          <View className="absolute bottom-0 w-[90%] px-6 pb-2">
            <Pressable
              onPress={handleTakePicture}
              className="items-center justify-center rounded-[10px] w-full h-[42px] bg-[#7AB2B2]"
            >
              <Text className="text-white">Analyze Skin Tone</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default analyzeSkinToneIntructions;
