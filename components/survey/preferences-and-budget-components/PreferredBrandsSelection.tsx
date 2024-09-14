import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import SheinLogo from '../../../assets/images/shein.jpeg';
import PenshoppeLogo from '../../../assets/images/penshoppe.png';
import UniqloLogo from '../../../assets/images/uniqlo.jpg';
import BenchLogo from '../../../assets/images/bench.jpg';

const brandsList = [
  { name: "Shein", logo: SheinLogo },
  { name: "Penshoppe", logo: PenshoppeLogo },
  { name: "Uniqlo", logo: UniqloLogo },
  { name: "Bench", logo: BenchLogo },
];

const PreferredBrandSelection = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleBrandSelection = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const visibleBrands = showAll ? brandsList : brandsList.slice(0, 4);

  return (
    <View>
      <View className="flex-wrap flex-row">
        {visibleBrands.map((brand, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <TouchableOpacity
              className={`m-1 px-4 py-2 border-2 rounded-full flex-row items-center ${
                selectedBrands.includes(brand.name)
                  ? 'border-gray-900 bg-gray-200 border-[1px] text-white'
                  : 'border-[#7AB2B2] border-[1px]'
              }`}
              onPress={() => toggleBrandSelection(brand.name)}
            >
              <Image
                source={brand.logo}
                style={{ width: 24, height: 24, marginRight: 8,  borderRadius: 12, }}
                resizeMode="contain"
              />
              <Text className="text-base">{brand.name}</Text>
            </TouchableOpacity>

            {/* Show More/Show Less Links */}
            {!showAll && brandsList.length > 4 && index === 3 && (
              <TouchableOpacity onPress={() => setShowAll(true)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">Show more...</Text>
              </TouchableOpacity>
            )}
            {showAll && index === brandsList.length - 1 && (
              <TouchableOpacity onPress={() => setShowAll(false)}>
                <Text className="text-[#7AB2B2] text-base ml-4 mt-4">Show less</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PreferredBrandSelection;
