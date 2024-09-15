import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { routes } from "@/utils/routes";
import WelcomeHero from "../assets/images/svg/welcome-hero.svg";

const Welcome = () => {
  const router = useRouter();

  const screenHeight = Dimensions.get("window").height;

  const textMarginBottom = screenHeight > 850 ? 72 : 52;

  console.log("New Token PR");
  return (
    <View className="flex-1 bg-white">
      <WelcomeHero className="absolute top-0 left-0 right-0 bottom-0 z-0" />
      <SafeAreaView className="flex-1 z-10 justify-between">
        <View
          className={`flex-1 justify-center items-center mb-${textMarginBottom}`}
        >
          <View className="items-center">
            <Text className="text-[48px] text-center font-logo">StyleSync</Text>
            <Text className="text-[16px] text-center">Style effortlessly.</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View className="px-8 pb-12">
          <Pressable
            onPress={() => router.push(routes.login as Href<string | object>)}
            className="bg-[#7ab2b2] rounded-[10px] h-[48px] flex justify-center items-center mb-3"
          >
            <Text className="text-white text-[16px]">Log in</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push(routes.register as Href<string | object>)
            }
            className="border rounded-[10px] h-[48px] flex justify-center items-center mb-2"
          >
            <Text className="text-[16px]">Sign up</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
