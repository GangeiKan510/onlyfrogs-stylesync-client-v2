import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

interface CardProps {
  name?: string;
  onPress?: () => void;
}

const ClothingCard: React.FC<CardProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "30%", minWidth: 100, aspectRatio: 1 }}
      className="m-1"
    >
      <View className="w-full h-full rounded-[10px] overflow-hidden">
        <ImageBackground
          source={{
            uri: "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square-300x300.jpg",
          }}
          className="w-full  h-full justify-center items-center"
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
    </TouchableOpacity>
  );
};

export default ClothingCard;
