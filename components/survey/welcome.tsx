import { View, Text } from "react-native";
import React from "react";

const Welcome = () => {
  return (
    <View>
      <View className="flex h-[75vh] justify-center items-center mt-10">
        <View className="w-[240px]">
          <Text className="text-[20px] text-center">👋</Text>
          <Text className="text-[20px] text-center font-bold">
            Welcome to your personal AI Fashion Stylist!
          </Text>
          <Text className="text-[16px] text-center text-gray">
            Let&apos;s get to know your style with a short survey.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
