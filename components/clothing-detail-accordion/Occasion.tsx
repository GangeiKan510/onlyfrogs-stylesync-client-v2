import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";

const occasion = [
  "Daily",
  "Work",
  "Date",
  "Formal",
  "Travel",
  "Home",
  "Party",
  "Sport",
  "Casual",
  "Beach",
  "Others",
];

const OccasionSelection = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleOccasionSelection = (occasion: string) => {
    if (selectedOccasion.includes(occasion)) {
      setSelectedOccasion(selectedOccasion.filter((s) => s !== occasion));
    } else {
      setSelectedOccasion([...selectedOccasion, occasion]);
    }
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 14; // Set height for each item
    Animated.timing(animatedHeight, {
      toValue: isOpen ? occasion.length * itemHeight + 50 : 0, // Add extra space
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View className="w-96 bg-[#F3F3F3] px-4 rounded-md">
      {/* Header */}
      <TouchableOpacity
        onPress={toggleAccordion}
        className="h-[42px] flex-row justify-between items-center rounded-full"
      >
        <Text>Occasion</Text>
        {isOpen ? (
          <ChevronUpIcon width={15} height={15} color={"black"} />
        ) : (
          <ChevronDownIcon width={15} height={15} color={"black"} />
        )}
      </TouchableOpacity>

      {/* Selected Occasions */}
      {selectedOccasion.length > 0 && (
        <View className="mt-2 mb-4">
          <Text className="text-[#7ab3b3]">{selectedOccasion.join(", ")}</Text>
        </View>
      )}

      {/* Animated Content */}
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-4 pb-4">
            {/* Add bottom padding */}
            {occasion.map((occasion, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
                  selectedOccasion.includes(occasion)
                    ? "bg-[#7AB2B2] border-[#7AB2B2]"
                    : "bg-white border-[#7AB2B2]"
                }`}
                onPress={() => toggleOccasionSelection(occasion)}
              >
                <Text
                  className={`text-center ${
                    selectedOccasion.includes(occasion)
                      ? "text-white"
                      : "text-[#7AB2B2]"
                  }`}
                >
                  {occasion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default OccasionSelection;
