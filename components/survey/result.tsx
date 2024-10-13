/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text } from "react-native";
import React from "react";

interface ResultProps {
  subSeason: string;
  complements: string[];
}

const Result: React.FC<ResultProps> = ({ subSeason, complements }) => {
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

  // Split the capitalized subSeason into two parts
  const [firstWord, ...restWords] = capitalizedSubSeason.split(" ");
  const secondLine = restWords.join(" ");

  // Function to chunk the colors array into rows of 7 elements each
  const chunkArray = (array: any[], chunkSize: number) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  // Split complements into rows of 7
  const chunkedColors = chunkArray(complements, 7);

  return (
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
  );
};

export default Result;
