/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import NeatHourGlass from "../../assets/images/bodyTypes/neatHourGlass.svg";
import FullHourGlass from "../../assets/images/bodyTypes/fullHourGlass.svg";
import Pear from "../../assets/images/bodyTypes/pear.svg";
import LeanColumn from "../../assets/images/bodyTypes/leanColumn.svg";
import Apple from "../../assets/images/bodyTypes/apple.svg";
import InvertedTriangle from "../../assets/images/bodyTypes/invertedTriangle.svg";

const bodyTypes = [
  { name: "Neat Hourglass", image: NeatHourGlass, type: "NeatHourGlass" },
  { name: "Full Hourglass", image: FullHourGlass, type: "FullHourGlass" },
  { name: "Pear", image: Pear, type: "Pear" },
  {
    name: "Inverted Triangle",
    image: InvertedTriangle,
    type: "InvertedTriangle",
  },
  { name: "Lean Column", image: LeanColumn, type: "LeanColumn" },
  { name: "Apple", image: Apple, type: "Apple" },
];

interface BodyTypeProps {
  setBodyType?: (bodyType: string) => void;
}

const BodyType = ({ setBodyType }: BodyTypeProps) => {
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null); // Initially null

  useEffect(() => {
    if (setBodyType && selectedBodyType) {
      setBodyType(selectedBodyType);
    }
  }, [selectedBodyType, setBodyType]);

  return (
    <>
      <View className="flex justify-center items-center mt-10">
        <Text className="text-center text-[20px] font-bold">
          What is your body type?
        </Text>
        <Text className="text-center text-[14px] text-gray">
          (Swipe to choose)
        </Text>
      </View>
      <View className=" flex-1 justify-center items-center">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="h-[75vh]"
        >
          {bodyTypes.map((bodyType) => (
            <TouchableOpacity
              key={bodyType.type}
              onPress={() => setSelectedBodyType(bodyType.type)}
              className={`border-[2px] rounded-[12px] mx-2 my-10 mt-12 ${
                selectedBodyType === bodyType.type
                  ? "border-tertiary"
                  : "border-transparent"
              }`}
            >
              <View className="py-8 px-3">
                <Text className="text-[20px] text-center text-tertiary">
                  {bodyType.name}
                </Text>
                <bodyType.image />
                <View className="flex items-center justify-center mt-6">
                  <TouchableOpacity
                    className="h-5 w-5 rounded-full flex items-center justify-center border-[2px] border-tertiary"
                    onPress={() => setSelectedBodyType(bodyType.type)}
                  >
                    <View
                      className={`h-3 w-3 rounded-full ${
                        selectedBodyType === bodyType.type
                          ? "bg-tertiary"
                          : "bg-white"
                      }`}
                      style={{ alignSelf: "center", justifyContent: "center" }} // Ensures the inner circle is centered
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default BodyType;
