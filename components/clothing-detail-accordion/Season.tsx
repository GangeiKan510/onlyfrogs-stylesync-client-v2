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
    const itemHeight = 16;
    Animated.timing(animatedHeight, {
      toValue: isOpen ? seasons.length * itemHeight + 50 : 0, // Adjust height and add extra space
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View className="w-96 bg-[#F3F3F3] px-4 rounded-md">
      {/* Header */}
      <TouchableOpacity
        onPress={toggleAccordion}
        className="h-[42px] flex-row justify-between items-center rounded-[10px]"
      >
        <Text>Season</Text>
        {isOpen ? (
          <ChevronUpIcon width={15} height={15} color={"black"} />
        ) : (
          <ChevronDownIcon width={15} height={15} color={"black"} />
        )}
      </TouchableOpacity>

      {/* Selected Seasons */}
      {selectedSeasons.length > 0 && (
        <View className="mt-2 mb-4">
          <Text className="text-[#7AB2B2]">{selectedSeasons.join(", ")}</Text>
        </View>
      )}

      {/* Content */}
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        {isOpen && (
          <View className="flex-wrap flex-row mt-4 pb-4">
            {/* Add padding-bottom */}
            {seasons.map((season, index) => (
              <TouchableOpacity
                key={index}
                className={`m-1 px-4 py-1 border-[1.5px] rounded-[10px] ${
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
                      : "text-[#7AB2B2]"
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

export default SeasonSelection;
