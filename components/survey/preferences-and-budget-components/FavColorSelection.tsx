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

  const visibleColors = showAll ? COLOR_LIST : COLOR_LIST.slice(0, 8);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleColors.map((color, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <TouchableOpacity
              className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                selectedColors.includes(color.name)
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
                  selectedColors.includes(color.name)
                    ? "text-white"
                    : "text-[#7AB2B2]"
                }`}
              >
                {color.name}
              </Text>
            </TouchableOpacity>
            {!showAll && COLOR_LIST.length > 8 && index === 7 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                  Show more...
                </Text>
              </TouchableOpacity>
            )}
            {showAll && index === COLOR_LIST.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
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
