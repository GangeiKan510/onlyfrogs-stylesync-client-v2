/* eslint-disable @typescript-eslint/no-require-imports */
import { View } from "react-native";
import React from "react";
import { Image } from "react-native";
const ReplyLoading = () => {
  return (
    <View>
      <Image
        source={require("../../assets/gifs/replying.gif")}
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
};

export default ReplyLoading;
