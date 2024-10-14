import { View, Text } from "react-native";
import React from "react";
import BotIcon from "../../assets/icons/chat/bot-icon.svg";
import { useUser } from "@/components/config/user-context";

const EmptyChat = () => {
  const { user } = useUser();

  return (
    <View className="flex items-center justify-center gap-7 mt-10">
      <Text className="text-[16px] font-bold">
        Welcome, {user?.first_name.split(" ")[0]}!
      </Text>
      <BotIcon width={110} height={110} />
      <View className={`rounded-[10px] p-3 max-w-[80%] bg-light-gray`}>
        <Text className={`text-center text-[14px]`}>
          Hi, I am Ali! Your personal virtual closet companion! How can I help
          you today?
        </Text>
      </View>
    </View>
  );
};

export default EmptyChat;
