import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import PenshoppeLogo from "../../../assets/images/penshoppe.svg";
import BenchLogo from "../../../assets/images/bench.svg";

const brandsList = [
  { name: "Penshoppe", logo: PenshoppeLogo },
  { name: "Bench", logo: BenchLogo },
];

const PreferredBrandSelection = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleBrandSelection = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const visibleBrands = showAll ? brandsList : brandsList.slice(0, 4);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleBrands.map((brandName, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <TouchableOpacity
              className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                selectedBrands.includes(brandName.name)
                  ? "bg-[#7AB2B2] border-[#7AB2B2]"
                  : "bg-white border-[#7AB2B2]"
              }`}
              onPress={() => toggleBrandSelection(brandName.name)}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  overflow: "hidden",
                  marginRight: 8,
                }}
              >
                <brandName.logo width="100%" height="100%" />
              </View>
              <Text
                className={`text-base ${
                  selectedBrands.includes(brandName.name)
                    ? "text-white"
                    : "text-[#7AB2B2]"
                }`}
              >
                {brandName.name}
              </Text>
            </TouchableOpacity>
            {!showAll && brandsList.length > 4 && index === 3 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">
                  Show more...
                </Text>
              </TouchableOpacity>
            )}
            {showAll && index === brandsList.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">
                  Show less
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PreferredBrandSelection;
