import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import { MATERIAL_lIST } from "@/components/constants/clothing-details/material";

const MaterialAccordion = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleMaterialSelection = (materialName: string) => {
    setSelectedMaterial(selectedMaterial === materialName ? null : materialName);
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 16;
    Animated.timing(animatedHeight, {
      toValue: isOpen ? MATERIAL_lIST.length * itemHeight + 50 : 0,
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
        <Text className="text-[16px] text-[#484848]">Materials</Text>
        {isOpen ? (
          <ChevronUpIcon width={18} height={18} color={"#484848"} />
        ) : (
          <ChevronDownIcon width={18} height={18} color={"#484848"} />
        )}
      </TouchableOpacity>

      {selectedMaterial ? (
        <View className="mb-4">
          <Text className="text-[#7ab3b3]">{selectedMaterial}</Text>
        </View>
      ) : (
        <View className="mb-4">
          <Text className="text-[#B7B7B7]">Select material</Text>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row">
            {MATERIAL_lIST.map((material, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <TouchableOpacity
                  className={`m-1 px-4 py-1.5 border-[1px] rounded-full flex-row items-center ${
                    selectedMaterial === material.name
                      ? "bg-[#7AB2B2] border-[#7AB2B2]"
                      : "bg-white border-[#7AB2B2]"
                  }`}
                  onPress={() => toggleMaterialSelection(material.name)}
                >
                  <View
                    style={{ backgroundColor: "transparent" }}
                    className="w-4 h-4 rounded-full mr-2 border-gray border-[0.5px]"
                  >
                    <img
                      src={material.image}
                      alt={material.name}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                  <Text
                    className={`text-base ${
                      selectedMaterial === material.name ? "text-white" : "text-[#7AB2B2]"
                    }`}
                  >
                    {material.name}
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

export default MaterialAccordion;
