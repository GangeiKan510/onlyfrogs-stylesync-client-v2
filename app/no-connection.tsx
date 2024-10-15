import { Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import CustomButton from "@/components/buttons/CustomButton";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";

const NoConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const tryAgainHandler = () => {
    setIsLoading(true);

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        router.replace(routes.login as Href<string>);
      } else {
        Toast.show({
          type: "error",
          text1: "No connection",
          text2: "Please check your internet and try again.",
        });
      }
      setIsLoading(false);
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="text-[48px] font-logo">Oops!</Text>
        <Text>No internet connection was found.</Text>
        <Text>Please check your connection or try again.</Text>
      </View>

      <View className="w-full px-7 mb-2">
        <CustomButton
          label={"Try Again"}
          type={"primary"}
          isLoading={isLoading}
          callBack={tryAgainHandler}
        />
      </View>

      <Toast />
    </SafeAreaView>
  );
};

export default NoConnection;
