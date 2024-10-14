/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";
import { seasons } from "../constants/clothing-details/seasons";

const SeasonAccordion = ({ selectedSeasons, setSelectedSeasons }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleSeasonSelection = (season: string) => {
    if (selectedSeasons.includes(season)) {
      setSelectedSeasons(selectedSeasons.filter((s: string) => s !== season));
    } else {
      setSelectedSeasons([...selectedSeasons, season]);
    }
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const itemHeight = 12;
    Animated.timing(animatedHeight, {
      toValue: isOpen ? seasons.length * itemHeight : 0,
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
        <Text className="text-[16px] text-[#484848]">Season</Text>
        {isOpen ? (
          <ChevronUpIcon width={18} height={18} color={"#484848"} />
        ) : (
          <ChevronDownIcon width={18} height={18} color={"#484848"} />
        )}
      </TouchableOpacity>

      {selectedSeasons.length > 0 ?  (
        <View className="mb-4">
          <Text className="text-[#7AB2B2]">{selectedSeasons.join(", ")}</Text>
        </View>
      ) : (
        <View className="mb-4">
          <Text className="text-[#B7B7B7]">Select season</Text>
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row ">
            {seasons.map((season, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-3 py-1.5 border-[1px] rounded-full ${
                  selectedSeasons.includes(season)
                    ? "bg-[#7AB2B2] border-[#7AB2B2]"
                    : "bg-white border-[#7AB2B2]"
                }`}
                onPress={() => toggleSeasonSelection(season)}
              >
                <Text
                  className={`text-center ${
                    selectedSeasons.includes(season)
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {season}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default SeasonAccordion;
