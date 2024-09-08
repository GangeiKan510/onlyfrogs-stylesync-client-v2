import React from "react";
import { View, ImageBackground } from "react-native";

interface CardProps {
  uri: string;
}

const ClothingCard: React.FC<CardProps> = ({ uri }) => {
  return (
    <View className="w-[30%] max-w-[100px] aspect-square m-1 rounded-[10px] overflow-hidden bg-[#F3F3F3]">
      <ImageBackground
        source={{ uri: uri }}
        className="w-full h-full justify-center items-center"
        resizeMode="cover"
      />
    </View>
  );
};

export default ClothingCard;
