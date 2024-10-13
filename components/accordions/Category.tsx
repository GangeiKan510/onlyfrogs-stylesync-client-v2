/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import Unselect from "../../assets/icons/x-icon.svg";
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
    const itemHeight = 12;
    
    const categoriesHeight = selectedCategory?.name && categoryTypes[selectedCategory.name]
      ? categoryTypes[selectedCategory.name].length * itemHeight + 40
      : 0;
    
    const totalHeight = isOpen
      ? selectedCategory?.name
        ? categoriesHeight
        : Object.keys(categoryTypes).length * itemHeight + 40
      : 0;
  
    const safeTotalHeight = isNaN(totalHeight) ? 0 : totalHeight;
  
    Animated.timing(animatedHeight, {
      toValue: safeTotalHeight,
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
        <Text className="text-[16px] text-[#484848]">Category</Text>
        {isOpen ? (
          <ChevronUpIcon width={18} height={18} color={"#484848"} />
        ) : (
          <ChevronDownIcon width={18} height={18} color={"#484848"} />
        )}
      </TouchableOpacity>

      {selectedCategory?.name && selectedCategory?.type ? (
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#7AB2B2]">
            {`${selectedCategory.name}: ${selectedCategory.type}`}
          </Text>
        </View>
      ) : (
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#B7B7B7]">Select category and type</Text>
        </View>
      )}

      {selectedCategory?.name && isOpen && (
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() =>
              setSelectedCategory({
                name: null,
                type: null,
              })
            }
          >
            <View className="flex-row space-x-2 m-1 px-4 py-1.5 border-[1px] rounded-full bg-[#7AB2B2] border-[#7AB2B2]">
              <Text className="text-white">{`${selectedCategory?.name}`}</Text>
              <Unselect width={15} height={15} color={"white"} />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-1 pb-4">
            {selectedCategory?.name && categoryTypes[selectedCategory.name]
              ? categoryTypes[selectedCategory.name].map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`m-1 px-4 py-1.5 border-[1px] rounded-full ${
                      selectedCategory?.type === type
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleTypeSelection(type)}
                  >
                    <Text
                      className={`text-center ${
                        selectedCategory?.type === type
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
                    className={`m-1 px-4 py-1.5 border-[1px] rounded-full ${
                      selectedCategory?.name === category
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleCategorySelection(category)}
                  >
                    <Text
                      className={`text-center ${
                        selectedCategory?.name === category
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
