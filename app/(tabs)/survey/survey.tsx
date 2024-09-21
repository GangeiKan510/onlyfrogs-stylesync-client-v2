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

const Survey = () => {
  const { user, refetchMe } = useUser();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const [skinToneAnalysisResult, setSkinToneAnalysisResult] =
    useState<SkinToneAnalysisResult | null>(null);
  const [bodyType, setBodyType] = useState("TypeA");
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
    location: null,
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

    try {
      await updateUser(surveyData);
      refetchMe();
      router.push(routes.tabs as Href<string | object>);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex < contentArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    router.push(routes.tabs as Href<string | object>);
  };

  return (
    <SafeAreaView className={`flex-1 pt-${insets.top} bg-white`}>
      <View className="flex-row justify-between items-center absolute top-12 w-full p-5 z-10">
        {/* Conditionally render the Back Button */}
        {currentIndex > 1 && currentIndex !== 2 && currentIndex !== 3 && (
          <TouchableOpacity onPress={handleBack} className="p-2">
            <BackIcon />
          </TouchableOpacity>
        )}

        {/* Conditionally render the Skip Button */}
        {currentIndex === 1 && !isAnalyzing && !analysisComplete && (
          <TouchableOpacity onPress={handleSkip} className="p-2 ml-auto">
            <Text className="text-bg-tertiary underline">Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content */}
      <View className="flex-1">{contentArray[currentIndex]}</View>

      {/* Conditionally render the Continue or Finish Button */}
      {(currentIndex !== 1 || analysisComplete) && (
        <View className="flex justify-center items-center p-5">
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentIndex === 1 && !analysisComplete}
            className="flex items-center justify-center bg-bg-tertiary h-[42px] rounded-[10px] w-[346px]"
          >
            <Text className="text-white text-center">
              {currentIndex === contentArray.length - 1 ? "Finish" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Survey;
