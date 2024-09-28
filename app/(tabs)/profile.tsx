import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import UserIcon from "../../assets/icons/profile/user-icon.svg";
import CustomizeIcon from "../../assets/icons/profile/customize-icon.svg";
import UserSettingIcon from "../../assets/icons/profile/user-setting-icon.svg";
import SparkleIcon from "../../assets/icons/profile/sparkle-icon.svg";
import BodyTypeIcon from "../../assets/icons/profile/body-type-icon.svg";
import LogOutIcon from "../../assets/icons/profile/log-out-icon.svg";
import ArrowRightIcon from "../../assets/icons/profile/arrow-right-icon.svg";
import CheckmarkIcon from "../../assets/icons/profile/checkmark-icon.svg";
import { useRouter, Link } from "expo-router";
import type { Href } from "expo-router";
import { routes } from "@/utils/routes";
import NoProfileImg from "../../assets/icons/dave.svg";
import LockIcon from "../../assets/icons/profile/lock-icon.svg";
import CoverImg from "../../assets/icons/profile/cover-img.svg";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const router = useRouter();
  const { width} = Dimensions.get("window");

  return (
    <View className="flex bg-[#ffffff]">
      <View>
        <CoverImg width={width}/>
      </View>
      <View className="items-center">
        <View className="absolute z-10 bottom-32 rounded-full items-center justify-center overflow-hidden border-2 border-white">
          <NoProfileImg width={width * 0.3} height={width * 0.3} />
        </View>
        <View className="mt-16 items-center">
          <Text className="text-black font-bold text-[20px]">
            Dave Jhaeson Alivio
          </Text>
          <Text>deybalivio09@gmail.com </Text>
        </View>
        <Link push href={routes.subscription as Href<string | object>} asChild>
          <Pressable className="flex-row h-10 w-[95%] mt-8 px-5 justify-between items-center">
            <LinearGradient
              colors={["#7AB2B2", "#B088CD"]}
              start={[0, 0]}
              end={[1, 0]}
              style={{
                flexDirection: "row",
                height: "100%",
                width: "100%",
                borderRadius: 6,
                paddingHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View className="flex-row items-center w-[95%]">
                <CheckmarkIcon width={20} height={20} />
                <Text className="ml-4 text-white text-[16px] font-bold">
                  Get Premium
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="white" />
            </LinearGradient>
          </Pressable>
        </Link>
      </View>

      <View className="w-full h-[4px] bg-[#F2F2F2] my-6" />
      
      <View className="flex-col px-6 mt-1">
        <Text className="text-[#B7B7B7] font-bold text-[16px]">
          Account Settings
        </Text>

        <View className="px-2 mt-4">
          <Link
            push
            href={routes.profileSettings as Href<string | object>}
            asChild
          >
            <Pressable className="flex-row my-1 h-[32px] w-full justify-between items-center">
              <View className="flex-row">
                <UserSettingIcon width={25.5} height={24.82} />
                <Text className="font-medium text-[16px] ml-2">
                  Profile Settings
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="black" />
            </Pressable>
          </Link>

          <Link
            push
            href={routes.personalInformation as Href<string | object>}
            asChild
          >
            <Pressable className="flex-row my-1 h-[32px] w-full justify-between items-center">
              <View className="flex-row">
                <UserIcon width={20.5} height={20.5} />
                <Text className="font-medium text-[16px] ml-3">
                  Personal Information
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="black" />
            </Pressable>
          </Link>

          <Link
            push
            href={routes.preferencesAndBudget as Href<string | object>}
            asChild
          >
            <Pressable className="flex-row my-1 h-[32px] w-full justify-between items-center">
              <View className="flex-row">
                <CustomizeIcon width={20} height={20} />
                <Text className="font-medium text-[16px] ml-3">
                  Preferences and Budget
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="black" />
            </Pressable>
          </Link>

          <Link
            push
            href={routes.skinToneAnalysis as Href<string | object>}
            asChild
          >
            <Pressable className="flex-row my-1 h-[32px] w-full justify-between items-center">
              <View className="flex-row">
                <SparkleIcon width={24} height={25} />
                <Text className="font-medium text-[16px] ml-2">
                  Skin Tone Analysis
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="black" />
            </Pressable>
          </Link>

          <Link push href={routes.bodyType as Href<string | object>} asChild>
            <Pressable className="flex-row my-1 h-[32px] w-full justify-between items-center">
              <View className="flex-row">
                <BodyTypeIcon width={20.63} height={25.97} />
                <Text className="font-medium text-[16px] ml-3">Body Type</Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="black" />
            </Pressable>
          </Link>

          <Link
            push
            href={routes.resetPassword as Href<string | object>}
            asChild
          >
            <Pressable className="flex-row my-1 h-[32px] w-full justify-between items-center">
              <View className="flex-row">
                <LockIcon width={20} height={20} />
                <Text className="font-medium text-[16px] ml-3">
                  Change Password
                </Text>
              </View>
              <ArrowRightIcon width={15} height={15} color="black" />
            </Pressable>
          </Link>

          <Pressable
            onPress={() => router.push(routes.login as Href<string | object>)}
            className="flex-row my-1 h-[32px] w-full justify-between items-center"
          >
            <View className="flex-row">
              <LogOutIcon width={18.63} height={23.97} color="red" />
              <Text className="text-red font-medium text-[16px] ml-3">
                Log Out
              </Text>
            </View>
            <ArrowRightIcon width={15} height={15} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;
