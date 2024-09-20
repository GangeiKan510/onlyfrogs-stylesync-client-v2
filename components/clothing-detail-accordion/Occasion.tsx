import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";

const occasion = ["Daily", "Work", "Date", "Formal", "Travel", "Home", "Party", "Sport", "Casual", "Beach", "Others"];

const OccasionSelection = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleSeasonSelection = (occasion: string) => {
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
    const itemHeight = 14; 
    Animated.timing(animatedHeight, {
      toValue: isOpen ? occasion.length * itemHeight : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View className="w-96 bg-[#F3F3F3] p-4 rounded-md">
      {/* Header */}
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center rounded-full"
      >
        <Text className="text-lg">Occasion</Text>
        {isOpen ? (
          <ChevronUpIcon width={20} height={20} color={"black"} />
        ) : (
          <ChevronDownIcon width={20} height={20} color={"black"} />
        )}
      </TouchableOpacity>

      {/* Selected Occasions */}
      {selectedOccasion.length > 0 && (
        <Text className="text-[#7ab3b3]">
          {selectedOccasion.join(", ")}
        </Text>
      )}

      {/* Animated Content */}
      <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-4">
            {occasion.map((occasion, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-4 py-2 border-2 rounded-full ${
                  selectedOccasion.includes(occasion)
                    ? "border-gray-900 bg-gray-200 border-[1px] text-white"
                    : "border-[#7AB2B2] border-[1px]"
                }`}
                onPress={() => toggleSeasonSelection(occasion)}
              >
                <Text className="text-base">{occasion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default OccasionSelection;
