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
import { categoryTypes } from "@/components/constants/clothing-details/categories";
import { occasion } from "@/components/constants/clothing-details/occasion";
import { COLOR_LIST } from "@/components/constants/clothing-details/color-list";
import { MATERIAL_LIST } from "@/components/constants/clothing-details/material";
import { PATTERN_LIST } from "@/components/constants/clothing-details/pattern";
import { seasons } from "@/components/constants/clothing-details/seasons";
import ClothingDetailsModal from "@/components/dialogs/ClothingDetailsModal";

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

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleItemPress = (id: string, imageUrl: string) => {
    setSelectedClothingImage(imageUrl);
    setSelectedClothingId(id);
    setIsModalVisible(true);
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
      const itemColor = item.color?.toLowerCase() ?? "";
      const itemMaterial = item.color?.toLowerCase() ?? "";
      const itemPattern = item.color?.toLowerCase() ?? "";
      const itemOccasion = Array.isArray(item.occasion)
        ? item.occasion.map((o) => (o as string).toLowerCase())
        : [];
      const itemSeason = Array.isArray(item.season)
        ? item.season.map((s) => (s as string).toLowerCase())
        : [];

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some(
          (filter) =>
            itemCategory.includes(filter.toLowerCase()) ||
            itemOccasion.includes(filter.toLowerCase()) ||
            itemSeason.includes(filter.toLowerCase()) ||
            itemColor.includes(filter.toLowerCase()) ||
            itemMaterial.includes(filter.toLowerCase()) ||
            itemPattern.includes(filter.toLowerCase())
        );

      return isSearchActive ? matchesSearch && hasDetails : matchesFilters;
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
          onRequestClose={() => setDropdownVisible(false)} // Close the modal
        >
          <View className="flex-1 justify-center items-center bg-black opacity-0">
            <Pressable
              style={{ flex: 1, width: "100%" }}
              onPress={() => setDropdownVisible(false)}
            />
          </View>
          <ScrollView
            style={{ maxHeight: 400 }}
            className="absolute top-64 mx-7 z-50 border-2 border-[#F2F2F2] bg-white p-3 rounded-lg shadow"
          >
            <View className="flex-row justify-between">
              <Text className="mb-2">FILTER</Text>
              <Pressable onPress={clearFilters}>
                <Text className="mb-2 underline underline-offset-2">Clear</Text>
              </Pressable>
            </View>

            <Text className="text-[#484848] text-[14px] mt-2">Season</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row flex-wrap">
                {seasons.map((season) => (
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
                      className={`${selectedFilters.includes(season) ? "text-white" : "text-[#7AB2B2]"}`}
                    >
                      {season}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text className="text-[#484848] text-[14px] mt-2">Occasion</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row flex-wrap">
                {occasion.map((occasion) => (
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
                      {occasion}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text className="text-[#484848] text-[14px] mt-2">Category</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row flex-wrap">
                {categoryNames.map((category) => (
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
                      className={`${selectedFilters.includes(category) ? "text-white" : "text-[#7AB2B2]"}`}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text className="text-[#484848] text-[14px] mt-2">Color</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row flex-wrap">
                {COLOR_LIST.map(({ name, colorCode }) => (
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
                      style={{ backgroundColor: colorCode }}
                      className="w-4 h-4 rounded-full mr-2 border-gray-400 border-[0.5px]"
                    />
                    <Text
                      className={`${
                        selectedFilters.includes(name.toLowerCase())
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text className="text-[#484848] text-[14px] mt-2">Material</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row flex-wrap">
                {MATERIAL_LIST.map(({ name, reference: IconComponent }) => (
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
                      <IconComponent
                        width={20}
                        height={20}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <Text
                      className={`${
                        selectedFilters.includes(name.toLowerCase())
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text className="text-[#484848] text-[14px] mt-2">Pattern</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row flex-wrap mb-6">
                {PATTERN_LIST.map(({ name, reference: IconComponent }) => (
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
                      <IconComponent
                        width={20}
                        height={20}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <Text
                      className={`${
                        selectedFilters.includes(name.toLowerCase())
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>

      <View className="h-[80%]">
        <FlatList
          className="mt-5 z-20 flex-grow"
          scrollEnabled={true}
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
            />
          )}
          numColumns={3}
          contentContainerStyle={{
            paddingBottom: 52,
          }}
          showsVerticalScrollIndicator={false}
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
      />
    </SafeAreaView>
  );
};

export default PiecesTab;
