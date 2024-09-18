import { ActivityIndicator } from "react-native";
import React from "react";

const Spinner = ({ type }: { type: string }) => {
  return (
    <ActivityIndicator
      size={"small"}
      color={type === "primary" ? "#fff" : "#7ab2b2"}
    />
  );
};

export default Spinner;
