import React from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import StyleSelection from "@/components/survey/preferences-and-budget-components/StyleSelection";
import FavColorSelection from "@/components/survey/preferences-and-budget-components/FavColorSelection";
import PreferredBrandSelection from "@/components/survey/preferences-and-budget-components/PreferredBrandsSelection";
import BudgetRange from "@/components/survey/preferences-and-budget-components/BudgetRange";

const PreferencesAndBudget = () => {
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 g-[#FFFFFF]">
        <View className="flex mt-10 items-center">
          <Text className=" text-[20px]">Preferences & Budget</Text>
        </View>

        <View className="mx-5">
          <Text className="text-lg font-bold mt-5 mb-2">
            Choose your preferred styles
          </Text>
          <StyleSelection />
          <Text className="text-lg font-bold mt-5 mb-2">
            Favorite Color
          </Text>
          <FavColorSelection />
          <Text className="text-lg font-bold mt-5 mb-2">
            Preffered Brands
          </Text>
          <PreferredBrandSelection />
          <Text className="text-lg font-bold mt-5 mb-2">
            Budget
          </Text>
          <BudgetRange />
        </View>

        <View className="flex-row justify-between mx-2 mb-4 ">
          <Pressable className="flex mx-2 mt-8 bg-[#F9F9F9] rounded-[10px] w-[160px] h-[42px] border border-solid border-[#7AB2B2]">
            <Text className="text-center text-[#7AB2B2] text-[16px] py-2">Cancel</Text>
          </Pressable>

          <Pressable className=" bg-[#7AB2B2] mx-2 mt-8 rounded-[10px] w-[160px] h-[42px] border border-solid border-[#7AB2B2]">
            <Text className="text-center text-[16px] text-white px-auto px-4 py-2">
              Save
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PreferencesAndBudget;
