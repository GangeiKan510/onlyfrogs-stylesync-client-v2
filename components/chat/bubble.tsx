import { View, Text } from "react-native";
import React from "react";
import BotIcon from "../../assets/icons/chat/bot-icon.svg";
import ChatAvatar from "../common/ChatAvatar";

interface BubbleProps {
  type: string;
  message: string;
}

const Bubble = ({ type, message }: BubbleProps) => {
  return (
    <View
      className={`flex-row ${type === "user" ? "justify-end" : "justify-start"} mb-4`}
    >
      {type === "bot" && <BotIcon width={45} height={45} className="mr-2" />}
      <View
        className={`rounded-[10px] p-3 max-w-[80%] ${
          type === "user" ? "bg-tertiary" : "bg-light-gray"
        }`}
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
      {type === "user" && (
        <ChatAvatar
          url={
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          }
          alt={"profile-alt"}
        />
      )}
    </View>
  );
};

export default Bubble;
