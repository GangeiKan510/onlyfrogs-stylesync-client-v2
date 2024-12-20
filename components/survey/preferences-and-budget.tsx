/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import StyleSelection from "./preferences-and-budget-components/StyleSelection";
import FavColorSelection from "./preferences-and-budget-components/FavColorSelection";
import PreferredBrandsSelection from "./preferences-and-budget-components/PreferredBrandsSelection";
import BudgetRange from "./preferences-and-budget-components/BudgetRange";
import { SafeAreaView } from "react-native-safe-area-context";

const PreferencesAndBudget = ({ setPreferences }: any) => {
  const [styles, setStyles] = useState<string[]>(["casual", "modern"]);
  const [colors, setColors] = useState<string[]>(["white", "cream"]);
  const [brands, setBrands] = useState<string[]>(["uniqlo"]);
  const [budget, setBudget] = useState({ min: 400, max: 1000 });

  useEffect(() => {
    setPreferences({
      preferred_style: styles,
      favourite_colors: colors,
      preferred_brands: brands,
      budget_range: budget,
    });
  }, [styles, colors, brands, budget]);

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
          <StyleSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-8">
          <Text className="font-bold mb-1">Choose your favorite colors</Text>
          <FavColorSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-8">
          <Text className="font-bold mb-1">Choose your preferred brands</Text>
          <PreferredBrandsSelection />
        </View>
        <View className="flex justify-start items-start mx-5 mt-8">
          <Text className="font-bold mb-1">
            Choose your preferred budget range
          </Text>
          <BudgetRange setBudget={setBudget} />
        </View>
      </ScrollView>
    </>
  );
};

export default PreferencesAndBudget;
