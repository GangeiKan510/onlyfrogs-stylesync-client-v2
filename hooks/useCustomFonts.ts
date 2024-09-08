/* eslint-disable @typescript-eslint/no-require-imports */
import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Judson: require("../assets/fonts/Judson-Regular.ttf"),
  });
};

export default useFonts;
