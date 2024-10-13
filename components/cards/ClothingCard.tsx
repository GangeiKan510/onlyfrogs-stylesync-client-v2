import React, { useState } from "react";
import {
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import DesignIcon from "../../assets/icons/tabs/design.svg";

interface CardProps {
  uri: string;
  onPress: () => void;
}

const ClothingCard: React.FC<CardProps> = ({ uri, onPress }) => {
  const [loading, setLoading] = useState(true);

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

        {/* "Worn" button anchored to the bottom-right of the card */}
        <TouchableOpacity>
          <View className="flex-row space-x-1 items-center absolute bg-tertiary rounded-br-[10px] rounded-tl-[10px] px-3 py-0.8 bottom-0 right-0">
            <DesignIcon width={12} color="white" />
            <Text className="text-white">worn</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

export default ClothingCard;
