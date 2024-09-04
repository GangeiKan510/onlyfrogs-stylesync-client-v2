import React from "react";
import { View, Image } from "react-native";

interface AvatarProps {
  url: string;
  alt: string;
}

const Avatar = ({ url, alt }: AvatarProps) => {
  return (
    <View className="w-[54px] h-[54px] rounded-full overflow-hidden border-2 border-gray-200">
      <Image
        source={{ uri: url }}
        accessibilityLabel={alt}
        className="w-full h-full object-cover"
      />
    </View>
  );
};

export default Avatar;
