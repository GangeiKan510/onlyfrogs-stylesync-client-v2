import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import { COLOR_LIST } from "@/components/constants/clothing-details/color-list";

interface ColorAccordionProps {
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
}

const ColorAccordion: React.FC<ColorAccordionProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleColorSelection = (colorName: string) => {
    setSelectedColor(selectedColor === colorName ? null : colorName);
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 18;
    Animated.timing(animatedHeight, {
      toValue: isOpen ? COLOR_LIST.length * itemHeight + 40 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View className="bg-[#F3F3F3] px-4 rounded-md">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="h-[42px] flex-row justify-between items-center rounded-[10px]"
      >
        <Text className="text-[16px] text-[#484848]">Color</Text>
        {isOpen ? (
          <ChevronUpIcon width={18} height={18} color={"#484848"} />
        ) : (
          <ChevronDownIcon width={18} height={18} color={"#484848"} />
        )}
      </TouchableOpacity>

      {selectedColor ? (
        <View className="mb-4">
          <Text className="text-[#7ab3b3]">{selectedColor}</Text>
        </View>
      ) : (
        <View className="mb-4">
          <Text className="text-[#B7B7B7]">Select color</Text>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row">
            {COLOR_LIST.map((color, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-3 py-1.5 border-[1px] rounded-full flex-row items-center ${
                  selectedColor === color.name
                    ? "bg-[#7AB2B2] border-[#7AB2B2]"
                    : "bg-white border-[#7AB2B2]"
                }`}
                onPress={() => toggleColorSelection(color.name)}
              >
                <View
                  style={{ backgroundColor: color.colorCode }}
                  className="w-4 h-4 rounded-full mr-2 border-gray border-[0.5px]"
                />
                <Text
                  className={`text-base ${
                    selectedColor === color.name
                      ? "text-white"
                      : "text-tertiary"
                  }`}
                >
                  {color.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default ColorAccordion;
