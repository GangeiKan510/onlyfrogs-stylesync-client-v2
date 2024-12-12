/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Href, usePathname, useRouter } from "expo-router";
import Header from "../../../components/common/Header";
import { useUser } from "@/components/config/user-context";
import BackButton from "../../../components/buttons/BackButton";
import { getIdFromUrl } from "@/utils/helpers/get-closet-id";
import ClothingCard from "@/components/cards/ClothingCard";
import { uploadClothing } from "@/network/web/clothes";
import { deleteCloset, updateCloset } from "@/network/web/closet";
import ClothingDetailsModal from "@/components/dialogs/ClothingDetailsModal";
import LinkUploadModal from "@/components/dialogs/LinkUploadModal";
import Toast from "react-native-toast-message";
import FloatingActionMenu from "@/components/buttons/FloatingActionMenu";
import DeleteIcon from "../../../assets/icons/delete-icon.svg";
import EditIcon from "../../../assets/icons/edit-icon.svg";
import ConfirmationModal from "@/components/dialogs/ConfirmationModal";
import { routes } from "@/utils/routes";
import EditClosetModal from "@/components/dialogs/EditClosetModal";

const Page = () => {
  const { user, refetchMe } = useUser();
  const router = useRouter();
  const path = usePathname();
  const closetId = getIdFromUrl(path);
  const routeName = path.split("/")[1];
  const includeBack = ["closet"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedClothingImage, setSelectedClothingImage] = useState<
    string | null
  >(null);
  const [selectedClothingId, setSelectedClothingId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false); // This controls the spinner and menu
  const [selectedClothingCount, setSelectedClothingCount] = useState<number>(0);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isDeletingCloset, setIsDeletingCloset] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  const handleCloseModal = () => {
    setSelectedClothingImage(null);
    setSelectedClothingId(null);
    setIsModalVisible(false);
  };

  const handleClothingClick = (id: string, imageUrl: string) => {
    const selectedClothing = filteredClothes.find((item) => item.id === id);

    const wornCount = selectedClothing?.worn?.[0]?.count ?? 0;

    setSelectedClothingImage(imageUrl);
    setSelectedClothingId(id);
    setSelectedClothingCount(wornCount);
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
          setLoading(true); // Disable the floating action menu
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

          console.log("Clothing Upload", formData);

          await uploadClothing(formData);
          Toast.show({
            type: "success",
            text1: "Clothing successfully uploaded!",
            position: "top",
            swipeable: true,
          });
          refetchMe();
        } catch (error) {
          console.error("Error while uploading clothing:", error);
          Toast.show({
            type: "error",
            text1: "Please upload a clothing item!",
            position: "top",
            swipeable: true,
          });
        } finally {
          setLoading(false); // Re-enable the floating action menu
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
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        const fileName = uri.split("/").pop();
        const formData = new FormData();

        try {
          setLoading(true); // Disable the floating action menu
          formData.append("file", {
            uri: uri,
            name: fileName,
            type: "image/jpeg",
          } as any);
          formData.append("user_id", user?.id || "");
          formData.append("closet_id", closetId || "");
          await uploadClothing(formData);
          Toast.show({
            type: "success",
            text1: "Image successfully uploaded!",
            position: "top",
            swipeable: true,
          });
          refetchMe();
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Please upload a clothing item!",
            position: "top",
            swipeable: true,
          });
          console.error("Error while uploading clothing:", error);
        } finally {
          setLoading(false); // Re-enable the floating action menu
        }

        handleCloseModal();
      }
    }
  };

  const handleEditCloset = async (name: string, description: string) => {
    setIsSaving(true);
    try {
      await updateCloset({ closetId, name, description });
      Toast.show({
        type: "success",
        text1: "Closet updated successfully!",
        position: "top",
      });
      setIsEditModalVisible(false);
      refetchMe();
    } catch (error) {
      console.error("Failed to update closet:", error);
      Toast.show({
        type: "error",
        text1: "Failed to update closet!",
        position: "top",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCloset = async () => {
    setIsDeletingCloset(true);
    try {
      await deleteCloset(closetId as string);

      Toast.show({
        type: "success",
        text1: "Closet deleted successfully!",
        position: "top",
        swipeable: true,
      });
      setIsConfirmationVisible(false);
      router.push(routes.closet as Href<string>);
      refetchMe();
    } catch (error: any) {
      console.error("Failed to delete closet:", error);
      Toast.show({
        type: "error",
        text1: "Failed to delete closet!",
        text2: error.message,
        position: "top",
        swipeable: true,
      });
    } finally {
      setIsDeletingCloset(false);
    }
  };

  const currentCloset = user?.closets?.find((closet) => closet.id === closetId);

  const filteredClothes =
    user?.clothes?.filter((clothing) => clothing.closet_id === closetId) || [];

  const actions = [
    {
      iconName: "camera",
      onPress: handleTakePicture,
      label: "",
    },
    {
      iconName: "picture",
      onPress: handleUploadFromGallery,
      label: "",
    },
    {
      iconName: "link",
      onPress: () => setIsLinkModalVisible(true),
      label: "",
    },
  ];

  console.log(currentCloset);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-5 flex-1">
        <View className="relative">
          <Header />
          <TouchableOpacity
            className="absolute right-1 top-[59px] z-10"
            onPress={() => setIsConfirmationVisible(true)}
          >
            <DeleteIcon width={23} height={23} color={"black"} />
          </TouchableOpacity>
        </View>
        {includeBack.includes(routeName) && (
          <View className="relative z-0 bottom-14">
            <BackButton />
          </View>
        )}
        <View className="items-center border-b pb-5 border-[#F3F3F3]">
          <View className="flex-row items-center">
            <Text className="text-xl font-bold text-center mr-2 ml-6">
              {currentCloset?.name || "Closet Title"}
            </Text>
            <TouchableOpacity
              className="z-10"
              onPress={() => setIsEditModalVisible(true)}
            >
              <EditIcon width={16} height={16} color={"#939393"} />
            </TouchableOpacity>
          </View>
          <Text className="text-base">{currentCloset?.description || ""}</Text>
        </View>
        {filteredClothes.length === 0 ? (
          <View className="items-center">
            <Text className="text-[#B7B7B7] mt-10">
              This closet has no clothes yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredClothes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ClothingCard
                clothingId={item.id}
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
      <FloatingActionMenu actions={actions as any} loading={loading} />
      <ClothingDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        clothingImage={selectedClothingImage}
        clothingId={selectedClothingId}
        wornCount={selectedClothingCount}
      />
      <LinkUploadModal
        closetId={closetId}
        isVisible={isLinkModalVisible}
        onClose={() => setIsLinkModalVisible(false)}
        onUpload={() => refetchMe()}
        userId={user?.id}
        setLoading={setLoading} // Pass setLoading to LinkUploadModal
      />
      <ConfirmationModal
        visible={isConfirmationVisible}
        onConfirm={handleDeleteCloset}
        onCancel={() => setIsConfirmationVisible(false)}
        message="Delete Closet"
        description="Are you sure you want to delete this closet? All clothes inside will also be deleted."
        isLoading={isDeletingCloset}
        type="primary"
        confirmMessage="Delete"
      />
      <EditClosetModal
        visible={isEditModalVisible}
        onConfirm={handleEditCloset}
        onCancel={() => setIsEditModalVisible(false)}
        initialName={currentCloset?.name || ""}
        initialDescription={currentCloset?.description || ""}
        isLoading={isSaving}
      />
    </SafeAreaView>
  );
};

export default Page;
