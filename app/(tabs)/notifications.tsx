/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import BellIcon from "../../assets/icons/bell-icon.svg";
import NotificationActions from "../../assets/icons/chat/chat-settings-icon.svg";
import { useUser } from "@/components/config/user-context";

type Notification = {
  id: string;
  user_id: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

const Notifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      user_id: "user123",
      type: "INFO",
      content: "Your order has been shipped.",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user123",
      type: "SUCCESS",
      content: "Your profile update was successful.",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      user_id: "user123",
      type: "WELCOME",
      content: "Welcome to the app! Explore your dashboard.",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setNotifications((prevNotifications) => [
        {
          id: String(prevNotifications.length + 1),
          user_id: "user123",
          type: "INFO",
          content: "New notification received!",
          isRead: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...prevNotifications,
      ]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderNotification = ({ item }: { item: Notification }) => (
    <View
      className={`p-4 my-1 rounded-md ${!item.isRead ? "bg-[#c6e1e1]" : "bg-[#ececec]"}`}
    >
      <Text
        className={`text-base ${!item.isRead ? "font-semibold" : "font-normal"}`}
      >
        {item.content}
      </Text>
      <Text className="text-sm text-gray-500">{item.type}</Text>
      <Text className="text-xs text-gray-400">
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 16 }}
        ListHeaderComponent={
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Text className="text-2xl font-semibold mr-1">Notifications</Text>
              <BellIcon
                width={22}
                height={22}
                color={"#7AB2B2"}
                className="mr-2"
              />
            </View>

            <View className="flex-row items-center">
              <NotificationActions />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#7ab2b2"]}
          />
        }
      />

      {/* Coming Soon Placeholder */}
      {notifications.length === 0 && (
        <View className="justify-center items-center px-8 mt-52">
          <Text className="text-4xl font-bold font-logo text-gray-800 mb-4">
            Coming Soon!
          </Text>
          <Text className="text-lg text-center text-gray-600 leading-6">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </Text>
        </View>
      )}
    </View>
  );
};

export default Notifications;
