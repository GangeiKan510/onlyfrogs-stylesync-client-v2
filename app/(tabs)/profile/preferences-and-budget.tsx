import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StyleSelection from "@/components/survey/preferences-and-budget-components/StyleSelection";
import FavColorSelection from "@/components/survey/preferences-and-budget-components/FavColorSelection";
import PreferredBrandSelection from "@/components/survey/preferences-and-budget-components/PreferredBrandsSelection";
import BudgetRange from "@/components/survey/preferences-and-budget-components/BudgetRange";
import Back from "../../../assets/icons/back-icon.svg";
import Spinner from "@/components/common/Spinner";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";

const PreferencesAndBudget = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-2 px-6 z-30 mt-8 mb-4">
        <TouchableOpacity
          onPress={() => router.push(routes.profile as Href<string | object>)}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Preferences and Budget
        </Text>
      </View>
      <ScrollView className="flex-1">
        <View className="mx-5">
          <Text className="text-[16px] font-bold mt-8 mb-2">
            Choose your preferred styles
          </Text>
          <StyleSelection />
          <Text className="text-[16px] font-bold mt-8 mb-2">
            Choose your preferred colors
          </Text>
          <FavColorSelection />
          <Text className="text-[16px] font-bold mt-8 mb-2">
            Choose yout preffered brands
          </Text>
          <PreferredBrandSelection />
          <Text className="text-[16px] font-bold mt-8 mb-2">
            Choose your preferred budget range
          </Text>
          <BudgetRange />
        </View>

        <View className="mt-auto py-2 w-full px-6">
          <TouchableOpacity
            className="flex items-center justify-center h-[42px] bg-[#7AB2B2] rounded-lg"
            // onPress={}
            disabled={loading}
          >
            {loading ? (
              <Spinner type="primary" />
            ) : (
              <Text className="text-white">Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesAndBudget;
