import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useUser } from "../config/user-context";
import Avatar from "../common/Avatar";
import ConfirmationModal from "../dialogs/ConfirmationModal";
import useSignOut from "@/network/firebase/sign-out";
import { auth } from "@/firebaseConfig";
import { routes } from "@/utils/routes";
import { Href, useRouter } from "expo-router";
import MoreInfoIcon from "../../assets/icons/more-info-icon.svg";
import EmailVerifiedIcon from "../../assets/icons/top-greeting/email-verified-icon.svg";
import VerifyEmailIcon from "../../assets/icons/verify-email.svg";
import TokenInfoModal from "../dialogs/TokenInfoModal";

const TopGreeting = () => {
  const { user } = useUser();
  const router = useRouter();
  const [signOut, loading] = useSignOut(auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [tokenInfoVisible, setTokenInfoVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setIsEmailVerified(auth.currentUser.emailVerified);
    }
  }, []);

  useEffect(() => {
    return () => setTokenInfoVisible(false);
  }, []);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      router.push("/(tabs)/profile/subscription");
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
    <View className="flex-row justify-between items-center mt-5">
      <View className="flex-1 flex-row items-center">
        <Avatar url={user?.profile_url as string} alt={"profile-alt"} />
        <View className="ml-3">
          <View className="flex-row items-center gap-1">
            <Text className="font-bold text-[14px]">
              Greetings,{" "}
              {user?.first_name
                ? user.first_name
                    .split(" ")[0]
                    .toLowerCase()
                    .charAt(0)
                    .toUpperCase() +
                  user.first_name.split(" ")[0].toLowerCase().slice(1)
                : "Guest"}
              !
            </Text>
          </View>

          {isEmailVerified ? (
            <View className="flex-row items-center">
              <Text className="text-[14px] text-text-tertiary">
                Email Verified{" "}
              </Text>
              <EmailVerifiedIcon width={15} height={15} />
            </View>
          ) : (
            <Pressable
              className="flex-row items-center"
              onPress={() => router.push("/(tabs)/profile/profile-settings")}
            >
              <Text className="text-[14px] text-text-tertiary">
                Verify Email{" "}
              </Text>
              <VerifyEmailIcon height={12} />
            </Pressable>
          )}
        </View>
      </View>

      <View className="flex items-end">
        <View className="flex-row items-center mt-2">
          <Pressable onPress={() => setTokenInfoVisible(true)}>
            <MoreInfoIcon color="black" width={20} height={20} />
          </Pressable>
          <Text className="text-[14px] ml-1">Tokens: {user?.tokens}</Text>
        </View>
        {/* <Pressable onPress={() => router.push("/(tabs)/survey" as Href<string | object>)}>
          <Text className="text-[8px]">to survey</Text>
        </Pressable> */}
        <View className="flex-row items-center mt-1">
          <Text className="text-base ml-1"></Text>
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

      <TokenInfoModal
        visible={tokenInfoVisible}
        onConfirm={() => {
          setTokenInfoVisible(false);
          handleClick();
        }}
        onCancel={() => setTokenInfoVisible(false)}
        isLoading={false}
        type="primary"
        confirmMessage="Get more tokens"
      />
    </View>
  );
};

export default TopGreeting;
