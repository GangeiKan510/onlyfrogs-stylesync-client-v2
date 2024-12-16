import React, { useState } from "react";
import { View, Text, Image, Pressable, Linking } from "react-native";
import Toast from "react-native-toast-message";
import SaveIcon from "../../assets/icons/save.svg";
import { useUser } from "../config/user-context";
import ClosetSelectionModal from "../dialogs/ClosetSelectionModal";

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
  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSaveIconClick = () => {
    setIsModalVisible(true);
  };

  const handleModalSave = (selectedClosetId: string) => {
    console.log(`Saved to closet with ID: ${selectedClosetId}`);
    Toast.show({
      type: "success",
      text1: "Saved to Closet",
      text2: `Product saved to the selected closet successfully.`,
    });
    setIsModalVisible(false);
  };

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

  console.log("USER CLOSET", user?.closets);

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
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-red">{discount}</Text>
          <Pressable onPress={handleSaveIconClick}>
            <SaveIcon />
          </Pressable>
        </View>
      </View>

      <ClosetSelectionModal
        isVisible={isModalVisible}
        closets={user?.closets || []}
        onClose={() => setIsModalVisible(false)}
        onSave={handleModalSave}
      />
    </Pressable>
  );
};

export default SuggestedProductCard;
