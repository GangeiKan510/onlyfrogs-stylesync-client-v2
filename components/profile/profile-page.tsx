import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import useSignOut from "@/network/firebase/sign-out";
import { auth } from "@/firebaseConfig";
import { useUser } from "../config/user-context";
import { SafeAreaView } from "react-native-safe-area-context";
import UserIcon from "../../assets/icons/profile/user-icon.svg";
import CustomizeIcon from "../../assets/icons/profile/customize-icon.svg";
import UserSettingIcon from "../../assets/icons/profile/user-setting-icon.svg";
import SparkleIcon from "../../assets/icons/profile/sparkle-icon.svg";
import BodyTypeIcon from "../../assets/icons/profile/body-type-icon.svg";
import LogOutIcon from "../../assets/icons/profile/log-out-icon.svg";
import ArrowRightIcon from "../../assets/icons/profile/arrow-right-icon.svg";
import CheckmarkIcon from "../../assets/icons/profile/checkmark-icon.svg";
import { useRouter } from "expo-router";
import type { Href } from "expo-router";
import { routes } from "@/utils/routes";
import NoProfileImg from "../../assets/icons/profile/no-profile-img.svg";
import CoverImg from "../../assets/icons/profile/cover-img.svg";
import { LinearGradient } from "expo-linear-gradient";
import ConfirmationModal from "../dialogs/ConfirmationModal";

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [signOut, loading] = useSignOut(auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  const handleClick = (route: string) => {
    if (!clicked) {
      setClicked(true);
      router.push(route as Href<string>);
      setTimeout(() => setClicked(false), 300);
    }
  };
  

  const handleLogout = async () => {
    setModalVisible(false);

    const isSignoutSuccessful = await signOut();

    if (isSignoutSuccessful) {
      router.replace(routes.login as Href<string | object>);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="flex-1">
        <ScrollView>
          <View>
            <CoverImg />
          </View>
          <View className="items-center">
            <View className="absolute z-10 bottom-32 rounded-full items-center justify-center overflow-hidden border-2 border-tertiary">
              {user?.profile_url ? (
                <View>
                  {imageLoading && (
                    <View className="absolute inset-0 items-center justify-center">
                      <ActivityIndicator size="small" color="#000" />
                    </View>
                  )}
                  <Image
                    source={{ uri: user.profile_url }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                </View>
              ) : (
                <NoProfileImg width={100} height={100} />
              )}
            </View>

            <View className="mt-12 items-center">
              <View className="flex-row gap-1 items-center">
                <Text className="text-[#484848] font-bold text-[16px]">
                  {user?.first_name && user?.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : "Guest"}
                </Text>
              </View>
              <Text className="text-[#B7B7B7]">{user?.email}</Text>
            </View>

            <View>
              <TouchableOpacity
                className="flex-row h-10 w-96 mt-10 px-5 justify-between items-center"
                onPress={() => handleClick("/(tabs)/profile/subscription")}
              >
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
                  <View className="flex-row items-center">
                    <CheckmarkIcon width={20} height={20} />
                    <Text className="ml-4 text-white text-[16px] font-bold">
                      Get Premium
                    </Text>
                  </View>
                  <ArrowRightIcon width={15} height={15} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full h-[2px] bg-[#F2F2F2] my-4" />

          <View className="px-6 mt-1">
            <Text className="text-[#B7B7B7] text-[16px] ml-2">
              Account Settings
            </Text>

            <View className="px-2 mt-4">
              <TouchableOpacity
                className="flex-row my-2 h-[32px] w-full justify-between items-center"
                onPress={() =>
                  handleClick("/(tabs)/profile/profile-settings")
                }
              >
                <View className="flex-row items-center">
                  <UserSettingIcon width={24} height={24} />
                  <Text className="font-medium text-[16px] ml-2">
                    Profile Settings
                  </Text>
                </View>
                <ArrowRightIcon width={15} height={15} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row my-2 h-[32px] w-full justify-between items-center"
                onPress={() =>
                  handleClick("/(tabs)/profile/personal-information")
                }
              >
                <View className="flex-row items-center">
                  <UserIcon width={24} height={24} />
                  <Text className="font-medium text-[16px] ml-2">
                    Personal Information
                  </Text>
                </View>
                <ArrowRightIcon width={15} height={15} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row my-2 h-[32px] w-full justify-between items-center"
                onPress={() =>
                  handleClick("/(tabs)/profile/preferences-and-budget")
                }
              >
                <View className="flex-row items-center">
                  <CustomizeIcon width={24} height={24} />
                  <Text className="font-medium text-[16px] ml-2">
                    Preferences and Budget
                  </Text>
                </View>
                <ArrowRightIcon width={15} height={15} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row my-2 h-[32px] w-full justify-between items-center"
                onPress={() =>
                  handleClick("/(tabs)/profile/result")
                }
              >
                <View className="flex-row items-center">
                  <SparkleIcon width={24} height={24} />
                  <Text className="font-medium text-[16px] ml-2">
                    Skin Tone Analysis
                  </Text>
                </View>
                <ArrowRightIcon width={15} height={15} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row my-2 h-[32px] w-full justify-between items-center"
                onPress={() => handleClick("/(tabs)/profile/body-type")}
              >
                <View className="flex-row items-center">
                  <BodyTypeIcon width={24} height={24} />
                  <Text className="font-medium text-[16px] ml-2">
                    Body Type
                  </Text>
                </View>
                <ArrowRightIcon width={15} height={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row my-2 h-[32px] w-full justify-between items-center"
                onPress={() => setModalVisible(true)}
              >
                <View className="flex-row items-center">
                  <LogOutIcon width={24} height={24} color="black" />
                  <Text className="font-medium text-[16px] ml-2">
                    Log Out
                  </Text>
                </View>
                <ArrowRightIcon width={15} height={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <ConfirmationModal
          visible={modalVisible}
          onConfirm={handleLogout}
          onCancel={() => setModalVisible(false)}
          message="Wait, just a sec!"
          description={"Are you sure you want to log out?"}
          isLoading={loading}
          type={"primary"}
          confirmMessage={"Logout"}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
