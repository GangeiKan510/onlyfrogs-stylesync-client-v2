import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import StyleSelection from "@/components/survey/preferences-and-budget-components/StyleSelection";
import FavColorSelection from "@/components/survey/preferences-and-budget-components/FavColorSelection";
import PreferredBrandSelection from "@/components/survey/preferences-and-budget-components/PreferredBrandsSelection";
import BudgetRange from "@/components/survey/preferences-and-budget-components/BudgetRange";
import Back from "../../../assets/icons/back-icon.svg";

const PreferencesAndBudget = () => {
  const navigation = useNavigation();
  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "profile" }],
      })
    );
  };
  
  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-[#FFFFFF]">
        <View className="w-full flex-row items-center top-2 px-6 z-30">
          <TouchableOpacity
            onPress={handleCancel}
            className="absolute left-6 z-40"
          >
            <Back width={20} height={20} />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-[20px] font-bold">
            Preferences and Buget
          </Text>
        </View>

        <View className="mx-5">
          <Text className="text-lg font-bold mt-5 mb-2">
            Choose your preferred styles
          </Text>
          <StyleSelection />
          <Text className="text-lg font-bold mt-5 mb-2">
            Choose your preferred colors
          </Text>
          <FavColorSelection />
          <Text className="text-lg font-bold mt-5 mb-2">
            Choose yout preffered brands
          </Text>
          <PreferredBrandSelection />
          <Text className="text-lg font-bold mt-5 mb-2">
            Choose your preferred budget range
          </Text>
          <BudgetRange />
        </View>

        <View className="flex-row justify-between mx-2 mb-4 ">
          <TouchableOpacity className="flex mx-2 mt-8 bg-[#F9F9F9] rounded-[10px] w-[160px] h-[42px] border border-solid border-[#7AB2B2]">
            <Text className="text-center text-[#7AB2B2] text-[16px] py-2">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className=" bg-[#7AB2B2] mx-2 mt-8 rounded-[10px] w-[160px] h-[42px] border border-solid border-[#7AB2B2]">
            <Text className="text-center text-[16px] text-white px-auto px-4 py-2">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PreferencesAndBudget;
