/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Text, View, Animated, Alert, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { usePathname } from "expo-router";
import Header from "../../../components/common/Header";
import { useUser } from "@/components/config/user-context";
import BackButton from "../../../components/buttons/BackButton";
import Fab from "../../../components/buttons/Fab";
import { getIdFromUrl } from "@/utils/helpers/get-closet-id";
import ClothingCard from "@/components/cards/ClothingCard";

const Page = () => {
  const { user } = useUser();
  const path = usePathname();
  const closetId = getIdFromUrl(path);
  const routeName = path.split("/")[1];
  const includeBack = ["closet"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleTakePicture = async () => {
    await requestCameraPermissions();

    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        handleCloseModal();
      }
    }
  };

  const handleUploadFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      if (selectedImages.length >= 10) {
        Alert.alert("Limit Reached", "You can only select up to 10 images.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset) => asset.uri);
        setSelectedImages((prevImages) =>
          [...prevImages, ...newImages].slice(0, 10)
        );
        handleCloseModal();
      }
    }
  };

  const handleLinkUpload = () => {
    handleCloseModal();
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerMarginBottom = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [30, -30],
    extrapolate: "clamp",
  });

  const currentCloset = user?.closets?.find((closet) => closet.id === closetId);

  const filteredClothes =
    user?.clothes?.filter((clothing) => clothing.closet_id === closetId) || [];

  return (
    <View className="flex-1 bg-white">
      <View className="mx-5">
        <View>
          <Header />
        </View>
        {includeBack.includes(routeName) && (
          <View className="relative z-0 mt-[-13%] ml-4 mb-7">
            <BackButton />
          </View>
        )}
        <Animated.View
          style={{
            opacity: headerOpacity,
            marginBottom: headerMarginBottom,
          }}
          className="items-center border-b pb-5 mx-5 border-[#F3F3F3]"
        >
          <Text className="text-xl font-bold text-center">
            {currentCloset?.name || "Closet Title"}
          </Text>
          <Text className="text-base">
            {currentCloset?.description || "Closet Description"}
          </Text>
        </Animated.View>
        {filteredClothes.length === 0 ? (
          <View className="items-center">
            <Text className="text-[#B7B7B7]">
              This closet has no clothes yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredClothes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ClothingCard uri={item.image_url} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginHorizontal: "auto",
            }}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
          />
        )}
      </View>
      <View className="absolute z-10 bottom-8 right-10">
        <Fab
          onCameraPress={handleTakePicture}
          onGalleryPress={handleUploadFromGallery}
          onLinkPress={handleLinkUpload}
        />
      </View>
    </View>
  );
};

export default Page;
