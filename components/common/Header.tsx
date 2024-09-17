import { View, Text } from "react-native";
import React from "react";
import { usePathname } from "expo-router";
import { routes } from "@/utils/routes";

const Header = () => {
  const params = usePathname();
  const headersWithoutMarginTop = [routes.closet];
  console.log(params.split("/")[1], routes.closet);
  return (
    <View
      className={
        headersWithoutMarginTop.includes(params.split("/")[1])
          ? `mt-[9px]`
          : `mt-14`
      }
    >
      <Text className="text-[48px] text-center font-logo">StyleSync</Text>
      <Text className="text-[16px] text-center">Style Effortlessly</Text>
    </View>
  );
};

export default Header;
