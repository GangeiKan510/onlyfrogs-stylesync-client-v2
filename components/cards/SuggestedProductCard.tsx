import React from "react";
import { View, Text, Image, Pressable } from "react-native";

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
  return (
    <Pressable
      className="flex flex-row border-[1.5px] border-gray-300 rounded-lg p-4 mb-3"
      onPress={() => {
        console.log(`Opening: ${productUrl}`);
      }}
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
        <Text className="font-semibold mb-1">{name}</Text>
        <Text className="text-sm text-gray-500 mb-1">{brand}</Text>
        <Text className="font-bold text-primary">{price}</Text>
        <Text className="text-sm text-gray-500 line-through">
          {originalPrice}
        </Text>
        <Text className="text-sm text-green-500">{discount}</Text>
      </View>
    </Pressable>
  );
};

export default SuggestedProductCard;
