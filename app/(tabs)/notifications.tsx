/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import Background from "../../assets/icons/profile/background.svg";
import Header from "@/components/common/Header";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: "1", message: "Your order has been shipped." },
    { id: "2", message: "Your profile update was successful." },
    { id: "3", message: "Welcome to the app! Explore your dashboard." },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setNotifications((prevNotifications) => [
        {
          id: String(prevNotifications.length + 1),
          message: "New notification received!",
        },
        ...prevNotifications,
      ]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderNotification = ({ item }: any) => (
    <View className="p-4 border-b border-gray-200">
      <Text className="text-base text-gray-800">{item.message}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingTop: 150, paddingHorizontal: 16 }}
        ListHeaderComponent={
          <Text className="text-2xl font-bold mb-4 text-gray-800">
            Notifications
          </Text>
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
