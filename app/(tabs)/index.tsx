/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import Header from "@/components/common/Header";
import Bubble from "@/components/chat/bubble";
import SendMessageIcon from "../../assets/icons/chat/send-icon.svg";
import EmptyChat from "@/components/chat/empty-chat";
import UploadIcon from "../../assets/icons/chat/upload-icon.svg";
import { getUserChatSession, sendMessage } from "@/network/web/chat";
import { useUser } from "@/components/config/user-context";
import ReplyLoading from "@/components/chat/reply-loading";
import BotIcon from "../../assets/icons/chat/bot-icon.svg";
import ScrollDownIcon from "../../assets/icons/chat/scroll-down-icon.svg";
import ChatSettingsIcon from "../../assets/icons/chat/chat-settings-icon.svg";
import Spinner from "@/components/common/Spinner";
import SettingsDropdown from "@/components/chat/settings-dropdown";
import SparkleIcon from "../../assets/icons/sparkle.svg";
import { getSuggesteddPrompt } from "@/network/web/chat";
import { scrapeMissingPieces } from "@/network/web/scraping";

interface MessageProps {
  id: string;
  role: string;
  content: string;
}

export default function HomeScreen() {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  const isSendButtonDisabled = message.trim() === "" || isSending;

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

  const resetChatState = () => {
    setMessages([]);
    setSuggestedPrompts([]);
    setMessage("");
    setIsSending(false);
    setIsReplying(false);
    setShowScrollDown(false);
  };

  const handleSendMessage = async (content: string) => {
    if (user?.id && content.trim()) {
      const newMessage = {
        id: new Date().toISOString(),
        role: "user",
        content,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      setIsReplying(true);
      setIsSending(true);

      try {
        // Send message to assistant and receive response
        const assistantResponse = await sendMessage(user.id, content);
        const assistantMessage = {
          id: assistantResponse.id,
          role: "assistant",
          content: assistantResponse.message,
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        console.log("Assistant Response:", assistantMessage.content);

        try {
          const scrapedData = await scrapeMissingPieces(
            user.id,
            assistantMessage.content
          );
          console.log("Scraped Data:", scrapedData);

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: new Date().toISOString(),
              role: "system",
              content: `Scraped Missing Pieces: ${JSON.stringify(scrapedData)}`,
            },
          ]);
        } catch (scrapeError) {
          console.error("Error during scraping:", scrapeError);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: new Date().toISOString(),
              role: "system",
              content: "Failed to scrape missing pieces.",
            },
          ]);
        }

        const response = await getSuggesteddPrompt(content);
        if (response.suggestions) {
          setSuggestedPrompts(response.suggestions);
        }
      } catch (error) {
        console.error(
          "Failed to send message or fetch suggested prompts:",
          error
        );
      } finally {
        setIsSending(false);
        setIsReplying(false);
      }
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    const sanitizedPrompt = prompt.replace(/^"|"$/g, "").trim();
    setSuggestedPrompts([]);
    handleSendMessage(sanitizedPrompt);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (layoutMeasurement.height + contentOffset.y < contentSize.height - 20) {
      setShowScrollDown(true);
    } else {
      setShowScrollDown(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={0}
    >
      <View className="flex-1 bg-white">
        <View className="flex-row justify-between items-center px-4">
          <View className="absolute right-[30px] bottom-[25px] z-30">
            <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
              <ChatSettingsIcon />
            </Pressable>
          </View>
          <View className="flex-1 items-center z-10">
            <Header />
          </View>
        </View>

        {/* Settings Dropdown */}
        <SettingsDropdown
          visible={dropdownVisible}
          onClose={() => setDropdownVisible(false)}
          resetChatState={resetChatState} // Pass resetChatState
        />

        <View className="flex-1">
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <Spinner type={"secondary"} />
            </View>
          ) : messages.length === 0 ? (
            <EmptyChat />
          ) : (
            <ScrollView
              className="flex mx-5 mt-3"
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {messages.map((msg) => (
                <View key={msg.id} className="mb-4">
                  <Bubble
                    type={msg.role === "user" ? "user" : "assistant"}
                    message={msg.content}
                  />
                </View>
              ))}
              {isReplying && (
                <View
                  key={`reply-loading-${new Date().getTime()}`}
                  className="flex-row justify-start items-center mb-4"
                >
                  <BotIcon width={45} height={45} className="mr-2" />
                  <ReplyLoading />
                </View>
              )}
              {suggestedPrompts.length > 0 && (
                <View>
                  <View className="flex-row gap-1 mb-2">
                    <SparkleIcon width={22} height={22} />
                    <Text className="text-tertiary">Suggested prompts...</Text>
                  </View>
                  <View className="flex flex-col gap-2 mb-4">
                    {suggestedPrompts.map((prompt, index) => (
                      <Pressable
                        key={`suggestion-${index}`}
                        onPress={() => handleSuggestionClick(prompt)}
                        className="border-[1.5px] border-bg-tertiary rounded-[8px] p-3"
                      >
                        <Text>{prompt}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>
          )}

          {/* Scroll down icon */}
          {showScrollDown && (
            <Pressable
              className="absolute bottom-1 left-1/2 -translate-x-1/2"
              onPress={scrollToBottom}
            >
              <ScrollDownIcon width={24} height={24} />
            </Pressable>
          )}
        </View>

        {/* Input field and send button */}
        <View className="flex flex-row items-center h-[42px] pl-3 pr-1 bg-light-gray mx-7 mt-3 rounded-[10px] mb-7">
          <UploadIcon />
          <TextInput
            className="flex-1 h-[42px] bg-transparent ml-2"
            placeholder="Chat with Ali..."
            value={message}
            onChangeText={setMessage}
          />
          <Pressable
            className={`h-9 w-9 bg-tertiary justify-center items-center rounded-lg ml-2 ${
              isSendButtonDisabled ? "opacity-25" : "opacity-100"
            }`}
            disabled={isSendButtonDisabled}
            onPress={() => handleSendMessage(message)}
          >
            <SendMessageIcon width={14} height={14} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
