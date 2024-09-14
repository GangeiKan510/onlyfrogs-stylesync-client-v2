import { View, Text } from "react-native";
import React from "react";
import Header from "../common/Header";

const Result = () => {
  return (
    <View>
      <Header/>
      <View className="flex justify-center items-center mt-10">
      <Text className="text-2xl">Result</Text>
      </View>
    </View>
  );
};

export default Result;
