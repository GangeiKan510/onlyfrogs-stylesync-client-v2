import React, { useState } from "react";
import { View, Image } from "react-native";
import Spinner from "./Spinner";
import NoProfileImage from "../../assets/icons/profile/no-profile-img.svg";

interface AvatarProps {
  url: string;
  alt: string;
}

const Avatar = ({ url, alt }: AvatarProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <View className="w-[54px] h-[54px] flex items-center justify-center rounded-full overflow-hidden border-2 border-tertiary">
      {loading && (
        <View className="absolute inset-0 flex items-center justify-center">
          <Spinner type="secondary" />
        </View>
      )}
      {url ? (
        <Image
          source={{ uri: url }}
          accessibilityLabel={alt}
          className="w-full h-full object-cover"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      ) : (
        <NoProfileImage width="100%" height="100%" />
      )}
    </View>
  );
};

export default Avatar;
