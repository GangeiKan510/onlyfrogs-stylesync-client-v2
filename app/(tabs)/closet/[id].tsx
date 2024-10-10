/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { usePathname } from "expo-router";
import Header from "../../../components/common/Header";
import { useUser } from "@/components/config/user-context";
import BackButton from "../../../components/buttons/BackButton";
import Fab from "../../../components/buttons/Fab";
import { getIdFromUrl } from "@/utils/helpers/get-closet-id";
import ClothingCard from "@/components/cards/ClothingCard";
import { uploadClothing } from "@/network/web/clothes";
import ClothingDetailsModal from "@/components/dialogs/ClothingDetailsModal";
import LinkUploadModal from "@/components/dialogs/LinkUploadModal";
import Toast from "react-native-toast-message";

const Page = () => {
  const { user, refetchMe } = useUser();
  const path = usePathname();
  const closetId = getIdFromUrl(path);
  const routeName = path.split("/")[1];
  const includeBack = ["closet"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedClothingImage, setSelectedClothingImage] = useState<
    string | null
  >(null);
  const [selectedClothingId, setSelectedClothingId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

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

  const handleCloseLinkModal = () => {
    setIsLinkModalVisible(false); // Close link modal
  };

  const handleClothingClick = (id: string, imageUrl: string) => {
    setSelectedClothingImage(imageUrl);
    setSelectedClothingId(id);
    setIsModalVisible(true);
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
        const fileName = uri.split("/").pop();
        const formData = new FormData();

        try {
          setLoading(true); // Show loading screen
          formData.append("file", {
            uri: uri,
            name: fileName,
            type: "image/jpeg",
          } as any);

          if (user?.id) {
            formData.append("user_id", user.id);
          } else {
            console.error("User ID is missing");
            setLoading(false);
            return;
          }

          if (closetId) {
            formData.append("closet_id", closetId);
          } else {
            console.error("Closet ID is missing");
            setLoading(false);
            return;
          }

          const imageUploaded = await uploadClothing(formData);
          Toast.show({
            type: "success",
            text1: "Clothing sucessfully uploaded!",
            position: "top",
            swipeable: true,
          });
          refetchMe();
        } catch (error) {
          console.error("Error while uploading clothing:", error);
        } finally {
          setLoading(false);
        }

        handleCloseModal();
      }
    }
  };

  const handleUploadFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset) => asset.uri);
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);

        const uri = newImages[0];
        const fileName = uri.split("/").pop();
        const formData = new FormData();

        try {
          setLoading(true);
          formData.append("file", {
            uri: uri,
            name: fileName,
            type: "image/jpeg",
          } as any);
          formData.append("user_id", user?.id || "");
          formData.append("closet_id", closetId || "");
          await uploadClothing(formData);
          refetchMe();
        } catch (error) {
          console.error("Error while uploading clothing:", error);
        } finally {
          setLoading(false);
        }

        handleCloseModal();
      }
    }
  };

  const handleLinkUpload = async (link: string) => {
    const isValidImageLink = /\.(jpg|jpeg|png)(?=\?|$)/i.test(link);

    if (isValidImageLink) {
      const formData = new FormData();
      formData.append("file", {
        uri: link,
        name: link.split("/").pop(),
        type: "image/jpeg",
      } as any);
      formData.append("user_id", user?.id || "");
      formData.append("closet_id", closetId || "");

      try {
        setLoading(true);
        await uploadClothing(formData);
        Toast.show({
          type: "success",
          text1: "Link successfully uploaded!",
          position: "top",
          swipeable: true,
        });
        refetchMe();
      } catch (error) {
        console.error("Error while uploading clothing from link:", error);
      } finally {
        setLoading(false);
      }

      handleCloseLinkModal();
    } else {
      alert("Please enter a valid image URL with .jpg, .jpeg, or .png");
    }
  };

  const currentCloset = user?.closets?.find((closet) => closet.id === closetId);

  const filteredClothes =
    user?.clothes?.filter((clothing) => clothing.closet_id === closetId) || [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-5 flex-1">
        <View>
          <Header />
        </View>
        {includeBack.includes(routeName) && (
          <View className="relative z-0 mt-[-13%] ml-4 mb-7">
            <BackButton />
          </View>
        )}
        <View className="items-center border-b pb-5 border-[#F3F3F3]">
          <Text className="text-xl font-bold text-center">
            {currentCloset?.name || "Closet Title"}
          </Text>
          <Text className="text-base">
            {currentCloset?.description || "Closet Description"}
          </Text>
        </View>
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
            renderItem={({ item }) => (
              <ClothingCard
                uri={item.image_url}
                onPress={() => handleClothingClick(item.id, item.image_url)}
              />
            )}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 16 }}
            className="flex-grow"
          />
        )}
      </View>
      <View className="absolute z-10 bottom-8 right-10">
        <Fab
          loading={loading}
          onCameraPress={handleTakePicture}
          onGalleryPress={handleUploadFromGallery}
          onLinkPress={() => setIsLinkModalVisible(true)}
        />
      </View>

      <ClothingDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        clothingImage={selectedClothingImage}
        clothingId={selectedClothingId}
      />

      <LinkUploadModal
        isVisible={isLinkModalVisible}
        onClose={handleCloseLinkModal}
        onUpload={handleLinkUpload} // Pass upload handler
      />
    </SafeAreaView>
  );
};

export default Page;
