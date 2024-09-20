import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";

// Define the types for category types and the overall structure
interface CategoryTypes {
  [key: string]: string[];
}

const categoryTypes: CategoryTypes = {
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

const CategorySelection: React.FC = () => {
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
    const itemHeight = 16;
    const categoriesHeight = selectedCategory
      ? categoryTypes[selectedCategory]?.length * itemHeight + 50 // Add extra height for padding
      : 0;
    const totalHeight = isOpen
      ? selectedCategory
        ? categoriesHeight
        : Object.keys(categoryTypes).length * itemHeight + 50 // Add extra height for padding
      : 0;

    Animated.timing(animatedHeight, {
      toValue: totalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen, selectedCategory]);

  return (
    <View className="w-96 bg-[#F3F3F3] px-4 rounded-md">
      {/* Header */}
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

      {/* Selected Category */}
      {selectedCategory && (
        <View className="mt-2 mb-4">
          {/* Add margin for spacing */}
          <Text className="text-[#7AB2B2]">{`${selectedCategory}: ${selectedTypes.join(", ")}`}</Text>
        </View>
      )}

      {selectedCategory && isOpen && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text className="text-white items-center m-1 px-4 py-2 rounded-[10px] border-tertiary bg-tertiary border-[1.5px]">
              {`${selectedCategory}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Animated Content */}
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="mt-4 pb-4">
            {/* Add padding-bottom */}
            {selectedCategory ? (
              <View className="flex-wrap flex-row">
                {/* Show Types of Selected Category */}
                {categoryTypes[selectedCategory].map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
                      selectedTypes.includes(type)
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleTypeSelection(type)}
                  >
                    <Text
                      className={`text-center ${
                        selectedTypes.includes(type)
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Show All Categories if no category is selected
              <View className="flex-wrap flex-row">
                {Object.keys(categoryTypes).map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
                      selectedCategory === category
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleCategorySelection(category)}
                  >
                    <Text
                      className={`text-center ${
                        selectedCategory === category
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
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default CategorySelection;
