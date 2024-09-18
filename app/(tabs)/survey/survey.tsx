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

const Survey = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyzeComplete = () => {
    setAnalysisComplete(true);
    setIsAnalyzing(false);
  };

  const contentArray = [
    <Welcome />,
    <SkinToneAnalysis
      onAnalyzeComplete={handleAnalyzeComplete}
      setIsAnalyzing={setIsAnalyzing}
    />,
    <BodyType />,
    <PreferencesAndBudget />,
    <PersonalInformation />,
  ];

  const handleNext = () => {
    if (currentIndex < contentArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
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

      {/* Conditionally render the Continue Button */}
      {(currentIndex !== 1 || analysisComplete) && (
        <View className="flex justify-center items-center p-5">
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentIndex === contentArray.length - 1}
            className="flex items-center justify-center bg-bg-tertiary h-[42px] rounded-[10px] w-[346px]"
          >
            <Text className="text-white text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Survey;
