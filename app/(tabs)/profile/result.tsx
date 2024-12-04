import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../../../assets/icons/back-icon.svg";

function Result() {
  // Mock data
  const subSeason = "warm autumn"; // Example sub-season
  const complements = [
    "#D2691E", // Chocolate
    "#CD853F", // Peru
    "#8B4513", // Saddle Brown
    "#FF4500", // Orange Red
    "#FFA07A", // Light Salmon
    "#FFD700", // Gold
    "#DAA520", // Goldenrod
    "#B22222", // Firebrick
    "#FF6347", // Tomato
    "#8B0000", // Dark Red
    "#A52A2A", // Brown
    "#DEB887", // Burly Wood
  ];

  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalizedSubSeason = capitalizeWords(subSeason);

  const splitSubSeasonIntoTwoLines = (str: string) => {
    const words = str.split(" ");
    if (words.length === 2) {
      return `${words[0]}\n${words[1]}`;
    }
    return str;
  };

  const subSeasonText = splitSubSeasonIntoTwoLines(capitalizedSubSeason);

  const chunkArray = (array: string[], chunkSize: number) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const chunkedColors = chunkArray(complements, 7);

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-row items-center top-2 px-6 z-30">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile/result")}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Skint Tone Analysis
        </Text>
      </View>
      <View className="flex-1 justify-center">
        <View className="flex-1 justify-center items-center">
          <View className="mb-14">
            <Text className="text-[16px] text-center mb-3">Your season is</Text>
            <View className="text-center mb-5 mx-10">
              <Text
                style={{ fontSize: 80, lineHeight: 75 }}
                className="font-logo text-tertiary text-center"
              >
                {subSeasonText}
              </Text>

              <Text className="text-[16px] text-center">
                You complement with these colors
              </Text>
            </View>
            {/* Render the color circles in rows of 7 */}
            <View className="items-center">
              {chunkedColors.map((colorRow, rowIndex) => (
                <View
                  key={rowIndex}
                  className="flex-row justify-center items-center gap-1 mb-3"
                >
                  {colorRow.map((color: string, index: number) => (
                    <View
                      key={index}
                      style={{ backgroundColor: color }}
                      className="w-[29px] h-[29px] rounded-full"
                    ></View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="relative justify-center items-center px-8">
          <TouchableOpacity
            className="justify-center items-center text-center h-[42px] w-full absolute bottom-4 bg-[#7AB2B2] rounded-[10px]"
            onPress={() => router.push("/(tabs)/profile/skin-tone-analysis")}
          >
            <Text className="text-[16px] text-white">Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Result;
