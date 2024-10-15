/* eslint-disable no-useless-escape */
import { View, Image } from "react-native";
import React from "react";
import BotIcon from "../../assets/icons/chat/bot-icon.svg";
import ChatAvatar from "../common/ChatAvatar";
import Markdown from "react-native-markdown-display";
import { useUser } from "../config/user-context";

interface BubbleProps {
  type: string;
  message: string;
}

const renderImages = (message: string) => {
  const imageUrls = message.match(/\!\[.*?\]\((.*?)\)/g) || [];

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {imageUrls.map((img, index) => {
        const url = img.match(/\((.*?)\)/)?.[1];
        return (
          <View key={index} style={{ margin: 5 }}>
            <Image
              source={{ uri: url }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
          </View>
        );
      })}
    </View>
  );
};

const Bubble = ({ type, message }: BubbleProps) => {
  const { user } = useUser();
  return (
    <View
      className={`flex-row ${type === "user" ? "justify-end" : "justify-start"} mb-4`}
    >
      {type !== "user" && <BotIcon width={45} height={45} className="mr-2" />}
      <View
        className={`rounded-[10px] px-3 max-w-[80%] ${
          type === "user" ? "bg-tertiary" : "bg-light-gray"
        }`}
        style={{
          alignSelf: type === "user" ? "flex-end" : "flex-start",
        }}
      >
        <Markdown
          style={{
            body: {
              color: type === "user" ? "#FFFFFF" : "#000000",
              textAlign: type === "user" ? "right" : "left",
            },
            link: {
              color: "#1E90FF",
            },
          }}
          rules={{
            image: () => {
              return null;
            },
          }}
        >
          {message}
        </Markdown>
        {renderImages(message)}
      </View>
      {type === "user" && (
        <ChatAvatar url={user?.profile_url as string} alt={"profile-alt"} />
      )}
    </View>
  );
};

export default Bubble;
