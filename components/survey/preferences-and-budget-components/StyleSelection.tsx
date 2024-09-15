import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

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
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleStyleSelection = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const visibleStyles = showAll ? stylesList : stylesList.slice(0, 8);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleStyles.map((style, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <TouchableOpacity
              className={`m-1 px-4 py-2 border-2 rounded-full flex-row items-center ${
                selectedStyles.includes(style)
                  ? 'border-gray-900 bg-gray-200 border-[1px] text-white'
                  : 'border-[#7AB2B2] border-[1px]'
              }`}
              onPress={() => toggleStyleSelection(style)}
            >
              <Text className="text-base">{style}</Text>
            </TouchableOpacity>
            {!showAll && stylesList.length > 8 && index === 7 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">Show more...</Text>
              </TouchableOpacity>
            )}
            {showAll && index === stylesList.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">Show less</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default StyleSelection;
