import React from "react";
import { View, Image } from "react-native";

interface ChatAvatarProps {
  url: string;
  alt: string;
}

const ChatAvatar = ({ url, alt }: ChatAvatarProps) => {
  return (
    <View className="w-[45px] h-[45px] rounded-full overflow-hidden ml-2 justify-center items-center">
      <Image
        source={{ uri: url }}
        accessibilityLabel={alt}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    </View>
  );
};

export default ChatAvatar;
