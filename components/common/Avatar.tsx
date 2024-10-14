import React, { useState } from "react";
import { View, Image } from "react-native";
import Spinner from "./Spinner";

interface AvatarProps {
  url: string;
  alt: string;
}

const Avatar = ({ url, alt }: AvatarProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <View className="w-[54px] h-[54px] rounded-full overflow-hidden border-2 border-tertiary">
      {loading && (
        <View className="absolute inset-0 flex items-center justify-center">
          <Spinner type="secondary" />
        </View>
      )}
      <Image
        source={{ uri: url }}
        accessibilityLabel={alt}
        className="w-full h-full object-cover"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
};

export default Avatar;
