import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface FitsCardProps {
  fit: {
    id: string;
    name: string;
    thumbnail_url: string;
  };
  onPress: (fit: { id: string; name: string; thumbnail_url: string }) => void;
}

const FitsCard: React.FC<FitsCardProps> = ({ fit, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-1 m-1 bg-light-gray rounded-lg overflow-hidden items-center"
      onPress={() => onPress(fit)}
    >
      <Image
        source={{ uri: fit.thumbnail_url }}
        className="w-full aspect-square"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default FitsCard;
