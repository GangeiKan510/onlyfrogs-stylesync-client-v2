import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";

const categoryTypes = {
  Tops: ["T-Shirts", "Long Sleeves", "Blouses", "Tank Tops"],
  Dresses: ["Casual Dresses", "Formal Dresses", "Maxi Dresses"],
  Pants: ["Jeans", "Chinos", "Shorts", "Trousers"],
  Skirts: ["Mini Skirts", "Midi Skirts", "Maxi Skirts"],
  Outerwear: ["Jackets", "Coats", "Hoodies"],
  Innerwear: ["Undergarments", "Loungewear"],
  Shoes: ["Sneakers", "Boots", "Sandals", "Flats"],
  Bags: ["Backpacks", "Handbags", "Clutches"],
  Jewelry: ["Necklaces", "Bracelets", "Earrings"],
  Headwear: ["Hats", "Caps", "Scarves"],
  OtherItems: ["Socks", "Belts", "Gloves"],
};

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleCategorySelection = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedTypes([]); // Clear selected types when category changes
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 40; // Adjust based on your item height
    const categoriesHeight = selectedCategory
      ? categoryTypes[selectedCategory].length * itemHeight
      : 0;
    const totalHeight = isOpen
      ? selectedCategory
        ? categoriesHeight
        : Object.keys(categoryTypes).length * itemHeight
      : 0;

    Animated.timing(animatedHeight, {
      toValue: totalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen, selectedCategory]);

  return (
    <View className="w-96 bg-[#F3F3F3] p-4 rounded-md">
      {/* Header */}
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center rounded-full"
      >
        <Text className="text-lg">Category</Text>
        {isOpen ? (
          <ChevronUpIcon width={20} height={20} color={"black"} />
        ) : (
          <ChevronDownIcon width={20} height={20} color={"black"} />
        )}
      </TouchableOpacity>

      {/* Selected Category */}
      {selectedCategory && (
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-[#7ab3b3]">{`${selectedCategory}: ${selectedTypes.join(", ")}`}</Text>
        </View>
      )}

      {selectedCategory && isOpen && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text className="text-black items-center m-1 px-4 py-2 rounded-full border-gray-900 bg-gray-200 border-[1px]">
              {`${selectedCategory}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Animated Content */}
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="mt-4">
            {selectedCategory ? (
              <View className="flex-wrap flex-row">
                {/* Show Types of Selected Category */}
                {categoryTypes[selectedCategory].map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`m-1 px-4 py-2 border-2 rounded-full ${
                      selectedTypes.includes(type)
                        ? "border-gray-900 bg-gray-200 border-[1px] text-white"
                        : "border-[#7AB2B2] border-[1px]"
                    }`}
                    onPress={() => toggleTypeSelection(type)}
                  >
                    <Text className="text-base">{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Show All Categories if no category is selected
              <View className="flex-wrap flex-row">
                {Object.keys(categoryTypes).map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`m-1 px-4 py-2 border-2 rounded-full ${
                      selectedCategory === category
                        ? "border-gray-900 bg-gray-200 border-[1px] text-white"
                        : "border-[#7AB2B2] border-[1px]"
                    }`}
                    onPress={() => toggleCategorySelection(category)}
                  >
                    <Text className="text-base">{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default CategorySelection;
