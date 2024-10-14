import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import WelcomeHero from "../../../assets/images/svg/welcome-hero.svg";
import { routes } from "@/utils/routes";
import { Href, useRouter } from "expo-router";
import Back from "../../../assets/icons/back-icon.svg";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]">
      <View className=" absolute top-0 left-0 right-0 bottom-0 z-0 flex items-center  opacity-50">
        <WelcomeHero className="w-[400px] h-[298px] mx-auto" />
      </View>

      <View className="absolute top-10 left-0 right-0 flex items-center justify-center z-10">
        <View className="w-full flex-row items-center top-2 px-6 z-30 mb-4">
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
        <Text className="text-center font-semibold text-[24px] mt-20">
          Choose Your Plan
        </Text>
        <Text className="text-center text-[16px] text-[#5E5C5C] mt-1">
          Monthly or yearly? It’s your call
        </Text>

        <View className="items-center mt-32">
          <Pressable
            className={`h-[84px] w-[85%] flex-row border border-[2px] rounded-[20px] justify-between flex-row p-6 ${
              selectedPlan === "12 Months"
                ? "border-[#7AB2B2]"
                : "border-[#B7B7B7]"
            }`}
            onPress={() => handleSelect("12 Months")}
          >
            <Text
              className={`text-center text-[16px] mt-1 ${
                selectedPlan === "12 Months"
                  ? "text-[#000000]"
                  : "text-[#B7B7B7]"
              }`}
            >
              12 Months
            </Text>
            <Text
              className={`text-center text-[16px] mt-1 ${
                selectedPlan === "12 Months"
                  ? "text-[#000000]"
                  : "text-[#B7B7B7]"
              }`}
            >
              ₱2988.00 / mo
            </Text>
          </Pressable>
          <Pressable
            className={`h-[84px] w-[85%] mt-5 flex-row border border-[2px] rounded-[20px] justify-between flex-row p-6 ${
              selectedPlan === "3 Months"
                ? "border-[#7AB2B2]"
                : "border-[#B7B7B7]"
            }`}
            onPress={() => handleSelect("3 Months")}
          >
            <Text
              className={`text-center text-[16px] mt-1 ${
                selectedPlan === "3 Months"
                  ? "text-[#000000]"
                  : "text-[#B7B7B7]"
              }`}
            >
              3 Months
            </Text>
            <Text
              className={`text-center text-[16px] mt-1 ${
                selectedPlan === "3 Months"
                  ? "text-[#000000]"
                  : "text-[#B7B7B7]"
              }`}
            >
              ₱747.00 / mo
            </Text>
          </Pressable>
          <Pressable
            className={`h-[84px] w-[85%] mt-5 flex-row border border-[2px] rounded-[20px] justify-between flex-row p-6 ${
              selectedPlan === "1 Month"
                ? "border-[#7AB2B2]"
                : "border-[#B7B7B7]"
            }`}
            onPress={() => handleSelect("1 Month")}
          >
            <Text
              className={`text-center text-[16px] mt-1 ${
                selectedPlan === "1 Month" ? "text-[#000000]" : "text-[#B7B7B7]"
              }`}
            >
              1 Month
            </Text>
            <Text
              className={`text-center text-[16px] mt-1 ${
                selectedPlan === "1 Month" ? "text-[#000000]" : "text-[#B7B7B7]"
              }`}
            >
              ₱249.00 / mo
            </Text>
          </Pressable>
        </View>
        <Pressable className=" h-[42px] w-[85%] mt-10 bg-[#7AB2B2] rounded-[10px] items-center p-2 ">
          <Text className="text-[16px] text-white">Continue to Purchase</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Subscription;
