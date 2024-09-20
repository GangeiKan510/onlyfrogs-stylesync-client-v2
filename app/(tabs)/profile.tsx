import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserIcon from "../../assets/icons/profile/user-icon.svg";
import CustomizeIcon from "../../assets/icons/profile/customize-icon.svg";
import UserSettingIcon from "../../assets/icons/profile/user-setting-icon.svg";
import SparkleIcon from "../../assets/icons/profile/sparkle-icon.svg";
import BodyTypeIcon from "../../assets/icons/profile/body-type-icon.svg";
import LogOutIcon from "../../assets/icons/profile/log-out-icon.svg";

const Profile = () => {


  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="bg-[#F2F2F2] flex-1 items-center w-[425px] h-36">
      </View>
      <View className="items-center">
        <Text className="text-[20px] font-bold">Profile</Text>

        <View className="flex-col items-center mt-40">
          <Text className="text-black font-bold text-[16px]">
            Dave Jhaeson Alivio
          </Text>
          <Text>deybalivio09@gmail.com </Text>
        </View>
        <Pressable className="bg-[#F2F2F2] h-[32px] w-[335px] rounded-[10px] mt-10 px-10 py-1">
          <Text> Verify Account </Text>
        </Pressable>
      </View>

      <View className="flex-grow ml-5 my-10 mr-16 fixed">
        <Text className="text-[#B7B7B7] font-bold text-[16px] ">
          Account Settings
        </Text>
        <View className="ml-2">
          <Pressable className="flex-row my-2">
            <UserSettingIcon width={25.5} height={24.82} />
            <Text className=" font-medium text-[16px] ml-2">
              Profile Settings
            </Text>
          </Pressable>

          <Pressable className="flex-row my-2">
            <UserIcon width={20.5} height={20.5} />
            <Text className="font-medium text-[16px] ml-3">
              Personal Information
            </Text>
          </Pressable>

          <Pressable className="flex-row my-2">
            <CustomizeIcon width={20} height={20} />
            <Text className="font-medium text-[16px] ml-3">
              Preferences and Budget
            </Text>
          </Pressable>

          <Pressable className="flex-row my-2">
            <SparkleIcon width={25} height={25} />
            <Text className="font-medium text-[16px] ml-2">
              Skin Tone Analysis
            </Text>
          </Pressable>

          <Pressable className="flex-row my-2">
            <BodyTypeIcon width={20.63} height={25.97} />
            <Text className="font-medium text-[16px] ml-3">Body Type</Text>
          </Pressable>

          <Pressable className="flex-row my-2">
            <LogOutIcon width={18.63} height={23.97} />
            <Text className="text-rose-600 font-bold text-[16px] font-medium ml-3">
              Log Out
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
