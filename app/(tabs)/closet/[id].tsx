import { Text, View, Animated, Alert } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useLocalSearchParams, usePathname } from "expo-router";
import Header from "../../../components/common/Header";
import ClothingCard from "../../../components/cards/ClothingCard";
import AddButton from "../../../components/buttons/AddButton";
import UploadClothingModal from "../../../components/dialogs/UploadClothingModal";
import BackButton from "../../../components/buttons/BackButton";

const Page = () => {
  const { id } = useLocalSearchParams();
  const path = usePathname();
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
    // Call the permissions request on component mount
    requestCameraPermissions();
  }, []);

  const handleOpenModal = () => {
    console.log("upload clothing");
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log("menu close");
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
        console.log("Photo taken:", uri);
        handleCloseModal();
      } else {
        console.log("Camera action canceled or no image captured");
      }
    } else {
      console.log("Camera permission denied");
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
        const newImages = result.assets.map(
          (asset: { uri: string }) => asset.uri
        );
        setSelectedImages((prevImages) =>
          [...prevImages, ...newImages].slice(0, 10)
        ); // Concatenate and limit to 10
        console.log("Images selected:", newImages);
        handleCloseModal();
      } else {
        console.log("No image selected");
      }
    } else {
      console.log("Media library permission denied");
    }
  };

  const handleLinkUpload = () => {
    console.log("Upload using Link");
    handleCloseModal();
    // logic to paste link
  };

  const clothingItems = new Array(20).fill(0);

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

  console.log(id);

  return (
    <View className="flex-1 bg-white">
      <View className="mt-14">
        <Header />
      </View>
      {includeBack.includes(routeName) && (
        <View className="relative z-0 mt-[-13%] ml-4 mb-11">
          <BackButton />
        </View>
      )}

      <Animated.View
        style={{
          opacity: headerOpacity,
          marginBottom: headerMarginBottom,
        }}
        className="items-center mb-1] border-[#F3F3F3]"
      >
        <Text className="text-xl font-bold text-center">Closet Title</Text>
        <Text className="text-base">Closet Description</Text>
      </Animated.View>

      <Animated.FlatList
        data={clothingItems}
        renderItem={() => <ClothingCard />}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={{
          marginLeft: 15,
        }}
        showsVerticalScrollIndicator={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
      <View className="absolute z-10 bottom-10 right-10">
        <AddButton onPress={handleOpenModal} isActive={isModalVisible} />
      </View>

      <UploadClothingModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onTakePicture={handleTakePicture}
        onUploadFromGallery={handleUploadFromGallery}
        onLinkUpload={handleLinkUpload}
      />
    </View>
  );
};

export default Page;
