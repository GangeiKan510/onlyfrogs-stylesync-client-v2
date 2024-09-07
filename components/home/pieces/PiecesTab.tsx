import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FilterIcon from "../../../assets/icons/filter-icon.svg";

// Dummy data
const items = [
  { id: "1", category: "Formal", name: "Suit" },
  { id: "2", category: "Casual", name: "T-shirt" },
  { id: "3", category: "Street", name: "Jacket" },
  { id: "4", category: "Sweater", name: "Cardigan" },
  { id: "5", category: "Summer", name: "Shorts" },
  { id: "6", category: "Costume", name: "Elf" },
];

const PiecesTab = () => {
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleDropdownVisibility = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredItems = items.filter(
    (item) =>
      (selectedFilters.length === 0 ||
        selectedFilters.includes(item.category)) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View className="w-full">
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center flex-1 border-b border-black">
            <TextInput
              className="flex-1 h-10 p-2"
              onChangeText={setSearch}
              value={search}
              placeholder="Search for pieces"
            />
            <Ionicons
              name="search-outline"
              size={24}
              color="black"
              className="mr-2"
            />
          </View>
          <Pressable onPress={toggleDropdownVisibility}>
            <FilterIcon width={24} height={24} />
          </Pressable>
        </View>

        {/* Floating Dropdown filter options */}
        {dropdownVisible && (
          <View className="absolute top-16 right-0 left-0 z-10 border border-[#F2F2F2] bg-white p-3 rounded-lg shadow">
            <View className="flex-row justify-between">
              <Text className="mb-2">FILTER</Text>
              <Pressable onPress={clearFilters}>
                <Text className="mb-2 underline underline-offset-2">Clear</Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap">
              {[
                "Formal",
                "Casual",
                "Street",
                "Sweater",
                "Summer",
                "Costume",
              ].map((filter) => (
                <Pressable
                  key={filter}
                  className={`m-1 px-4 py-1 border-[1.5px] border-[#7AB2B2] rounded-[10px] ${
                    selectedFilters.includes(filter)
                      ? "bg-[#7AB2B2]"
                      : "bg-white"
                  }`}
                  onPress={() => toggleFilter(filter)}
                >
                  <Text
                    className={`text-center ${
                      selectedFilters.includes(filter)
                        ? "text-white"
                        : "text-[#7AB2B2]"
                    }`}
                  >
                    {filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-2 border-b border-gray-300">
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PiecesTab;
