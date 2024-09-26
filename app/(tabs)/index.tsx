import React from "react";
import Header from "@/components/common/Header";
import { View, ScrollView } from "react-native";
import Bubble from "@/components/chat/bubble";
import { messages } from "@/components/dummy/messages";

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
