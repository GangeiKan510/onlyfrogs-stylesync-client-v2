import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeHero from "../../../assets/images/svg/welcome-hero.svg";
import Success from "../../../assets/images/svg/success.svg";
import { routes } from "@/utils/routes";
import { Href, useRouter } from "expo-router";

function SuccessScreen() {
    const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFFFF] items-center">
      <WelcomeHero className="w-[400px] h-[298px] mx-auto" />
      <View className="flex-1 items-center mt-[-15]">
        <Success className="w-[400px] h-[298px]" />
        <Text className="text-center text-[16px] text-[#5E5C5C] mt-14">
          Begin Your
        </Text>
        <Text className="text-center font-semibold text-[24px] mt-1">
          StyleSync Journey Today!
        </Text>
      </View>
      <View className="flex-1 justify-center items-center px-8">
        <TouchableOpacity className="justify-center items-center text-center h-[42px] w-full absolute bottom-4 bg-[#7AB2B2] rounded-[10px]"
          onPress={() =>  router.push("/(tabs)/profile")}
          >
          <Text className="text-[16px] text-white">OK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SuccessScreen;
