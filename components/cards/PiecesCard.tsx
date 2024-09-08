import React from "react";
import { View, Text, ImageBackground } from "react-native";

interface CardProps {
  uri: string;
  name: string;
}

const PiecesCard: React.FC<CardProps> = ({ uri, name }) => {
  return (
    <View
      style={{ width: "30%", minWidth: 100, aspectRatio: 1 }}
      className="m-1"
    >
      <View className="w-full h-full rounded-[10px] overflow-hidden">
        <ImageBackground
          source={{
            uri: uri,
          }}
          className="w-full h-full justify-center items-center"
          resizeMode="cover"
        >
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
            className="w-full h-full absolute justify-center items-center"
          >
            <Text className="text-base text-white text-center">{name}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default PiecesCard;
