/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLOR_LIST } from "@/components/constants/color-list";

const FavColorSelection = ({ selectedColors, onColorsChange }: any) => {
  const [showAll, setShowAll] = useState(false);

  const toggleColorSelection = (colorName: string) => {
    const updatedColors = selectedColors.includes(colorName)
      ? selectedColors.filter((color: string) => color !== colorName)
      : [...selectedColors, colorName];
    onColorsChange(updatedColors);
  };

  const visibleColors = showAll ? COLOR_LIST : COLOR_LIST.slice(0, 8);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleColors.map((color, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <TouchableOpacity
              className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                selectedColors?.includes(color.name)
                  ? "bg-[#7AB2B2] border-[#7AB2B2]"
                  : "bg-white border-[#7AB2B2]"
              }`}
              onPress={() => toggleColorSelection(color.name)}
            >
              <View
                style={{ backgroundColor: color.colorCode }}
                className="w-4 h-4 rounded-full mr-2 border-gray-400 border-[0.5px]"
              />
              <Text
                className={`text-base ${
                  selectedColors?.includes(color.name)
                    ? "text-white"
                    : "text-[#7AB2B2]"
                }`}
              >
                {color.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        {!showAll && COLOR_LIST.length > 8 && (
          <TouchableOpacity onPress={() => setShowAll(true)}>
            <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
              Show more...
            </Text>
          </TouchableOpacity>
        )}
        {showAll && (
          <TouchableOpacity onPress={() => setShowAll(false)}>
            <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">Show less</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FavColorSelection;
