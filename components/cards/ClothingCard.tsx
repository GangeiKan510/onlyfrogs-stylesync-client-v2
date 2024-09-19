import React, { useState } from "react";
import { ImageBackground, ActivityIndicator, TouchableOpacity } from "react-native";

interface CardProps {
  uri: string;
  onPress: () => void;
}

const ClothingCard: React.FC<CardProps> = ({ uri, onPress }) => {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity onPress={onPress} className="w-[31%] min-w-[100px] aspect-square m-1 rounded-[10px]  bg-[#F3F3F3]">
      <ImageBackground
        source={{ uri: uri }}
        className="w-full h-full justify-center items-center"
        resizeMode="contain"
        onLoad={() => setLoading(false)}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color="#7AB2B2"
            className="absolute"
          /> 
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ClothingCard;
