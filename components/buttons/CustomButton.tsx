import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";

interface CustomButtonProps {
  isLoading: boolean;
  callBack: () => void;
  label: string;
  type: "primary" | "secondary";
}

const CustomButton = ({
  isLoading,
  callBack,
  label,
  type,
}: CustomButtonProps) => {
  const buttonStyles =
    type === "primary"
      ? "bg-[#7ab2b2] h-[42px] rounded-[10px] px-4"
      : "bg-white border border-[#7ab2b2] h-[42px] rounded-[10px] px-4";

  const textStyles =
    type === "primary"
      ? "text-white text-[16px]"
      : "text-[#7ab2b2] text-[16px]";

  return (
    <Pressable className={buttonStyles} onPress={callBack}>
      <View className="flex-1 justify-center items-center">
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={type === "primary" ? "#fff" : "#7ab2b2"}
          />
        ) : (
          <Text className={textStyles}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomButton;
