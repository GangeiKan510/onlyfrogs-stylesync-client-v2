import { View, Text } from "react-native";
import React from "react";
import Background from "../../assets/icons/profile/background.svg";
import Header from "@/components/common/Header";
import DesignPage from "../../components/design/designPage"

const Design = () => {
  return (
    <View className="flex-1 bg-white">
      <DesignPage/>
    </View>
  );
};

export default Design;
