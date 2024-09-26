import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NoProfileImg from "../../assets/icons/profile/no-profile-img.svg";
import CameraIcon from "../../assets/icons/profile/camera-icon.svg";

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const uploadProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      Alert.alert(
        "Permission Required",
        "Permission to access the media library is required. Please enable it in settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Try Again",
            onPress: async () => {
              const newPermissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (newPermissionResult.granted) {
                launchImagePicker();
              } else {
                Alert.alert(
                  "Permission still denied. Please enable it in settings."
                );
              }
            },
          },
        ]
      );
      return;
    }

    if (status === "granted") {
      launchImagePicker();
    }
  };

  const launchImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
    }
  };

  const handleSave = () => {
    // Save the profile settings
  };

  const handleCancel = () => {
    // Cancel the profile settings
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className=" flex-1 justify-center mb-11">
        <Text className="text-center font-medium text-[16px]">
          Profile Settings
        </Text>
      </View>

      <View className="items-center flex-1 mt-4">
        <Pressable
          onPress={uploadProfileImage}
          className="absolute -bottom-[50px] z-10"
        >
          <View className=" h-[130px] w-[130px] rounded-full bg-[#F2F2F2] items-center justify-center ">
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="h-full w-full rounded-full"
                style={{ resizeMode: "cover" }}
              />
            ) : (
              <View>
                <NoProfileImg width={130} height={130} />
              </View>
            )}
            <View className="absolute right-0 bottom-0">
              <CameraIcon width={30} height={30} />
            </View>
          </View>
        </Pressable>
      </View>

      {/* First Name */}
      <View className=" flex mx-5 mt-20  ">
        <Text className="font-medium text-[14px] mb-2 text-[#B7B7B7]">
          First Name
        </Text>
        <TextInput className="items-center bg-[#F9F9F9] mx-auto w-[325px] h-[42px] rounded-[10px] px-5 border border-solid border-[#7AB2B2]" />
      </View>

      <View className=" flex mx-5 mt-10">
        <Text className="font-medium text-[14px] mb-2 text-[#B7B7B7]">
          Last Name
        </Text>
        <TextInput className="items-center bg-[#F9F9F9] mx-auto w-[325px] h-[42px] rounded-[10px] px-5 border border-solid border-[#7AB2B2]" />
      </View>

      <View className=" flex mx-5  mt-10">
        <Text className="font-medium text-[14px] mb-2 text-[#B7B7B7]">
          Email
        </Text>
        <TextInput className="items-center bg-[#F9F9F9] mx-auto w-[325px] h-[42px] rounded-[10px] px-5 border border-solid border-[#7AB2B2]" />
      </View>

      <View className="flex-row justify-between mx-auto mb-2 ">
        <Pressable
          onPress={handleCancel}
          className="flex mx-2 mt-40 bg-[#F9F9F9] rounded-[10px] border border-solid border-[#7AB2B2]"
        >
          <Text className="text-center text-[#7AB2B2] text-[16px]  w-[160px] h-[42px] py-2">
            Cancel
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          className=" bg-[#7AB2B2] mx-2 mt-40 ml-auto rounded-[10px] border border-solid border-[#7AB2B2] "
        >
          <Text className="text-center text-[16px] text-white  px-auto w-[160px] h-[42px] px-4 py-2 ">
            Save
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettings;
