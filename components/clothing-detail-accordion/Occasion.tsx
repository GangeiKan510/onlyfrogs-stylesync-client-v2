/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import { occasion } from "../constants/clothing-details/occasion";

const OccasionSelection = ({
  selectedOccasions,
  setSelectedOccasions,
}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleOccasionSelection = (occ: string) => {
    if (selectedOccasions.includes(occ)) {
      setSelectedOccasions(selectedOccasions.filter((s: string) => s !== occ));
    } else {
      setSelectedOccasions([...selectedOccasions, occ]);
    }
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 14;
    Animated.timing(animatedHeight, {
      toValue: isOpen ? occasion.length * itemHeight + 50 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View className="w-96 bg-[#F3F3F3] px-4 rounded-md">
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

      {selectedOccasions.length > 0 && (
        <View className="mt-2 mb-4">
          <Text className="text-[#7ab3b3]">{selectedOccasions.join(", ")}</Text>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-4 pb-4">
            {occasion.map((occ, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
                  selectedOccasions.includes(occ)
                    ? "bg-[#7AB2B2] border-[#7AB2B2]"
                    : "bg-white border-[#7AB2B2]"
                }`}
                onPress={() => toggleOccasionSelection(occ)}
              >
                <Text
                  className={`text-center ${
                    selectedOccasions.includes(occ)
                      ? "text-white"
                      : "text-[#7AB2B2]"
                  }`}
                >
                  {occ}
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
