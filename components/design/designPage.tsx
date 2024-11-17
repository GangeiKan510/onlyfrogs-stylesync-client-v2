import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  PanResponder,
} from "react-native";
import { useMemo, useRef, useState, useEffect } from "react";
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
  const bottomSheet = useRef<BottomSheet>(null);
  const [activeTab, setActiveTab] = useState("Pieces");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [dragPositions, setDragPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  useEffect(() => {
    bottomSheet.current?.snapToIndex(0);
  }, [activeTab, closets, clothes]);

  const renderCloset = ({
    item: closet,
  }: {
    item: { id: string; name: string };
  }) => {
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

  const renderClothing = ({
    item,
  }: {
    item: { id: string; image_url: string };
  }) => (
    <ClothingCard
      clothingId={item.id}
      uri={
        item.image_url ||
        "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square-300x300.jpg"
      }
      onPress={handleItemPress}
      selected={selectedImages.includes(item.image_url)}
    />
  );

  const handleItemPress = (clothingId: string, image_url: string) => {
    setSelectedImages((current) =>
      current.includes(image_url)
        ? current.filter((url) => url !== image_url)
        : [...current, image_url]
    );

    setDragPositions((current) => ({
      ...current,
      [image_url]: { x: -48, y: -48 },
    }));
  };

  const panResponder = (image: string) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setDragPositions((prevPositions) => {
          const { x = 0, y = 0 } = prevPositions[image] || { x: -48, y: -48 };
  
          const imageWidth = 96; // Width of the draggable image
          const imageHeight = 96; // Height of the draggable image
  
          const offsetLeft = 130; // Left boundary offset
          const offsetRight = 130; // Right boundary offset
          const offsetTop = 80; // Top boundary offset
          const offsetBottom = 80; // Bottom boundary offset
  
          const newX = Math.min(
            Math.max(x + gestureState.dx, -imageWidth / 2 - offsetLeft),
            offsetRight - imageWidth / 2
          );
  
          const newY = Math.min(
            Math.max(y + gestureState.dy, -imageHeight / 2 - offsetTop),
            offsetBottom - imageHeight / 2
          );
  
          return {
            ...prevPositions,
            [image]: { x: newX, y: newY },
          };
        });
      },
    });
  

  return (
    <GestureHandlerRootView className="flex-1">
      <Header />

      <View className="w-full border-t border-[#D9D9D9] h-72 mt-6 items-center justify-center bg-gray-200 relative">
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <View
              {...panResponder(image).panHandlers}
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [
                  { translateX: dragPositions[image]?.x || -48 },
                  { translateY: dragPositions[image]?.y || -48 },
                ],
              }}
            >
              <Image
                source={{ uri: image }}
                className="w-24 h-24 absolute"
                resizeMode="contain"
              />
            </View>
          ))
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
