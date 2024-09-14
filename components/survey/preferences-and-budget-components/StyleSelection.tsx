import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { STYLE_LIST } from "../../constants/style-list";

const StyleSelection = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleStyleSelection = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const visibleStyles = showAll ? STYLE_LIST : STYLE_LIST.slice(0, 8); // Show only the first 8 styles initially

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleStyles.map((style, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <TouchableOpacity
              className={`m-1 px-4 py-2 border-2 rounded-full flex-row items-center ${
                selectedStyles.includes(style)
                  ? "border-gray-900 bg-gray-200 border-[1px] text-white"
                  : "border-[#7AB2B2] border-[1px]"
              }`}
              onPress={() => toggleStyleSelection(style)}
            >
              <Text className="text-base">{style}</Text>
            </TouchableOpacity>
            {/* Show more/less link next to the style items */}
            {!showAll && STYLE_LIST.length > 8 && index === 7 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-base ml-2">
                  Show more...
                </Text>
              </TouchableOpacity>
            )}
            {showAll && index === STYLE_LIST.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-base ml-2">Show less</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default StyleSelection;
