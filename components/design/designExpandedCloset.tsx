import React from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import { usePathname } from "expo-router";
import { useUser } from "@/components/config/user-context";
import { getIdFromUrl } from "@/utils/helpers/get-closet-id";
import ClothingCard from "@/components/cards/ClothingCard";

const DesignExpandedCloset = () => {
  const { user } = useUser();
  const path = usePathname();
  const closetId = getIdFromUrl(path);

  console.log("Closet ID:", closetId);

  const currentCloset = user?.closets?.find((closet) => closet.id === closetId);
  console.log("Current Closet:", currentCloset);

  const filteredClothes =
    user?.clothes?.filter((clothing) => clothing.closet_id === closetId) || [];

  console.log("Filtered Clothes:", filteredClothes);

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-5 flex-1">
        <View className="items-center border-b pb-5 border-[#F3F3F3]">
          <Text className="text-xl font-bold text-center">
            {currentCloset?.name || "Closet Title"}
          </Text>
          <Text className="text-base">
            {currentCloset?.description || "Closet Description"}
          </Text>
        </View>
        {filteredClothes.length === 0 ? (
          <View className="items-center">
            <Text className="text-[#B7B7B7]">
              This closet has no clothes yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredClothes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ClothingCard
                clothingId={item.id}
                uri={item.image_url}
                onPress={() => {}}
                closetClothes={[]}
              />
            )}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 16 }}
            className="flex-grow"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DesignExpandedCloset;
