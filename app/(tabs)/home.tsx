import { View } from "react-native";
import React from "react";
import Header from "@/components/common/Header";
import TopGreeting from "@/components/home/TopGreeting";
import HomeTabs from "@/components/home/HomeTabs";

const Home = () => {
  return (
    <View className="flex-1 bg-[#ffffff]">
      <Header />
      <View className="mx-7">
        <TopGreeting />
        <HomeTabs />
      </View>
    </View>
  );
};

export default Home;
