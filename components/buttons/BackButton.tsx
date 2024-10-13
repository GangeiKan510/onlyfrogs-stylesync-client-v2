import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BackIcon from "../../assets/icons/back-icon.svg";

const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity className="w-10 h-10" onPress={() => router.back()}>
      <BackIcon width={22} height={22} />
    </TouchableOpacity>
  );
};

export default BackButton;
