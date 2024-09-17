import React, { useState } from "react";
import { View, ImageBackground, ActivityIndicator } from "react-native";

interface CardProps {
  uri: string;
}

const ClothingCard: React.FC<CardProps> = ({ uri }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View className="w-[30%] min-w-[100px] aspect-square m-1 rounded-[10px] overflow-hidden bg-[#F3F3F3]">
      <ImageBackground
        source={{ uri: uri }}
        className="w-full h-full justify-center items-center"
        resizeMode="cover"
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
    </View>
  );
};

export default ClothingCard;
