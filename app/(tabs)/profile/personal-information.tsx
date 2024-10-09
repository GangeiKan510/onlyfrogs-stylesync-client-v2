import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";
import Back from "../../../assets/icons/back-icon.svg";

function PersonalInformation() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-10 px-6 z-30">
        <TouchableOpacity
          onPress={() => router.push(routes.profile as Href<string | object>)}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Personal Information
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default PersonalInformation;
