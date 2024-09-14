/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BodyType from "@/components/survey/body-type";
import PersonalInformation from "@/components/survey/personal-information";
import PreferencesAndBudget from "@/components/survey/preferences-and-budget";
import Result from "@/components/survey/result";
import SkinToneAnalysis from "@/components/survey/skin-tone-analysis";
import Welcome from "@/components/survey/welcome";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";

const Survey = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const contentArray = [
    <Welcome />,
    <SkinToneAnalysis />,
    <Result />,
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
    <SafeAreaView className="flex-1" style={{ paddingTop: insets.top }}>
      {/* Skip Button */}
      <View className="absolute top-0 right-0 p-5">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-blue-500">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center">
        {contentArray[currentIndex]}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between p-5">
        <Button
          title="Back"
          onPress={handleBack}
          disabled={currentIndex === 0}
        />
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentIndex === contentArray.length - 1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Survey;
