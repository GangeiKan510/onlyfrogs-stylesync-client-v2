import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useUser } from "../config/user-context";
import Avatar from "../common/Avatar";
import ConfirmationModal from "../dialogs/ConfirmationModal";
import useSignOut from "@/network/firebase/sign-out";
import { auth } from "@/firebaseConfig";
import { routes } from "@/utils/routes";
import { Href, useRouter } from "expo-router";
import MoreInfoIcon from "../../assets/icons/more-info-icon.svg";
import TokensIcon from "../../assets/icons/token-icon.svg";

const TopGreeting = () => {
  const { user } = useUser();
  const router = useRouter();

  const [signOut, loading] = useSignOut(auth);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    setModalVisible(false);

    const isSignoutSuccessful = await signOut();

    if (isSignoutSuccessful) {
      router.replace(routes.login as Href<string | object>);
    }
  };

  return (
    <View className="flex-row justify-between items-center mt-5">
      <View className="flex-row items-center">
        <Avatar
          url={
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          }
          alt={"profile-alt"}
        />
        <View className="ml-3">
          <Text className="font-bold text-base">
            Welcome Back, {user?.first_name.split(" ")[0]}!
          </Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text className="text-base text-text-tertiary underline">
              Log out
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="flex items-end">
        <View className="flex-row items-center">
          <MoreInfoIcon width={20} height={20} />
          <Text className="text-base ml-1">Tokens:</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <TokensIcon width={20} height={20} />
          <Text className="text-base ml-1">{user?.tokens}</Text>
        </View>
      </View>

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
  );
};

export default TopGreeting;
