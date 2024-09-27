import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@/components/common/Header";
import Bubble from "@/components/chat/bubble";
import SendMessageIcon from "../../assets/icons/chat/send-icon.svg";
import EmptyChat from "@/components/chat/empty-chat";
import UploadIcon from "../../assets/icons/chat/upload-icon.svg";
import { getUserChatSession } from "@/network/web/chat";
import { useUser } from "@/components/config/user-context";

export default function HomeScreen() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isSendButtonDisabled = message.trim() === "";

  useEffect(() => {
    const fetchChatSession = async () => {
      if (user?.id) {
        try {
          const sessionData = await getUserChatSession(user.id);
          if (sessionData && sessionData.session) {
            setMessages(sessionData.session.messages);
          }
        } catch (error) {
          console.error("Failed to fetch chat session:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChatSession();
  }, [user]);

  console.log(messages);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
    >
      <View className="flex-1 bg-[#ffffff]">
        <Header />

        {/* Chat content */}
        <View className="flex-1">
          {loading ? (
            <EmptyChat />
          ) : messages.length === 0 ? (
            <EmptyChat />
          ) : (
            <ScrollView className="flex mx-5 mt-3">
              {messages.map((message: any) => (
                <View key={message.id} className="mb-4">
                  <Bubble type={message.role} message={message.content} />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        <View className="flex flex-row items-center h-[42px] pl-3 pr-1 bg-light-gray mx-7 mt-3 rounded-[10px] mb-7">
          <UploadIcon />
          <TextInput
            className="flex-1 h-[42px] bg-transparent ml-2"
            placeholder="Chat with Ali..."
            value={message}
            onChangeText={setMessage}
          />
          <Pressable
            className="h-[35px] w-[35px] bg-tertiary justify-center items-center rounded-[10px] ml-2"
            disabled={isSendButtonDisabled}
            style={{ opacity: isSendButtonDisabled ? 0.25 : 1 }}
            onPress={() => {
              if (!isSendButtonDisabled) {
                console.log("Message sent:", message);
                setMessage("");
              }
            }}
          >
            <SendMessageIcon width={14} height={14} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
