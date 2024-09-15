import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLOR_LIST } from "@/components/constants/color-list";

const FavColorSelection = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleColorSelection = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((color) => color !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const visibleColors = showAll ? COLOR_LIST : COLOR_LIST.slice(0, 8); // Show only the first 8 colors initially

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleColors.map((color, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <TouchableOpacity
              className={`m-1 px-4 py-2 border-2 rounded-full flex-row items-center ${
                selectedColors.includes(color.name)
                  ? "border-gray-900 bg-gray-200 border-[1px] text-white"
                  : "border-[#7AB2B2] border-[1px]"
              }`}
              onPress={() => toggleColorSelection(color.name)}
            >
              <View
                style={{ backgroundColor: color.colorCode }}
                className="w-4 h-4 rounded-full mr-2 border-gray-400 border-[0.5px]"
              />
              <Text className="text-base">{color.name}</Text>
            </TouchableOpacity>
            {!showAll && COLOR_LIST.length > 8 && index === 7 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">
                  Show more...
                </Text>
              </TouchableOpacity>
            )}
            {showAll && index === COLOR_LIST.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-2">
                  Show less
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default FavColorSelection;
