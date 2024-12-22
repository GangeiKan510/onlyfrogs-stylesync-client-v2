/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import StyleSelection from "./preferences-and-budget-components/StyleSelection";
import FavColorSelection from "./preferences-and-budget-components/FavColorSelection";
import PreferredBrandsSelection from "./preferences-and-budget-components/PreferredBrandsSelection";
import BudgetRange from "./preferences-and-budget-components/BudgetRange";
import { SafeAreaView } from "react-native-safe-area-context";

const PreferencesAndBudget = ({ preferences, setPreferences }: any) => {
  const handleStylesChange = (styles: string[]) => {
    setPreferences((prev: any) => ({ ...prev, preferred_style: styles }));
  };

  const handleColorsChange = (colors: string[]) => {
    setPreferences((prev: any) => ({ ...prev, favorite_colors: colors }));
  };

  const handleBrandsChange = (brands: string[]) => {
    setPreferences((prev: any) => ({ ...prev, preferred_brands: brands }));
  };

  const handleBudgetChange = (budget: { min: number; max: number }) => {
    setPreferences((prev: any) => ({ ...prev, budget_range: budget }));
  };

  return (
    <>
      <View className="flex justify-center items-center mt-10 mb-10">
        <Text className="text-center text-[20px] font-bold">
          Preferences & Budget
        </Text>
      </View>
      <ScrollView>
        <View className="flex justify-start items-start mx-5">
          <Text className="font-bold mb-1">Choose your preferred styles</Text>
          <StyleSelection
            selectedStyles={preferences?.preferred_style}
            onStylesChange={handleStylesChange}
          />
        </View>
        <View className="flex justify-start items-start mx-5 mt-8">
          <Text className="font-bold mb-1">Choose your favorite colors</Text>
          <FavColorSelection
            selectedColors={preferences?.favorite_colors}
            onColorsChange={handleColorsChange}
          />
        </View>
        <View className="flex justify-start items-start mx-5 mt-8">
          <Text className="font-bold mb-1">Choose your preferred brands</Text>
          <PreferredBrandsSelection
            selectedBrands={preferences?.preferred_brands}
            onBrandsChange={handleBrandsChange}
          />
        </View>
        <View className="flex justify-start items-start mx-5 mt-8">
          <Text className="font-bold mb-1">
            Choose your preferred budget range
          </Text>
          <BudgetRange
            budgetRange={preferences?.budget_range}
            onBudgetChange={handleBudgetChange}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PreferencesAndBudget;
