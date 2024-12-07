import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message"; // Import Toast
import WelcomeHero from "../../../assets/images/svg/welcome-hero.svg";
import { useRouter } from "expo-router";
import Back from "../../../assets/icons/back-icon.svg";
import Check from "../../../assets/icons/profile/check.svg";
import Spinner from "@/components/common/Spinner";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("12 Months");
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your subscription has been saved successfully!",
        position: "top",
      });

      router.push("/(tabs)/profile/success");
    } catch (error) {
      console.error("Error saving subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save your subscription. Please try again.",
        position: "top",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF]">
      <View className=" absolute top-0 left-0 right-0 bottom-0 z-0 flex items-center opacity-50">
        <WelcomeHero className="w-[400px] h-[298px] mx-auto" />
      </View>

      <View className="absolute top-10 left-0 right-0 flex items-center justify-center z-10">
        <View className="w-full flex-row items-center top-2 px-6 z-30 mb-4">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            className="absolute left-6 z-40"
          >
            <Back width={20} height={20} />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-[20px] font-bold">
            Subscription
          </Text>
        </View>
        <Text className="text-center font-bold text-[24px] mt-20">
          Unlock Premium Features
        </Text>
        <Text className="text-center text-[16px] font-thin w-80">
          Enjoy full access to premium features and elevate your fashion
          experience to the next level.
        </Text>

        {/* Subscription Options */}
        <View className="flex-col mt-10 space-y-3">
          <View className="flex-row space-x-4 items-center">
            <Check className="flex-row" />
            <Text className="text-base text-[#484848]">
              Unlimited tokens for AI interactions
            </Text>
          </View>
          <View className="flex-row space-x-4 items-center">
            <Check className="flex-row" />
            <Text className="text-base text-[#484848]">
              Unlimited cloud storage
            </Text>
          </View>
          <View className="flex-row space-x-4 items-center">
            <Check className="flex-row" />
            <Text className="text-base text-[#484848]">
              Personalized shopping suggestions
            </Text>
          </View>
        </View>

        {/* Plan Selection */}
        <View className="items-center mt-14">
          {[
            { label: "12 Months", price: "₱2988.00 / mo" },
            { label: "3 Months", price: "₱747.00 / mo" },
            { label: "1 Month", price: "₱249.00 / mo" },
          ].map((plan) => (
            <Pressable
              key={plan.label}
              className={`h-[75px] w-[85%] ${
                selectedPlan === plan.label
                  ? "border-[#7AB2B2]"
                  : "border-[#B7B7B7]"
              } mt-5 flex-row items-center text-center border-[2px] rounded-[20px] justify-between p-6`}
              onPress={() => handleSelect(plan.label)}
            >
              <Text
                className={`text-center text-[16px] mt-1 ${
                  selectedPlan === plan.label
                    ? "text-[#000000]"
                    : "text-[#B7B7B7]"
                }`}
              >
                {plan.label}
              </Text>
              <Text
                className={`text-center text-[16px] mt-1 ${
                  selectedPlan === plan.label
                    ? "text-[#000000]"
                    : "text-[#B7B7B7]"
                }`}
              >
                {plan.price}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Save Button */}
      <View className="flex-1 justify-center items-center px-8">
        <TouchableOpacity
          className="justify-center items-center text-center h-[42px] w-full absolute bottom-4 bg-[#7AB2B2] rounded-[10px]"
          onPress={handleContinue}
          disabled={isSaving}
        >
          <View>
            {isSaving ? (
              <Spinner type={"primary"} />
            ) : (
              <Text className="text-[16px] text-white">Continue</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Toast Component */}
      <Toast />
    </SafeAreaView>
  );
};

export default Subscription;
