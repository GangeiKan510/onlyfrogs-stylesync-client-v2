import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import Spinner from "../common/Spinner";

interface CardProps {
  uri: string;
  name?: string;
}

const PiecesCard: React.FC<CardProps> = ({ uri, name }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View className="m-1 w-[30%] min-w-[100px] aspect-square rounded-[10px] bg-[#F3F3F3]">
      <View className="w-full h-full rounded-[10px] overflow-hidden">
        <ImageBackground
          source={{ uri }}
          className="w-full h-full justify-center items-center"
          resizeMode="cover"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        >
          {loading && <Spinner type={"primary"} />}

          {name && !loading && (
            <View
              style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
              className="w-full h-full absolute justify-center items-center"
            >
              <Text className="text-base text-white text-center">{name}</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default PiecesCard;
