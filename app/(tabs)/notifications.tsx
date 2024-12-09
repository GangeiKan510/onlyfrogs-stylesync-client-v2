import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, RefreshControl, Pressable } from "react-native";
import BellIcon from "../../assets/icons/bell-icon.svg";
import NotificationActions from "../../assets/icons/chat/chat-settings-icon.svg";
import { useUser } from "@/components/config/user-context";
import { markNotificationAsRead } from "@/network/web/notification";
import NotificationModal from "@/components/notifications/notification-modal";

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

const Notifications = () => {
  const { user, refetchMe } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>(
    user?.notifications || []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const markAllAsRead = async () => {
      try {
        const unreadNotifications = notifications.filter(
          (notification) => !notification.isRead
        );

        if (unreadNotifications.length > 0) {
          await Promise.all(
            unreadNotifications.map((notification) =>
              markNotificationAsRead({ notificationId: notification.id })
            )
          );
        }
      } catch (error) {
        console.error("Failed to mark notifications as read", error);
      }
    };

    markAllAsRead();
  }, [notifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      refetchMe();
      setNotifications(user?.notifications || []);
    } catch (error) {
      console.error("Error refreshing notifications:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchMe, user]);

  const handleNotificationsCleared = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View
      className={`p-4 my-1 rounded-md ${
        !item.isRead ? "bg-[#c6e1e1]" : "bg-[#ececec]"
      }`}
    >
      <Text
        className={`text-base ${!item.isRead ? "font-semibold" : "font-normal"}`}
      >
        {item.content}
      </Text>
      <Text className="text-xs text-tertiary">
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

            <Pressable onPress={() => setModalVisible(true)}>
              <View className="flex-row items-center">
                <NotificationActions />
              </View>
            </Pressable>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#7ab2b2"]}
          />
        }
        ListEmptyComponent={
          <View className="justify-center items-center px-8 mt-52">
            <Text className="text-xl font-bold text-gray-800">
              No Notifications
            </Text>
            <Text className="text-center text-gray leading-6">
              We&apos;ll notify you when something arrives.
            </Text>
          </View>
        }
      />

      {/* Notification Modal */}
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onNotificationsCleared={handleNotificationsCleared}
      />
    </View>
  );
};

export default Notifications;
