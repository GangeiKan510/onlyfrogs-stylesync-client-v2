import React from "react";
import Header from "@/components/common/Header";
import { View, ScrollView, TextInput, Pressable } from "react-native";
import Bubble from "@/components/chat/bubble";
import { messages } from "@/components/dummy/messages";
import SendMessageIcon from "../../assets/icons/chat/send-icon.svg";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#ffffff]">
      <Header />
      <ScrollView className="flex mx-7 mt-3">
        {messages.map((msg) => (
          <View key={msg.id} className="mb-4">
            <Bubble type={msg.type} message={msg.message} />
          </View>
        ))}
      </ScrollView>
      <View className="flex flex-row items-center h-[42px] pl-5 pr-1 bg-light-gray mx-7 mt-3 rounded-[10px] mb-7">
        <TextInput
          className="flex-1 h-[42px] bg-transparent"
          placeholder="Chat with Ali..."
        />
        <Pressable className="h-[35px] w-[35px] bg-tertiary justify-center items-center rounded-[10px] ml-2">
          <SendMessageIcon width={14} height={14} />
        </Pressable>
      </View>
    </View>
  );
}
