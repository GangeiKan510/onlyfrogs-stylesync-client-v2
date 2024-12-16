import React from "react";
import { View, Text, Image, Pressable, Linking } from "react-native";
import Toast from "react-native-toast-message";
import SaveIcon from "../../assets/icons/save.svg";

interface ProductProps {
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  productUrl: string;
  brand: string;
}

const SuggestedProductCard: React.FC<ProductProps> = ({
  name,
  price,
  originalPrice,
  discount,
  image,
  productUrl,
  brand,
}) => {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show({
          type: "error",
          text1: "Unable to Open URL",
          text2: `Cannot open the link: ${url}`,
        });
      }
    } catch (error) {
      console.error("Error opening link:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong while opening the link.",
      });
    }
  };
  return (
    <Pressable
      className="flex flex-row border-[1.5px] border-tertiary rounded-lg p-4 mb-3"
      onPress={() => openLink(productUrl)}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-[70px] h-[70px] rounded-lg mr-4"
        />
      ) : (
        <View className="w-[70px] h-[70px] rounded-lg bg-gray-200 mr-4"></View>
      )}
      <View className="flex-1">
        <Text className="font-semibold text-tertiary mb-1">{name}</Text>
        <Text className="text-sm text-gray mb-1">by {brand}</Text>
        <Text className="font-bold text-green-500">{price}</Text>
        <Text className="text-sm text-green-300 line-through">
          {originalPrice}
        </Text>
        <View className="flex-row justify-between">
          <Text className="text-sm text-red">{discount}</Text>
          <SaveIcon />
        </View>
      </View>
    </Pressable>
  );
};

export default SuggestedProductCard;
