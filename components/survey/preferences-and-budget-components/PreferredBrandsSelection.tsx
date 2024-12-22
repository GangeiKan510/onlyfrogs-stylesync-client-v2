/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import PenshoppeLogo from "../../../assets/images/penshoppe.svg";
import BenchLogo from "../../../assets/images/bench.svg";

const brandsList = [
  { name: "Penshoppe", logo: PenshoppeLogo },
  { name: "Bench", logo: BenchLogo },
];

const PreferredBrandSelection = ({ selectedBrands, onBrandsChange }: any) => {
  const [showAll, setShowAll] = useState(false);

  const toggleBrandSelection = (brandName: string) => {
    const updatedBrands = selectedBrands?.includes(brandName)
      ? selectedBrands.filter((brand: string) => brand !== brandName)
      : [...selectedBrands, brandName];
    onBrandsChange(updatedBrands);
  };

  const visibleBrands = showAll ? brandsList : brandsList.slice(0, 4);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleBrands.map((brand, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <TouchableOpacity
              className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                selectedBrands?.includes(brand.name)
                  ? "bg-[#7AB2B2] border-[#7AB2B2]"
                  : "bg-white border-[#7AB2B2]"
              }`}
              onPress={() => toggleBrandSelection(brand.name)}
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
                <brand.logo width="100%" height="100%" />
              </View>
              <Text
                className={`text-base ${
                  selectedBrands?.includes(brand.name)
                    ? "text-white"
                    : "text-[#7AB2B2]"
                }`}
              >
                {brand.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {!showAll && brandsList.length > 4 && (
        <TouchableOpacity onPress={() => setShowAll(true)}>
          <Text className="text-[#7AB2B2] text-base ml-4 mt-4">
            Show more...
          </Text>
        </TouchableOpacity>
      )}
      {showAll && (
        <TouchableOpacity onPress={() => setShowAll(false)}>
          <Text className="text-[#7AB2B2] text-base ml-4 mt-4">Show less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PreferredBrandSelection;
