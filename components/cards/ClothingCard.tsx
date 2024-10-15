import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View, Text } from "react-native";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import { updateWornDate } from "@/network/web/clothes";
import Toast from "react-native-toast-message";
import Spinner from "../common/Spinner"; // Importing the Spinner component

interface CardProps {
  uri: string;
  onPress: () => void;
  clothingId: string;
}

const ClothingCard: React.FC<CardProps> = ({ uri, onPress, clothingId }) => {
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleWornClick = async () => {
    try {
      setIsUpdating(true);
      await updateWornDate(clothingId);
      Toast.show({
        type: "success",
        text1: "Worn date updated",
        text2: "The worn date has been updated successfully.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update worn date. Please try again.",
      });
      console.error("Error updating worn date", error);
    } finally {
      setIsUpdating(false);
    }
  };

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
          {loading && <Spinner type="primary" />}
        </ImageBackground>

        {/* "Worn" button anchored to the bottom-right of the card */}
        <TouchableOpacity onPress={handleWornClick} disabled={isUpdating}>
          <View className="flex-row space-x-1 items-center absolute bg-tertiary rounded-br-[10px] rounded-tl-[10px] px-3 py-0.8 bottom-0 right-0">
            {isUpdating ? (
              <Spinner type="primary" />
            ) : (
              <>
                <DesignIcon width={12} color="white" />
                <Text className="text-white">Worn</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

export default ClothingCard;
