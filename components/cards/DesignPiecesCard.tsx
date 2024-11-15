import React, { useState, useEffect } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";

interface CardProps {
  uri: string;
  onPress: () => void;
  clothingId: string;
}

const ClothingCard: React.FC<CardProps> = ({ uri, onPress }) => {

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="w-[31%] min-w-[100px] aspect-square m-1 rounded-[10px] bg-[#F3F3F3]"
      >
        <ImageBackground
          source={{ uri: uri }}
          className="w-full h-full justify-center items-center"
          resizeMode="contain"
        >
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
};

export default ClothingCard;
