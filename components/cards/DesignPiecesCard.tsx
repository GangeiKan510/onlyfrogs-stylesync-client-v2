import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";

interface CardProps {
  uri: string;
  onPress: (clothingId: string, imageUrl: string) => void; 
  clothingId: string;
  selected: boolean;
}

const ClothingCard: React.FC<CardProps> = ({ uri, onPress, clothingId, selected  }) => {
  // const [selected, setSelected] = useState(false);

  const handlePress = () => {
    onPress(clothingId, uri); // Pass the arguments to onPress
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-[31%] min-w-[100px] aspect-square m-1 rounded-[10px] bg-[#F3F3F3]"
    >
      <View className="relative">
        <ImageBackground
          source={{ uri: uri }}
          className="w-full h-full justify-center items-center"
          resizeMode="contain"
        >
          <View
            className={`absolute top-2 right-2 w-4 h-4 rounded-full border-[1px] ${
              selected ? "border-[1px] border-[#7AB2B2] bg-white" : "border-[#7AB2B2] bg-transparent"
            } justify-center items-center`}
          >
            {selected && <View className="w-3 h-3 rounded-full bg-[#7AB2B2]" />}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};


export default ClothingCard;
