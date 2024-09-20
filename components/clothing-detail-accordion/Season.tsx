import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import ChevronDownIcon from "../../assets/icons/down-icon.svg";
import ChevronUpIcon from "../../assets/icons/up-icon.svg";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

const SeasonSelection = () => {
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleSeasonSelection = (season: string) => {
    if (selectedSeasons.includes(season)) {
      setSelectedSeasons(selectedSeasons.filter((s) => s !== season));
    } else {
      setSelectedSeasons([...selectedSeasons, season]);
    }
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 60 : 0,
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
        <Text className="text-lg">Season</Text>
        {isOpen ? (
          <ChevronUpIcon width={20} height={20} color={"black"} />
        ) : (
          <ChevronDownIcon width={20} height={20} color={"black"} />
        )}
      </TouchableOpacity>

      {/* Selected Seasons */}
      {selectedSeasons.length > 0 && (
        <Text className="text-[#7ab3b3]">
          {selectedSeasons.join(", ")}
        </Text>
      )}

      {/* Content */}
      <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-4">
            {seasons.map((season, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-4 py-2 border-2 rounded-full ${
                  selectedSeasons.includes(season)
                    ? "border-gray-900 bg-gray-200 border-[1px] text-white"
                    : "border-[#7AB2B2] border-[1px]"
                }`}
                onPress={() => toggleSeasonSelection(season)}
              >
                <Text className="text-base">{season}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default SeasonSelection;
