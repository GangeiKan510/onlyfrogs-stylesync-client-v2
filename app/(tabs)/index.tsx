import React from "react";
import Header from "@/components/common/Header";
import { View, ScrollView } from "react-native";
import Bubble from "@/components/chat/bubble";

const messages = [
  { id: 1, type: "user", message: "This is a message bubble" },
  { id: 2, type: "bot", message: "Hi I am Ali!" },
  { id: 3, type: "user", message: "What can you do?" },
  { id: 4, type: "bot", message: "I can help you with various tasks!" },
];

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
    </View>
  );
}
