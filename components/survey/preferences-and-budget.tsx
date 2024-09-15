import { View, Text, ScrollView } from "react-native";
import React from "react";
import StyleSelection from "./preferences-and-budget-components/StyleSelection";
import FavColorSelection from "./preferences-and-budget-components/FavColorSelection";
import PreferredBrandsSelection from "./preferences-and-budget-components/PreferredBrandsSelection";
import BudgetRange from "./preferences-and-budget-components/BudgetRange";

const PreferencesAndBudget = () => {
  return (
    <>
      <View className="flex justify-center items-center mt-10 mb-10">
        <Text className="text-[20px]">Preferences & Budget</Text>
      </View>
      <ScrollView>
        <View className="flex justify-start items-start mx-5">
          <Text className="text-lg font-bold mb-2">
            Choose your preferred styles
          </Text>
          <StyleSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-10">
          <Text className="text-lg font-bold mb-2">
            Choose your favorite colors
          </Text>
          <FavColorSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-10">
          <Text className="text-lg font-bold mb-2">
            Choose your preferred brands
          </Text>
          <PreferredBrandsSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-10">
          <Text className="text-lg font-bold mb-2">Budget</Text>
          <BudgetRange />
        </View>
      </ScrollView>
    </>
  );
};

export default PreferencesAndBudget;
