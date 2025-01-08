/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, View } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RangeSlider from "./RangeSlider";

const BudgetRange = ({ onBudgetChange }: any) => {
  const MIN_DEFAULT = 500;
  const MAX_DEFAULT = 100000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const handleValueChange = (range: { min: number; max: number }) => {
    setMinValue(range.min);
    setMaxValue(range.max);
    onBudgetChange({ min: range.min, max: range.max });
  };

  return (
    <GestureHandlerRootView className="mt-1">
      <View className="justify-center items-center">
        <View className="z-10">
          <View className="flex-row justify-between mx-2 ">
            <View className="mb-5">
              <Text className="text-black text-[14px]">Min Price</Text>
              <Text className="text-black font-bold text-[14px]">
                ₱{minValue}
              </Text>
            </View>
            <View>
              <Text className="text-black text-[14px]">Max Price</Text>
              <Text className="text-black font-bold text-[14px]">
                ₱{maxValue}
              </Text>
            </View>
          </View>
          <View className="px-2 py-2  mb-4 flex justify-center items-center">
            <RangeSlider
              sliderWidth={330}
              min={MIN_DEFAULT}
              max={MAX_DEFAULT}
              step={10}
              onValueChange={handleValueChange}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default BudgetRange;
