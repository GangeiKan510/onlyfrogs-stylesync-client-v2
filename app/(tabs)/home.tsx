import React, { useState, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import Header from "@/components/common/Header";
import TopGreeting from "@/components/home/TopGreeting";
import HomeTabs from "@/components/home/HomeTabs";
import { useUser } from "@/components/config/user-context";

const Home = () => {
  const { refetchMe } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchMe();
    } catch (error) {
      console.error("Error refreshing user data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchMe]);

  return (
    <View className="flex-1 bg-[#ffffff]">
      <Header />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#7ab2b2"]}
          />
        }
      >
        <View className="mx-7">
          <TopGreeting />
          <HomeTabs />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
