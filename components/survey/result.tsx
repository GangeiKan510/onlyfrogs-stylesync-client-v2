/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

const Result = () => {
  // Function to chunk the colors array into rows of 7 elements each
  const chunkArray = (array: any[], chunkSize: number) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  // Split COLORS into rows of 7
  const chunkedColors = chunkArray(COLORS, 7);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="mb-14">
        <Text className="text=[16px] text-center mb-3">Your season is</Text>
        <View className="text-center mb-5 mx-10">
          <Text className="text-[96px] font-logo text-tertiary leading-[80px] text-center">
            True Spring
          </Text>
          <Text className="text-[16px] text-center">
            You compliment with these colors
          </Text>
        </View>
        {/* Render the color circles in rows of 7 */}
        <View className="items-center">
          {chunkedColors.map((colorRow, rowIndex) => (
            <View
              key={rowIndex}
              className="flex-row justify-center items-center gap-1 mb-3"
            >
              {colorRow.map((color: any, index: any) => (
                <View
                  key={index}
                  style={{ backgroundColor: color.hex }} // dynamic class names (e.g., bg-[${color.hex}]) are not supported directly. Tailwind classes must be known at compile time.
                  className="w-[29px] h-[29px] rounded-full"
                ></View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Result;
