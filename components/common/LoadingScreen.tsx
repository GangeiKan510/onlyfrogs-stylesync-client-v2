/* eslint-disable @typescript-eslint/no-require-imports */
import { Image, View, Text } from "react-native";
import React from "react";

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../../assets/gifs/loading.gif")}
        style={{ width: 112, height: 112 }}
      />
      <Text className="text-bg-tertiary">{message}</Text>
    </View>
  );
};

export default LoadingScreen;
