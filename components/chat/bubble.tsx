import { View, Text } from "react-native";
import React from "react";

interface BubbleProps {
  type: string;
  message: string;
}

const Bubble = ({ type, message }: BubbleProps) => {
  return (
    <View
      className={`rounded-[10px] p-3 max-w-[80%] self-${
        type === "user" ? "end" : "start"
      } ${type === "user" ? "bg-tertiary" : "bg-light-gray"}`}
      style={{
        alignSelf: type === "user" ? "flex-end" : "flex-start",
      }}
    >
      <Text
        className={`text-base ${type === "user" ? "text-white text-right" : "text-black"}`}
      >
        {message}
      </Text>
    </View>
  );
};

export default Bubble;
