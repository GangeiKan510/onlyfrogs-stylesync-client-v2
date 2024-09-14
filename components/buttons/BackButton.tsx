import React from "react";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import BackIcon from "../../assets/icons/back-icon.svg";

const BackButton = () => {
  const router = useRouter();

  return (
    <Pressable className="w-10 h-10" onPress={() => router.back()}>
      <BackIcon width={22} height={22} />
    </Pressable>
  );
};

export default BackButton;
