import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NoProfileImg from "../../assets/icons/profile/no-profile-img.svg";
import CameraIcon from "../../assets/icons/profile/camera-icon.svg";
import BackButton from "@/components/buttons/BackButton";

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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

  const isFormValid = () => {
    return (
      firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== ""
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="absolute flex-1 mt-10 mx-10">
        <BackButton />
      </View>
      <View className="absolute top-10 left-0 right-0 flex items-center z-10">
        <Text className="flex-1 text-center font-medium text-[16px]">
          Profile Settings
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="items-center mt-16">
          <Pressable onPress={uploadProfileImage} className="absolute z-10">
            <View className="h-[130px] w-[130px] rounded-full bg-[#F2F2F2] items-center justify-center">
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

        <View className="mx-5 mt-40 flex-grow">
          <Text className="text-[14px] mx-2 text-[#B7B7B7]">First Name</Text>
          <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 mb-8 w-[95%] h-[40px] mx-auto">
            <TextInput
              placeholder="First Name"
              className="px-5 py-2 w-full h-full"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <Text className="text-[14px] mx-2 text-[#B7B7B7]">Last Name</Text>
          <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 mb-8 w-[95%] h-[40px] mx-auto">
            <TextInput
              placeholder="Last Name"
              className="px-5 py-2 w-full h-full"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <Text className="text-[14px] mx-2 text-[#B7B7B7]">Email</Text>
          <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 w-[95%] h-[40px] mx-auto">
            <TextInput
              placeholder="Email"
              className="px-5 py-2 w-full h-full"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="flex-row justify-between absolute bottom-5 left-0 right-0">
            <Pressable
              onPress={handleCancel}
              className="flex mx-2 bg-[#F9F9F9] rounded-[10px] border border-solid border-[#7AB2B2] w-[45%] h-[42px]"
            >
              <Text className="text-center text-[#7AB2B2] text-[16px] py-2">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              disabled={!isFormValid()} 
              className={`flex mr-2 bg-[#7AB2B2] rounded-[10px] w-[45%] h-[42px] ${isFormValid() ? "bg-[#7AB2B2]" : "bg-[#B7B7B7]"}`}
            >
              <Text className="text-center text-[#FFFFFF] text-[16px] py-2">
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileSettings;
