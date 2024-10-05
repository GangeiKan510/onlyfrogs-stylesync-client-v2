import { Text, View } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RangeSlider from "./RangeSlider";

const App = () => {
  const MIN_DEFAULT = 100;
  const MAX_DEFAULT = 5000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  return (
    <GestureHandlerRootView className="mt-1">
      <View className="justify-center items-center">
        <View className="z-10">
          <View className="flex-row justify-between mx-2 ">
            <View className="mb-5">
              <Text className="text-black text-sm">Min Price</Text>
              <Text className="text-black text-base">₱{minValue}</Text>
            </View>
            <View>
              <Text className="text-black text-sm">Max Price</Text>
              <Text className="text-black text-base justify-end items-end">₱{maxValue}</Text>
            </View>
          </View>
          <View className="px-4 py-2 mb-4  flex justify-center items-center">
            <RangeSlider
              sliderWidth={350}
              min={MIN_DEFAULT}
              max={MAX_DEFAULT}
              step={10}
              onValueChange={(range) => {
                setMinValue(range.min);
                setMaxValue(range.max);
              }}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
