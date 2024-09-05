import React from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const BackButton = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <Pressable className="w-10 h-10" onPress={onBack}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </Pressable>
  );
};

export default BackButton;
