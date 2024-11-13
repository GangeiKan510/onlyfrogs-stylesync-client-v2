import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/common/Header";
import { useUser } from "@/components/config/user-context";
import ClothingCard from "@/components/cards/ClothingCard";
import ClosetCard from "@/components/cards/ClosetCard";

const DesignPage = () => {
  const { user } = useUser();
  const closets = user?.closets || [];
  const clothes = user?.clothes ?? [];
  const clothesLength = clothes.length;
  const closetsLength = closets.length;
  const snapPoints = useMemo(() => ["45%", "80%"], []);
  const bottomSheet = useRef(null);
  const [activeTab, setActiveTab] = useState("Closet");

  const renderCloset = ({ item: closet }) => {
    const clothingInCloset = user?.clothes.filter(
      (clothing) => clothing.closet_id === closet.id
    );

    const imageUri =
      clothingInCloset && clothingInCloset.length > 0
        ? clothingInCloset[0].image_url
        : "https://lh3.googleusercontent.com/pw/AP1GczMpwiLxbGQkZGPAbApzNsZPrj7I8aqlXXj1gVqKU4UindflHV1YdgnaH3yWBP35nufvm1dZNmYcoCBg1XrBed4zrYPt8VuOgpWjZk0vZfW56vuptA=w2400";

    return (
      <ClosetCard
        key={closet.id}
        id={closet.id}
        name={closet.name}
        uri={imageUri}
      />
    );
  };

  const renderClothing = ({ item }) => (
    <ClothingCard
      clothingId={item.id}
      uri={
        item.image_url ||
        "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square-300x300.jpg"
      }
      onPress={() => handleItemPress(item.id, item.image_url)}
    />
  );

  const handleItemPress = (id: string, imageUrl: string) => {
    console.log("Pressed item:", id, imageUrl);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <Header />
      <View className="w-full border-t border-[#D9D9D9] h-72 mt-6"></View>
      <BottomSheet
        ref={bottomSheet}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#DFDFDF" }}
        handleIndicatorStyle={{
          backgroundColor: "#7AB2B2",
          width: 40,
          height: 5,
        }}
      >
        <BottomSheetView className="flex-1 p-3 items-center">
          {/* Tabs */}
          <View className="flex flex-row px-10 w-full justify-between mb-[-2px]">
            <TouchableOpacity
              onPress={() => setActiveTab("Closet")}
              className="flex-1 items-center py-3 z-10"
            >
              <View
                className={`${
                  activeTab === "Closet" ? "border-b-[2px] border-black" : ""
                }`}
              >
                <Text
                  className={`text-sm ${
                    activeTab === "Closet"
                      ? "text-black font-bold"
                      : "text-gray-800"
                  }`}
                >
                  Closet ({closetsLength})
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("Pieces")}
              className="flex-1 items-center py-3 z-10"
            >
              <View
                className={`${
                  activeTab === "Pieces" ? "border-b-[2px] border-black" : ""
                }`}
              >
                <Text
                  className={`text-sm ${
                    activeTab === "Pieces"
                      ? "text-black font-bold"
                      : "text-gray-800"
                  }`}
                >
                  Pieces ({clothesLength})
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-full h-[2px] bg-white" />
          
          {/* Closet Tab */}
          {activeTab === "Closet" && (
            <View className="h-[80%]">
              <FlatList
                key={activeTab}
                className="mt-5 z-20 flex-grow px-2"
                scrollEnabled={true}
                data={closets} // Use the closets data here
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCloset}
                numColumns={3}
              />
            </View>
          )}

          {/* Pieces Tab */}
          {activeTab === "Pieces" && (
            <View className="h-[80%]">
              <FlatList
                key={activeTab}
                className="mt-5 z-20 flex-grow px-2"
                scrollEnabled={true}
                data={clothes} // Use the clothes data here
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderClothing}
                numColumns={3}
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DesignPage;
