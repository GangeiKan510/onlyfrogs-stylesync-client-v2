/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import { categoryTypes } from "../constants/clothing-details/categories";

const CategorySelection = ({ selectedCategory, setSelectedCategory }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleCategorySelection = (category: string) => {
    setSelectedCategory({
      name: selectedCategory.name === category ? null : category,
      type: null,
    });
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedCategory((prev: { type: string }) => ({
      ...prev,
      type: prev.type === type ? null : type,
    }));
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 16;
    const categoriesHeight = selectedCategory.name
      ? categoryTypes[selectedCategory.name]?.length * itemHeight + 50
      : 0;
    const totalHeight = isOpen
      ? selectedCategory.name
        ? categoriesHeight
        : Object.keys(categoryTypes).length * itemHeight + 50
      : 0;

    Animated.timing(animatedHeight, {
      toValue: totalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen, selectedCategory]);

  return (
    <View className="w-96 bg-[#F3F3F3] px-4 rounded-md">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="h-[42px] flex-row justify-between items-center rounded-[10px]"
      >
        <Text>Category</Text>
        {isOpen ? (
          <ChevronUpIcon width={15} height={15} color={"black"} />
        ) : (
          <ChevronDownIcon width={15} height={15} color={"black"} />
        )}
      </TouchableOpacity>

      {selectedCategory.name && selectedCategory.type && (
        <View className="mt-2 mb-4">
          <Text className="text-[#7AB2B2]">
            {`${selectedCategory.name}: ${selectedCategory.type}`}
          </Text>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-4 pb-4">
            {selectedCategory.name
              ? categoryTypes[selectedCategory.name].map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
                      selectedCategory.type === type
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleTypeSelection(type)}
                  >
                    <Text
                      className={`text-center ${
                        selectedCategory.type === type
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))
              : Object.keys(categoryTypes).map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
                      selectedCategory.name === category
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleCategorySelection(category)}
                  >
                    <Text
                      className={`text-center ${
                        selectedCategory.name === category
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default CategorySelection;
