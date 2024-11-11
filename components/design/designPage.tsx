import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/common/Header";

const DesignPage = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="">
        <Header />
        <Text className="text-[14px] font-bold font-logo text-gray-800 text-center mt-4">
          Create your own outfit
        </Text>
        <View className="items-center">
          <View className="w-80 h-56 bg-[#EFEFEF] mt-6 rounded-xl"></View>
        </View>
      </View>
    </View>
  );
};

export default DesignPage;
