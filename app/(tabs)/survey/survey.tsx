/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BodyType from "@/components/survey/body-type";
import PersonalInformation from "@/components/survey/personal-information";
import PreferencesAndBudget from "@/components/survey/preferences-and-budget";
import SkinToneAnalysis from "@/components/survey/skin-tone-analysis";
import Welcome from "@/components/survey/welcome";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";
import BackIcon from "../../../assets/icons/back-icon.svg";
import { updateUser } from "@/network/web/user";
import { useUser } from "@/components/config/user-context";
import {
  UpdateUserData,
  PersonalInfo,
  SkinToneAnalysisResult,
  Preferences,
} from "@/utils/types/UpdateUser";
import Spinner from "@/components/common/Spinner";
import Toast from "react-native-toast-message";

const Survey = () => {
  const { user, refetchMe } = useUser();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const [skinToneAnalysisResult, setSkinToneAnalysisResult] =
    useState<SkinToneAnalysisResult | null>(null);
  const [bodyType, setBodyType] = useState("NeatHourGlass");
  const [preferences, setPreferences] = useState<Preferences>({
    preferred_style: [],
    favourite_colors: [],
    preferred_brands: [],
    budget_range: { min: 0, max: 0 },
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    gender: "",
    birthday: "",
    height_cm: 0,
    weight_kg: 0,
    location: {
      name: "",
      lat: "",
      lon: "",
    },
  });

  const handleAnalyzeComplete = () => {
    setAnalysisComplete(true);
    setIsAnalyzing(false);
  };

  const contentArray = [
    <Welcome />,
    <SkinToneAnalysis
      onAnalyzeComplete={handleAnalyzeComplete}
      setIsAnalyzing={setIsAnalyzing}
      setSkinToneAnalysisResult={setSkinToneAnalysisResult}
    />,
    <BodyType setBodyType={setBodyType} />,
    <PreferencesAndBudget setPreferences={setPreferences} />,
    <PersonalInformation setPersonalInfo={setPersonalInfo} />,
  ];

  const handleFinish = async () => {
    const surveyData: UpdateUserData = {
      id: user?.id as string,
      birth_date: personalInfo.birthday,
      gender: personalInfo.gender,
      height_cm: personalInfo.height_cm,
      weight_kg: personalInfo.weight_kg,
      location: personalInfo.location,
      skin_tone_classification: skinToneAnalysisResult?.skin_tone,
      season: skinToneAnalysisResult?.season,
      sub_season: skinToneAnalysisResult?.sub_season,
      skin_tone_complements: skinToneAnalysisResult?.complements,
      body_type: bodyType,
      preferred_style: preferences.preferred_style,
      favourite_colors: preferences.favourite_colors,
      preferred_brands: preferences.preferred_brands,
      budget_min: preferences.budget_range?.min,
      budget_max: preferences.budget_range?.max,
    };

    Toast.show({
      type: "success",
      text1: "Successfully finished survey!",
      position: "top",
      swipeable: true,
    });

    try {
      setLoading(true);
      await updateUser(surveyData);
      refetchMe();
      router.push(routes.tabs as Href<string | object>);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < contentArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };


  const isBodyTypeSelected = bodyType !== "NeatHourglass";
  const isPersonalInfoComplete =
  personalInfo.gender &&
  personalInfo.birthday &&
  personalInfo.height_cm > 0 &&
  personalInfo.weight_kg > 0;

  return (
    <SafeAreaView className={`flex-1 pt-${insets.top} bg-white`}>

      {/* Main Content */}
      <View className="flex-1">{contentArray[currentIndex]}</View>

      {/* Conditionally render the Continue or Finish Button */}
      {(currentIndex !== 1 || analysisComplete) && (
        <View className="flex justify-center items-center p-5">
          <TouchableOpacity
            onPress={handleNext}
            disabled={
              (currentIndex === 2 && !isBodyTypeSelected) ||
              (currentIndex === 4 && !isPersonalInfoComplete) ||
              loading
            }
            className={`flex items-center justify-center h-[42px] rounded-[10px] w-[346px] ${
              (currentIndex === 2 && !isBodyTypeSelected) ||
              (currentIndex === 4 && !isPersonalInfoComplete) || 
              loading
                ? "bg-[#9fcccc]"
                : "bg-bg-tertiary"
            }`}
          >
            {loading ? (
              <Spinner type={"primary"} />
            ) : (
              <Text className="text-white text-center">
                {currentIndex === contentArray.length - 1
                  ? "Finish"
                  : "Next"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Survey;
