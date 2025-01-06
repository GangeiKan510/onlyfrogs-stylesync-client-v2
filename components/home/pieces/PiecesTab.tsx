/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FilterIcon from "../../../assets/icons/filter-icon.svg";
import ClothingCard from "@/components/cards/ClothingCard";
import { useUser } from "@/components/config/user-context";
import getColorHexCode from "@/utils/clothingUtils/colorUtils";
import getMaterialSvg from "@/utils/clothingUtils/materialUtils";
import getPatternSvg from "@/utils/clothingUtils/patternUtils";
import ClothingDetailsModal from "@/components/dialogs/ClothingDetailsModal";
import { COLOR_LIST } from "@/components/constants/color-list";

const PiecesTab = () => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClothingImage, setSelectedClothingImage] = useState<
    string | null
  >(null);
  const [selectedClothingId, setSelectedClothingId] = useState<string | null>(
    null
  );
  const [selectedClothingCount, setSelectedClothingCount] = useState<number>(0);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleItemPress = (id: string, imageUrl: string) => {
    const selectedClothing = filteredClothes.find((item) => item.id === id);
    const wornCount = selectedClothing?.worn?.[0]?.count ?? 0;

    setSelectedClothingImage(imageUrl);
    setSelectedClothingId(id);
    setIsModalVisible(true);
    setSelectedClothingCount(wornCount);
  };

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

  const filterOptions = () => {
    const filterOptions = {
      season: new Set<string>(),
      occasion: new Set<string>(),
      category: new Set<string>(),
      color: new Set<{ name: string; colorCode: string }>(),
      material: new Set<string>(),
      pattern: new Set<string>(),
      worn: new Set<string>(),
    };

    const allClothes = user?.closets?.flatMap((closet) => closet.clothes) ?? [];

    allClothes.forEach((item) => {
      item.seasons?.forEach((season) =>
        filterOptions.season.add(season.season)
      );

      item.occasions?.forEach((occasion) =>
        filterOptions.occasion.add(occasion.occasion)
      );

      item.categories?.forEach((category) =>
        filterOptions.category.add(category.category)
      );

      if (
        typeof item.color === "string" &&
        !Array.from(filterOptions.color).some(
          (color) => color.name === item.color
        )
      ) {
        const colorCode = getColorHexCode(item.color, COLOR_LIST) || "#FFFFFF";
        filterOptions.color.add({ name: item.color, colorCode });
      }

      if (item.material) filterOptions.material.add(item.material);

      if (item.pattern) filterOptions.pattern.add(item.pattern);

      const wornCount = item.worn?.[0]?.count ?? 0;
      if (wornCount === 0) filterOptions.worn.add("Never Worn");
      else if (wornCount >= 1 && wornCount <= 5)
        filterOptions.worn.add("Less Often Worn");
      else if (wornCount >= 6 && wornCount <= 10)
        filterOptions.worn.add("Frequently Worn");
      else if (wornCount > 10) filterOptions.worn.add("Very Frequently Worn");
    });

    return {
      season: Array.from(filterOptions.season),
      occasion: Array.from(filterOptions.occasion),
      category: Array.from(filterOptions.category),
      color: Array.from(filterOptions.color),
      material: Array.from(filterOptions.material),
      pattern: Array.from(filterOptions.pattern),
      worn: Array.from(filterOptions.worn),
    };
  };

  const itemFilterOptions = filterOptions();

  const hasFilterOptions = Object.values(itemFilterOptions).some(
    (optionArray) => optionArray.length > 0
  );

  const allClothes = user?.closets?.flatMap((closet) => closet.clothes) ?? [];

  const filteredClothes =
    allClothes.filter((item) => {
      const matchesSearch =
        search.length === 0 ||
        [
          item.name,
          item.color,
          item.brand,
          item.pattern,
          item.material,
          ...item.categories.map((category) => category.category),
          ...item.seasons.map((season) => season.season),
          ...item.occasions.map((occasion) => occasion.occasion),
        ].some((field: any) =>
          field?.toLowerCase().includes(search.toLowerCase())
        );

      const itemSeason = item.seasons.map((season) =>
        season.season.toLowerCase()
      );
      const itemOccasion = item.occasions.map((occasion) =>
        occasion.occasion.toLowerCase()
      );
      const itemCategory = item.categories.map((category) =>
        category.category.toLowerCase()
      );
      let itemColor: any = item.color;
      itemColor = itemColor?.toLowerCase() ?? "";
      const itemMaterial = item.material?.toLowerCase() ?? "";
      const itemPattern = item.pattern?.toLowerCase() ?? "";

      const wornCount = item.worn?.[0]?.count ?? 0;
      const itemWorn =
        wornCount === 0
          ? "Never Worn"
          : wornCount >= 1 && wornCount <= 5
            ? "Less Often Worn"
            : wornCount >= 6 && wornCount <= 10
              ? "Frequently Worn"
              : "Very Frequently Worn";

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some((filter) =>
          [
            ...itemSeason,
            ...itemOccasion,
            ...itemCategory,
            itemColor,
            itemMaterial,
            itemPattern,
            itemWorn.toLowerCase(),
          ].includes(filter.toLowerCase())
        );

      return matchesSearch && matchesFilters;
    }) ?? [];

  return (
    <SafeAreaView className="flex-grow">
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

        <Modal
          transparent={true}
          visible={dropdownVisible}
          animationType="none"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black opacity-0">
            <Pressable
              style={{ flex: 1, width: "100%" }}
              onPress={() => setDropdownVisible(false)}
            />
          </View>
          <ScrollView
            style={{ maxHeight: 400 }}
            className="w-[85%] absolute top-64 right-7 z-50 border-2 border-[#F2F2F2] bg-white p-3 rounded-lg shadow"
          >
            {hasFilterOptions ? (
              <>
                <View className="flex-row justify-between">
                  <Text className="mb-2">FILTER</Text>
                  <Pressable onPress={clearFilters}>
                    <Text className="mb-2 underline underline-offset-2">
                      Clear
                    </Text>
                  </Pressable>
                </View>

                <Text className="text-[#484848] text-[14px] mt-2">Season</Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap">
                    {itemFilterOptions.season.map((season) => (
                      <Pressable
                        key={season}
                        onPress={() => toggleFilter(season)}
                        className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] rounded-[10px] ${
                          selectedFilters.includes(season)
                            ? "bg-[#7AB2B2]"
                            : "bg-white"
                        }`}
                      >
                        <Text
                          className={`${
                            selectedFilters.includes(season)
                              ? "text-white"
                              : "text-[#7AB2B2]"
                          }`}
                        >
                          {season.replace(/^\w/, (c) => c.toUpperCase())}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <Text className="text-[#484848] text-[14px] mt-2">
                  Occasion
                </Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap">
                    {itemFilterOptions.occasion.map((occasion) => (
                      <Pressable
                        key={occasion}
                        onPress={() => toggleFilter(occasion)}
                        className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] rounded-[10px] ${
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
                          {occasion.replace(/^\w/, (c) => c.toUpperCase())}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <Text className="text-[#484848] text-[14px] mt-2">
                  Category
                </Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap">
                    {itemFilterOptions.category.map((category) => (
                      <Pressable
                        key={category}
                        onPress={() => toggleFilter(category)}
                        className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] rounded-[10px] ${
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
                          {category.replace(/^\w/, (c) => c.toUpperCase())}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <Text className="text-[#484848] text-[14px] mt-2">Color</Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap">
                    {itemFilterOptions.color.map(({ name, colorCode }) => (
                      <Pressable
                        key={name}
                        onPress={() => toggleFilter(name.toLowerCase())}
                        className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] flex-row items-center rounded-[10px] ${
                          selectedFilters.includes(name.toLowerCase())
                            ? "bg-[#7AB2B2]"
                            : "bg-white"
                        }`}
                      >
                        <View
                          className={`w-4 h-4 rounded-full mr-2 border-gray-400 border-[0.5px]`}
                          style={{ backgroundColor: colorCode }}
                        />

                        <Text
                          className={`${
                            selectedFilters.includes(name.toLowerCase())
                              ? "text-white"
                              : "text-[#7AB2B2]"
                          }`}
                        >
                          {name.replace(/^\w/, (c) => c.toUpperCase())}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <Text className="text-[#484848] text-[14px] mt-2">
                  Material
                </Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap">
                    {itemFilterOptions.material.map((name) => {
                      const MaterialSvg = getMaterialSvg(name);

                      return (
                        <Pressable
                          key={name}
                          onPress={() => toggleFilter(name.toLowerCase())}
                          className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] flex-row items-center rounded-[10px] ${
                            selectedFilters.includes(name.toLowerCase())
                              ? "bg-[#7AB2B2]"
                              : "bg-white"
                          }`}
                        >
                          <View className="mr-2 rounded-lg overflow-hidden">
                            {MaterialSvg && (
                              <MaterialSvg width={16} height={16} />
                            )}
                          </View>

                          <Text
                            className={`${
                              selectedFilters.includes(name.toLowerCase())
                                ? "text-white"
                                : "text-[#7AB2B2]"
                            }`}
                          >
                            {name.replace(/^\w/, (c) => c.toUpperCase())}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <Text className="text-[#484848] text-[14px] mt-2">Pattern</Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap mb-6">
                    {itemFilterOptions.pattern.map((name) => {
                      const PatternSvg = getPatternSvg(name);
                      return (
                        <Pressable
                          key={name}
                          onPress={() => toggleFilter(name.toLowerCase())}
                          className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] flex-row items-center rounded-[10px] ${
                            selectedFilters.includes(name.toLowerCase())
                              ? "bg-[#7AB2B2]"
                              : "bg-white"
                          }`}
                        >
                          <View className="mr-2 rounded-lg overflow-hidden">
                            {PatternSvg && (
                              <PatternSvg width={16} height={16} />
                            )}
                          </View>

                          <Text
                            className={`${
                              selectedFilters.includes(name.toLowerCase())
                                ? "text-white"
                                : "text-[#7AB2B2]"
                            }`}
                          >
                            {name.replace(/^\w/, (c) => c.toUpperCase())}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <Text className="text-[#484848] text-[14px] ">Wear Count</Text>
                <View className="flex-row flex-wrap">
                  <View className="flex-row flex-wrap mb-6">
                    {itemFilterOptions.worn.map((itemWorn) => {
                      return (
                        <Pressable
                          key={itemWorn}
                          onPress={() => toggleFilter(itemWorn.toLowerCase())}
                          className={`m-1 px-2 py-1 border-[1px] border-[#7AB2B2] flex-row items-center rounded-[10px] ${
                            selectedFilters.includes(itemWorn.toLowerCase())
                              ? "bg-[#7AB2B2]"
                              : "bg-white"
                          }`}
                        >
                          <Text
                            className={`${
                              selectedFilters.includes(itemWorn.toLowerCase())
                                ? "text-white"
                                : "text-[#7AB2B2]"
                            }`}
                          >
                            {itemWorn}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              <View className="h-20 items-center justify-center">
                <Text className="text-[16px] text-center text-gray-500 font-semibold mb-2">
                  Nothing to filter yet.
                </Text>
                <Text className="text-center text-gray-500">
                  Add details to your items to start filtering
                </Text>
              </View>
            )}
          </ScrollView>
        </Modal>
      </View>

      <View className="h-[100%]">
        <FlatList
          className="mt-5 z-20 flex-grow"
          data={filteredClothes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClothingCard
              clothingId={item.id}
              uri={
                item.image_url ||
                "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square-300x300.jpg"
              }
              onPress={() => handleItemPress(item.id, item.image_url)}
              closetClothes={allClothes}
            />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 1 }} />}
          ListEmptyComponent={
            <Text className="text-center mt-5">No items found.</Text>
          }
        />
      </View>

      {filteredClothes.length === 0 && (
        <Text className="text-center mt-5">No items found.</Text>
      )}

      <ClothingDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        clothingImage={selectedClothingImage}
        clothingId={selectedClothingId}
        wornCount={selectedClothingCount}
      />
    </SafeAreaView>
  );
};

export default PiecesTab;
