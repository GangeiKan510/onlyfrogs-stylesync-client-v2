import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Test PR {id}</Text>
    </SafeAreaView>
  );
};

export default Page;
