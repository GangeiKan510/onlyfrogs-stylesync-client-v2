import { View, Text } from "react-native";
import React from "react";
import Background from "../../assets/icons/profile/background.svg";
import Header from "@/components/common/Header";

const Notifications = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Background Image */}
      <View className="items-center">
        <Background />
      </View>
      <View className="absolute top-10 left-0 right-0 flex items-center z-10">
        <View className="items-center">
          <Header />
        </View>

        <View className="justify-center items-center px-8 mt-52">
          <Text className="text-4xl font-bold font-logo text-gray-800 mb-4">
            Coming Soon!
          </Text>
          <Text className="text-lg text-center text-gray-600 leading-6">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
