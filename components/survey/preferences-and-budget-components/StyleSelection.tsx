/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { STYLE_LIST } from "../../constants/style-list";

const StyleSelection = ({ selectedStyles, onStylesChange }: any) => {
  const [showAll, setShowAll] = useState(false);

  const toggleStyleSelection = (styleName: string) => {
    const updatedStyles = selectedStyles?.includes(styleName)
      ? selectedStyles?.filter((style: string) => style !== styleName)
      : [...selectedStyles, styleName];
    onStylesChange(updatedStyles);
  };

  const visibleStyles = showAll ? STYLE_LIST : STYLE_LIST.slice(0, 8);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleStyles.map((style, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <TouchableOpacity
              className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                selectedStyles?.includes(style.name)
                  ? "bg-[#7AB2B2] border-[#7AB2B2]"
                  : "bg-white border-[#7AB2B2]"
              }`}
              onPress={() => toggleStyleSelection(style.name)}
            >
              <Text
                className={`text-base ${
                  selectedStyles?.includes(style.name)
                    ? "text-white"
                    : "text-[#7AB2B2]"
                }`}
              >
                {style.name}
              </Text>
            </TouchableOpacity>
            {!showAll && STYLE_LIST.length > 8 && index === 7 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                  Show more...
                </Text>
              </TouchableOpacity>
            )}
            {showAll && index === STYLE_LIST.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                  Show less
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {selectedStyles.length > 0 && (
        <View className="">
          {selectedStyles.map((styleName: any) => {
            const style = STYLE_LIST.find((s) => s.name === styleName);
            return (
              style && (
                <View
                  key={styleName}
                  className="bg-gray-100 px-2 mb-2 rounded-md"
                >
                  <Text className="font-bold text-[#7AB2B2]">
                    {style.name}:
                  </Text>
                  <Text className="text-[#7AB2B2]">{style.description}</Text>
                </View>
              )
            );
          })}
        </View>
      )}
    </View>
  );
};

export default StyleSelection;
