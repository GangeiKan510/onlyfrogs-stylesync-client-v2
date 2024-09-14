import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

const stylesList = [
  'Casual',
  'Modern',
  'Minimalist',
  'Monochrome',
  'Boho',
  'Formal',
  'Office',
  'Sporty',
  'Classy',
  'Vintage',
];

const StyleSelection = () => {
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    const toggleStyleSelection = (style: string) => {
      if (selectedStyles.includes(style)) {
        setSelectedStyles(selectedStyles.filter(s => s !== style));
      } else {
        setSelectedStyles([...selectedStyles, style]);
      }
    };

    return (
      <View>
        <ScrollView>
          <View className="flex-wrap flex-row">
            {stylesList.map((style, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-4 py-2 space-x-1 border-2 rounded-full ${
                  selectedStyles.includes(style) ? 'border-gray-900 bg-gray-200 border-[1px] text-white' : 'border-[#7AB2B2] border-[1px] opacity-50'
                }`}
                onPress={() => toggleStyleSelection(style)}
              >
                <Text className="text-base">{style}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
  </View>
    );
};

export default StyleSelection;
