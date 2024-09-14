import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/common/Header";
import StyleSelection from "./preferences-and-budget-components/StyleSelection";
import FavColorSelection from "./preferences-and-budget-components/FavColorSelection";

const PreferencesAndBudget = () => {
  return (
    <>
      <View className="">
        <Header />
      </View>
      <ScrollView>
        <View className="flex justify-center items-center mt-10">
          <Text className="text-2xl">Preferences & Budget</Text>
        </View>
        <View className="flex justify-start items-start mx-5 mt-10">
          <Text className="text-lg font-bold mb-2">
            Choose your preferred style
          </Text>
          <StyleSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-10">
          <Text className="text-lg font-bold mb-2">
            Choose your favorite color
          </Text>
          <FavColorSelection />
        </View>
      </ScrollView>
    </>
  );
};

export default PreferencesAndBudget;
