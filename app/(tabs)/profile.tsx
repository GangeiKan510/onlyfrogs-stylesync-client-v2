import { View, Text, Pressable, ScrollView } from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserIcon from "../../assets/icons/profile/user-icon.svg";
import CustomizeIcon from "../../assets/icons/profile/customize-icon.svg";
import UserSettingIcon from "../../assets/icons/profile/user-setting-icon.svg";
import SparkleIcon from "../../assets/icons/profile/sparkle-icon.svg";
import BodyTypeIcon from "../../assets/icons/profile/body-type-icon.svg";
import LogOutIcon from "../../assets/icons/profile/log-out-icon.svg";
import ArrowRightIcon from "../../assets/icons/profile/arrow-right-icon.svg";
import CheckmarkIcon from "../../assets/icons/profile/checkmark-icon.svg";
import ProfileImage from "@/components/profile/ProfileImageUpload";
import BackgroundImage from "@/components/profile/BackgroundImageUpload";

const Profile = () => {
  const [, setProfileImage] = useState<string | null>(null);
  const [, setBackgroundImage] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="bg-[#F2F2F2] w-full h-[150px]">
        <BackgroundImage setBackgroundImage={setBackgroundImage} />
      </View>
      <View className="items-center">
        <View className="items-center">
          <ProfileImage setProfileImage={setProfileImage} />
        </View>
        <View className="mt-16 items-center">
          <Text className="text-black font-bold text-[16px]">
            Dave Jhaeson Alivio
          </Text>
          <Text>deybalivio09@gmail.com </Text>
        </View>
        <Pressable className="flex-row bg-[#F2F2F2] h-[32px] w-[300px] rounded-[4px] mt-10 px-5 py-1 justify-between items-center">
          <View className="flex-row items-center">
            <CheckmarkIcon width={20} height={20} />
            <Text className="ml-5">Get Premium</Text>
          </View>
          <ArrowRightIcon width={15} height={15} />
        </Pressable>
      </View>

      <View className="w-full h-[4px] bg-[#F2F2F2] my-4" />

      {/* Account Settings */}
      <ScrollView>
        <View className="flex-grow ml-5 my-2 mr-16 fixed">
          <Text className="text-[#B7B7B7] font-bold text-[16px] ">
            Account Settings
          </Text>

          <View className="ml-2">
            <Pressable className="flex-row my-2 h-[32px] w-[280px] justify-between items-center">
              <View className="flex-row">
                <UserSettingIcon width={25.5} height={24.82} />
                <Text className=" font-medium text-[16px] ml-2 ">
                  Profile Settings
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} />
            </Pressable>

            <Pressable className="flex-row my-2 h-[32px] w-[280px] justify-between items-center">
              <View className="flex-row">
                <UserIcon width={20.5} height={20.5} />
                <Text className="font-medium text-[16px] ml-3">
                  Personal Information
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} />
            </Pressable>

            <Pressable className="flex-row my-2 h-[32px] w-[280px] justify-between items-center">
              <View className="flex-row">
                <CustomizeIcon width={20} height={20} />
                <Text className="font-medium text-[16px] ml-3">
                  Preferences and Budget
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} />
            </Pressable>

            <Pressable className="flex-row my-2 h-[32px] w-[280px] justify-between items-center">
              <View className="flex-row">
                <SparkleIcon width={25} height={25} />
                <Text className="font-medium text-[16px] ml-2">
                  Skin Tone Analysis
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} />
            </Pressable>

            <Pressable className="flex-row my-2 h-[32px] w-[280px] justify-between items-center">
              <View className="flex-row">
                <BodyTypeIcon width={20.63} height={25.97} />
                <Text className="font-medium text-[16px] ml-3">Body Type</Text>
              </View>
              <ArrowRightIcon width={15} height={15} />
            </Pressable>

            <Pressable className="flex-row my-2 h-[32px] w-[280px] justify-between items-center">
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
