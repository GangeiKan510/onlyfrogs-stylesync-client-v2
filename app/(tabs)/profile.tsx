import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserIcon from "../../assets/icons/profile/user-icon.svg";
import CustomizeIcon from "../../assets/icons/profile/customize-icon.svg";
import UserSettingIcon from "../../assets/icons/profile/user-setting-icon.svg";
import SparkleIcon from "../../assets/icons/profile/sparkle-icon.svg";
import BodyTypeIcon from "../../assets/icons/profile/body-type-icon.svg";
import LogOutIcon from "../../assets/icons/profile/log-out-icon.svg";
import ArrowRightIcon from "../../assets/icons/profile/arrow-right-icon.svg";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask for permission to access the media library
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="bg-[#F2F2F2] flex-1 items-center w-[425px] h-36"></View>
      <View className="items-center">
        <View className="items-center">
          <Pressable onPress={pickImage} className="mt-10">
            <View className="flex-col h-[100px] w-[100px] rounded-full bg-[#F2F2F2] items-center justify-center">
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="h-full w-full"
                  style={{ resizeMode: "cover" }}
                />
              ) : (
                <Text>Upload Image</Text>
              )}
            </View>
          </Pressable>
          <View className="mt-5 items-center">
            <Text className="text-black font-bold text-[16px]">
              Dave Jhaeson Alivio
            </Text>
            <Text>deybalivio09@gmail.com </Text>
          </View>
          <Pressable className="bg-[#F2F2F2] h-[32px] w-[335px] rounded-[10px] mt-10 px-10 py-1">
            <Text> Verify Account </Text>
          </Pressable>
        </View>
      </View>

      {/* Account Settings */}
      <View className="flex-grow ml-5 my-10 mr-16 fixed">
        <Text className="text-[#B7B7B7] font-bold text-[16px] ">
          Account Settings
        </Text>

        <View className="ml-2">
          <Pressable className="flex-row my-2 w-full justify-between">
            <View className="flex-row">
              <UserSettingIcon width={25.5} height={24.82} />
              <Text className=" font-medium text-[16px] ml-2 ">
                Profile Settings
              </Text>
            </View>
            <ArrowRightIcon width={15} height={15} />
          </Pressable>

          <Pressable className="flex-row my-2 w-full justify-between ">
            <View className="flex-row">
              <UserIcon width={20.5} height={20.5} />
              <Text className="font-medium text-[16px] ml-3">
                Personal Information
              </Text>
            </View>
            <ArrowRightIcon width={15} height={15} />
          </Pressable>

          <Pressable className="flex-row my-2 w-full justify-between">
            <View className="flex-row">
              <CustomizeIcon width={20} height={20} />
              <Text className="font-medium text-[16px] ml-3">
                Preferences and Budget
              </Text>
            </View>
            <ArrowRightIcon width={15} height={15} />
          </Pressable>

          <Pressable className="flex-row my-2 w-full justify-between">
            <View className="flex-row">
              <SparkleIcon width={25} height={25} />
              <Text className="font-medium text-[16px] ml-2">
                Skin Tone Analysis
              </Text>
            </View>
            <ArrowRightIcon width={15} height={15} />
          </Pressable>

          <Pressable className="flex-row my-2 w-full justify-between">
            <View className="flex-row">
              <BodyTypeIcon width={20.63} height={25.97} />
              <Text className="font-medium text-[16px] ml-3">Body Type</Text>
            </View>
            <ArrowRightIcon width={15} height={15} />
          </Pressable>

          <Pressable className="flex-row my-2 w-full justify-between">
            <View className="flex-row">
              <LogOutIcon width={18.63} height={23.97} />
              <Text className="text-rose-600 font-medium text-[16px] font-medium ml-3">
                Log Out
              </Text>
            </View>
            <ArrowRightIcon width={15} height={15} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
