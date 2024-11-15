import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/common/Header";
import { useUser } from "@/components/config/user-context";
import ClothingCard from "@/components/cards/DesignPiecesCard";
import ClosetCard from "@/components/cards/DesignClosetCard";

const DesignPage = () => {
  const { user } = useUser();
  const closets = user?.closets || [];
  const clothes = user?.clothes ?? [];
  const clothesLength = clothes.length;
  const closetsLength = closets.length;
  const snapPoints = useMemo(() => ["45%", "80%"], []);
  const bottomSheet = useRef(null);
  const [activeTab, setActiveTab] = useState("Pieces");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
      onPress={handleItemPress}
      selected={selectedImages.includes(item.image_url)} // Pass selected state
    />
  );

  const handleItemPress = (clothingId: string, imageUrl: string) => {
    setSelectedImages((current) =>
      current.includes(imageUrl)
        ? current.filter((url) => url !== imageUrl) // Remove image if already selected
        : [...current, imageUrl] // Add image if not already selected
    );
  };
  

  return (
    <GestureHandlerRootView className="flex-1">
      <Header />

      {/* Empty View with Selected Images */}
      <View className="w-full border-t border-[#D9D9D9] h-72 mt-6 items-center justify-center bg-gray-200 relative">
        {selectedImages.length > 0 ? (
          <View
            className="absolute top-1/2 left-1/2"
            style={{ transform: [{ translateX: -48 }, { translateY: -48 }] }}
          >
            {selectedImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                className="w-24 h-24 absolute"
                style={{
                  top: index * 5,
                  left: index * 2,
                  zIndex: selectedImages.length,
                }}
                resizeMode="contain"
              />
            ))}
          </View>
        ) : (
          <Text className="text-gray-500 font-bold">
            Create your own outfit
          </Text>
        )}
      </View>

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
                data={closets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCloset}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 16 }}
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
                data={clothes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderClothing}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 16 }}
              />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DesignPage;
