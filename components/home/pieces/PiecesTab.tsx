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
import PiecesCard from "@/components/cards/PiecesCard";
import { useUser } from "@/components/config/user-context";
import { categoryTypes } from "@/components/constants/clothing-details/categories";
import { occasion } from "@/components/constants/clothing-details/occasion";

const PiecesTab = () => {
  const { user } = useUser();
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

  const categoryNames = Object.keys(categoryTypes);

  const searchFieldMatch = (field: string | string[] | null | never) => {
    if (typeof field === "string") {
      return field.toLowerCase().includes(search.toLowerCase());
    } else if (Array.isArray(field)) {
      return field.some(
        (f) =>
          typeof f === "string" &&
          f.toLowerCase().includes(search.toLowerCase())
      );
    }
    return false;
  };

  const filteredClothes =
    user?.clothes.filter((item) => {
      const hasDetails =
        item.name &&
        item.category &&
        item.brand &&
        item.color &&
        item.material &&
        item.season &&
        item.pattern;

      const isSearchActive = search.length > 0;

      const matchesSearch =
        !isSearchActive ||
        [
          item.name,
          item.color,
          item.brand,
          item.season,
          item.pattern,
          item.material,
        ].some((field) => searchFieldMatch(field));

      const itemCategory = item.category?.name?.toLowerCase() ?? "";
      const itemOccasion = Array.isArray(item.occasion)
        ? item.occasion.map((o) => (o as string).toLowerCase())
        : [];

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some(
          (filter) =>
            itemCategory.includes(filter.toLowerCase()) ||
            itemOccasion.includes(filter.toLowerCase())
        );

      return isSearchActive ? matchesSearch && hasDetails : matchesFilters;
    }) ?? [];

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

        {dropdownVisible && (
          <View className="absolute top-16 right-0 left-0 z-50 border border-[#F2F2F2] bg-white p-3 rounded-lg shadow">
            <View className="flex-row justify-between">
              <Text className="mb-2">FILTER by</Text>
              <Pressable onPress={clearFilters}>
                <Text className="mb-2 underline underline-offset-2">Clear</Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap">
              <Text className="text-[#7AB2B2] text-[16px] mt-2">Category</Text>
              <View className="flex-row flex-wrap">
                {categoryNames.map((category) => (
                  <Pressable
                    key={category}
                    onPress={() => toggleFilter(category)}
                    className={`m-1 px-4 py-1 border-[1.5px] border-[#7AB2B2] rounded-[10px] ${
                      selectedFilters.includes(category)
                        ? "bg-[#7AB2B2]"
                        : "bg-white"
                    }`}
                  >
                    <Text
                      className={`${
                        selectedFilters.includes(category)
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="flex-row flex-wrap">
              <Text className="text-[#7AB2B2] text-[16px] mt-2">Occasion</Text>
              <View className="flex-row flex-wrap">
                {occasion.map((occasion) => (
                  <Pressable
                    key={occasion}
                    onPress={() => toggleFilter(occasion)}
                    className={`m-1 px-4 py-1 border-[1.5px] border-[#7AB2B2] rounded-[10px] ${
                      selectedFilters.includes(occasion)
                        ? "bg-[#7AB2B2]"
                        : "bg-white"
                    }`}
                  >
                    <Text
                      className={`${
                        selectedFilters.includes(occasion)
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {occasion}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      <FlatList
        className="mt-5 z-20"
        data={filteredClothes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PiecesCard
            uri={
              item.image_url ||
              "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square-300x300.jpg"
            }
            name={""}
          />
        )}
        numColumns={3}
      />

      {filteredClothes.length === 0 && (
        <Text className="text-center mt-5">No items found.</Text>
      )}
    </SafeAreaView>
  );
};

export default PiecesTab;
