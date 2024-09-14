import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const colorList = [
  { name: 'White', colorCode: '#FFFFFF' },
  { name: 'Cream', colorCode: '#FFFDD0' },
  { name: 'Beige', colorCode: '#E2C79C' },
  { name: 'Light-Gray', colorCode: '#E4E2E2' },
  { name: 'Dark-Gray', colorCode: '#B0B0B0' },
  { name: 'Black', colorCode: '#000000' },
  { name: 'Light-Pink', colorCode: '#FFEEEE' },
  { name: 'Yellow', colorCode: '#FFFF00' },
  { name: 'Light-Green', colorCode: '#C5DB88' },
  { name: 'Torquoise', colorCode: '#6BF1D8' },
  { name: 'Light-Blue', colorCode: '#C5E3FF' },
  { name: 'Light-Purple', colorCode: '#D7BEF5' },
  { name: 'Silver', colorCode: '#C0C0C0' },
  { name: 'Pink', colorCode: '#FFC0CB' },
  { name: 'Coral', colorCode: '#FF7F50' },
  { name: 'Orange', colorCode: '#FFA500' },
  { name: 'Green', colorCode: '#008000' },
  { name: 'Blue', colorCode: '#0000FF' },
  { name: 'Purple', colorCode: '#800080' },
  { name: 'Red', colorCode: '#FF0000' },
  { name: 'Camel', colorCode: '#C19A6B' },
  { name: 'Brown', colorCode: '#A52A2A' },
  { name: 'Khaki', colorCode: '#F0E68C' },
  { name: 'Navy', colorCode: '#000080' },
  { name: 'Wine', colorCode: '#9E213F' },
  { name: 'Gold', colorCode: '#FFD700' },
];

const FavColorSelection = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleColorSelection = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(color => color !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const visibleColors = showAll ? colorList : colorList.slice(0, 8); // Show only the first 8 colors initially

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleColors.map((color, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <TouchableOpacity
              className={`m-1 px-4 py-2 border-2 rounded-full flex-row items-center ${
                selectedColors.includes(color.name)
                  ? 'border-gray-900 bg-gray-200 border-[1px] text-white'
                  : 'border-[#7AB2B2] border-[1px]'
              }`}
              onPress={() => toggleColorSelection(color.name)}
            >
              <View
                style={{ backgroundColor: color.colorCode }}
                className="w-4 h-4 rounded-full mr-2 border-gray-400 border-[0.5px]"
              />
              <Text className="text-base">{color.name}</Text>
            </TouchableOpacity>
            {!showAll && colorList.length > 8 && index === 7 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">Show more...</Text>
              </TouchableOpacity>
            )}
            {showAll && index === colorList.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-2">Show less</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default FavColorSelection;
