import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/common/Header";

const BodyType = () => {
  return (
    <View>
      <Header/>
      <View className="flex justify-center items-center mt-10">
      <Text className="text-2xl">Body Type</Text>
      </View>
    </View>
  );
};

export default BodyType;
