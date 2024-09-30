import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import { PATTERN_LIST } from "@/components/constants/clothing-details/pattern";

interface PatternAccordionProps {
  selectedPattern: string | null;
  setSelectedPattern: (pattern: string | null) => void;
}

const PatternAccordion: React.FC<PatternAccordionProps> = ({
  selectedPattern,
  setSelectedPattern,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const togglePatternSelection = (patternName: string) => {
    setSelectedPattern(selectedPattern === patternName ? null : patternName);
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 16;
    Animated.timing(animatedHeight, {
      toValue: isOpen ? PATTERN_LIST.length * itemHeight + 50 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View className="w-96 bg-[#F3F3F3] px-4 rounded-md">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="h-[42px] flex-row justify-between items-center rounded-[10px]"
      >
        <Text className="text-[16px] text-[#484848]">Pattern</Text>
        {isOpen ? (
          <ChevronUpIcon width={18} height={18} color={"#484848"} />
        ) : (
          <ChevronDownIcon width={18} height={18} color={"#484848"} />
        )}
      </TouchableOpacity>

      {selectedPattern ? (
        <View className="mb-4">
          <Text className="text-[#7ab3b3]">{selectedPattern}</Text>
        </View>
      ) : (
        <View className="mb-4">
          <Text className="text-[#B7B7B7]">Select pattern</Text>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row">
            {PATTERN_LIST.map((pattern, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <TouchableOpacity
                  className={`m-1 px-3 py-1.5 border-[1px] rounded-full flex-row items-center ${
                    selectedPattern === pattern.name
                      ? "bg-[#7AB2B2] border-[#7AB2B2]"
                      : "bg-white border-[#7AB2B2]"
                  }`}
                  onPress={() => togglePatternSelection(pattern.name)}
                >
                  <View className="mr-2 rounded-lg overflow-hidden">
                    <pattern.reference
                      width={20}
                      height={20}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <Text
                    className={`text-base ${
                      selectedPattern === pattern.name
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {pattern.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default PatternAccordion;
