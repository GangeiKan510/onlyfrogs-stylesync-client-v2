/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PanResponder,
  Pressable,
  Animated,
  Modal,
  TextInput,
} from "react-native";
import { useMemo, useRef, useState, useEffect } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import Header from "@/components/common/Header";
import { useUser } from "@/components/config/user-context";
import ClothingCard from "@/components/cards/DesignPiecesCard";
import ClosetCard from "@/components/cards/DesignClosetCard";
import ResizeArrow from "../../assets/icons/resize.svg";
import CloseIcon from "../../assets/icons/close-icon.svg";
import Save from "../../assets/icons/save.svg";
import { createFit } from "@/network/web/fits";
import Spinner from "../common/Spinner";
import Toast from "react-native-toast-message";
import BackIcon from "@/assets/icons/return-icon.svg";
import ResetIcon from "@/assets/icons/reset-icon.svg";

const DesignPage = () => {
  const { user, refetchMe } = useUser();
  const closets = user?.closets || [];
  const clothes = user?.closets?.flatMap((closet) => closet.clothes) ?? [];
  const clothesLength = clothes.length;
  const closetsLength = closets.length;

  console.log("Clothes", user?.closets[0].clothes);
  console.log("Closets", user?.closets);

  const snapPoints = useMemo(() => ["30%", "80%"], []);
  const bottomSheet = useRef<BottomSheet>(null);
  const viewToSnapshotRef = useRef<View | null>(null);
  const [snapshotImg, setSnapshotImg] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("Pieces");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPiecesIds, setSelectedPiecesIds] = useState<string[]>([]);
  const [dragPositions, setDragPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageSizes, setImageSizes] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
  const [activeGesture, setActiveGesture] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [snapshotName, setSnapshotName] = useState("");
  const [selectedClosetId, setSelectedClosetId] = useState<string | null>(null);
  const filteredClothes =
    user?.closets?.find((closet) => closet.id === selectedClosetId)?.clothes ??
    [];
  const [isSavingFit, setIsSavingFit] = useState(false);

  const snapshot = async () => {
    const result = await captureRef(viewToSnapshotRef);
    console.log(result);
    setSnapshotImg(result);
    setShowModal(true);
  };

  const closeModal = () => {
    setSnapshotName("");
    setShowModal(false);
  };

  const saveSnapshot = async () => {
    if (!snapshotName || !snapshotImg || selectedPiecesIds.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields are required to save the fit.",
        position: "top",
      });
      return;
    }

    setIsSavingFit(true);
    try {
      const response = await fetch(snapshotImg);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const thumbnailFile = new File([blob], `${snapshotName}-thumbnail.png`, {
        type: "image/png",
      });

      const formData = new FormData();
      formData.append("name", snapshotName);
      formData.append("user_id", user?.id || "");
      selectedPiecesIds.forEach((id) => formData.append("piece_ids[]", id));
      formData.append("thumbnail", {
        uri: snapshotImg,
        name: thumbnailFile.name || `${snapshotName}-thumbnail.png`,
        type: "image/png",
      } as any);

      console.log("Form Data Contents:", formData);

      await createFit(formData);

      refetchMe();

      Toast.show({
        type: "success",
        text1: "Fit Saved",
        text2: "Your new outfit has been saved successfully!",
        position: "top",
      });

      setSnapshotName("");
      setSnapshotImg(undefined);
      setSelectedImages([]);
      setSelectedPiecesIds([]);
      setDragPositions({});
      setImageSizes({});
      closeModal();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: "An error occurred while saving the fit.",
        position: "top",
      });
      console.error("Error saving fit:", error);
    } finally {
      setIsSavingFit(false);
    }
  };

  useEffect(() => {
    bottomSheet.current?.snapToIndex(0);
  }, [activeTab, closets, clothes]);

  const renderCloset = ({ item: closet }: { item: any }) => {
    const clothingInCloset = closet.clothes ?? [];
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
        onPress={() => setSelectedClosetId(closet.id)}
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
      onPress={() => handleItemPress(item.id, item.image_url)}
      selected={selectedImages.includes(item.image_url)}
    />
  );

  const handleItemPress = (clothingId: string, image_url: string) => {
    setSelectedImages((current) => {
      const isSelected = current.includes(image_url);

      if (isSelected) {
        setImageSizes((prevSizes) => {
          const { [image_url]: _, ...remainingSizes } = prevSizes;
          return remainingSizes;
        });

        setDragPositions((prevPositions) => {
          const { [image_url]: _, ...remainingPositions } = prevPositions;
          return remainingPositions;
        });
      }

      return isSelected
        ? current.filter((url) => url !== image_url)
        : [...current, image_url];
    });

    setSelectedPiecesIds((current) => {
      const isSelected = current.includes(clothingId);

      return isSelected
        ? current.filter((id) => id !== clothingId)
        : [...current, clothingId];
    });

    if (!selectedImages.includes(image_url)) {
      setDragPositions((current) => ({
        ...current,
        [image_url]: { x: -5, y: -10 },
      }));
    }
  };

  const handleImageSelection = (image: string) => {
    console.log("Resize image");
    setSelectedImage((prev) => (prev === image ? null : image));
  };

  const handleRemoveImage = (image: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img !== image)
    );
  };

  const clearSelection = () => {
    setSelectedImages([]);
    setSelectedPiecesIds([]);
    setDragPositions({});
    setImageSizes({});
  };

  const panResponder = (image: string) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        activeGesture === null || activeGesture === "dragging",
      onMoveShouldSetPanResponder: () =>
        activeGesture === null || activeGesture === "dragging",
      onPanResponderGrant: () => setActiveGesture("dragging"),
      onPanResponderMove: (e, gestureState) => {
        setDragPositions((prevPositions) => {
          const { x = 0, y = 0 } = prevPositions[image] || { x: 0, y: 0 };
          const { width = 96, height = 96 } = imageSizes[image] || {
            width: 96,
            height: 96,
          };

          const containerWidth = 380;
          const containerHeight = 390;

          const maxX = containerWidth / 2 - width / 2;
          const maxY = containerHeight / 2 - height / 2;

          const newX = Math.min(Math.max(x + gestureState.dx, -maxX), maxX);
          const newY = Math.min(Math.max(y + gestureState.dy, -maxY), maxY);

          return {
            ...prevPositions,
            [image]: { x: newX, y: newY },
          };
        });
      },
      onPanResponderRelease: () => setActiveGesture(null),
    });

  const resizeResponder = (image: string) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        activeGesture === null || activeGesture === "resizing",
      onPanResponderGrant: () => setActiveGesture("resizing"),
      onPanResponderMove: (event, gestureState) => {
        setImageSizes((prevSizes) => {
          const { width = 96, height = 96 } = prevSizes[image] || {
            width: 96,
            height: 96,
          };

          const containerWidth = 400;
          const containerHeight = 280;

          const newWidth = Math.max(
            48,
            Math.min(width + gestureState.dx, containerWidth)
          );
          const newHeight = Math.max(
            48,
            Math.min(height + gestureState.dy, containerHeight)
          );

          return {
            ...prevSizes,
            [image]: { width: newWidth, height: newHeight },
          };
        });
      },
      onPanResponderRelease: () => setActiveGesture(null),
    });

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Header />
      <View className="border-t border-[#D9D9D9] mt-6"></View>
      <View
        collapsable={false}
        ref={viewToSnapshotRef}
        className="w-full h-96 items-center justify-center relative"
      >
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => {
            const isSelected = selectedImage === image;
            const size = imageSizes[image] || { width: 96, height: 96 };
            const position = dragPositions[image] || { x: -48, y: -48 };

            return (
              <Animated.View
                key={index}
                style={{
                  position: "absolute",
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                  ],
                }}
                {...panResponder(image).panHandlers}
              >
                <View
                  style={{
                    width: size.width,
                    height: size.height,
                    borderWidth: isSelected ? 1 : 0,
                    borderStyle: "dashed",
                    borderColor: "#DFDFDF",
                    borderRadius: 10,
                    position: "relative",
                  }}
                >
                  {isSelected && (
                    <Pressable
                      onPress={() => handleRemoveImage(image)}
                      style={{
                        position: "absolute",
                        top: -10,
                        left: -10,
                        zIndex: 10,
                        width: 20,
                        height: 20,
                        borderRadius: 12,
                        backgroundColor: "rgba(147, 147, 147, 0.7)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CloseIcon width={14} height={14} color="#FFF" />
                    </Pressable>
                  )}

                  <Pressable onPress={() => handleImageSelection(image)}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: size.width, height: size.height }}
                      resizeMode="contain"
                    />
                  </Pressable>

                  {isSelected && (
                    <View
                      style={{
                        position: "absolute",
                        bottom: -6,
                        right: -6,
                        width: 20,
                        height: 20,
                        backgroundColor: "rgba(147, 147, 147, 0.7)",
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...resizeResponder(image).panHandlers}
                    >
                      <ResizeArrow width={9} height={9} />
                    </View>
                  )}
                </View>
              </Animated.View>
            );
          })
        ) : (
          <Text className="text-gray-500 font-bold">
            Create your own outfit
          </Text>
        )}
      </View>

      {selectedImages.length > 0 && (
        <View className=" w-full flex-col items-end py-3 px-5 bottom-[50%]">
          <TouchableOpacity onPress={snapshot} className=" mb-5">
            <Save />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearSelection} className="">
            <ResetIcon />
          </TouchableOpacity>
        </View>
      )}

      {snapshotImg && (
        <Modal animationType="fade" transparent={true} visible={showModal}>
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="bg-white w-4/5 p-5 rounded-[10px]">
              <Text className="text-[16px] text-center font-bold mb-2">
                Preview
              </Text>
              <TextInput
                placeholder="Name this outfit"
                value={snapshotName}
                onChangeText={setSnapshotName}
                className="border-b-[0.8px] border-[#a7a7a7] text-[13px]"
              />
              <View className="items-center justify-center ">
                {snapshotImg ? (
                  <Image
                    resizeMode="contain"
                    source={{ uri: snapshotImg }}
                    className="w-full h-52 m-2"
                  />
                ) : (
                  <Text>No snapshot available</Text>
                )}
              </View>

              <View className="flex-row justify-between w-full mt-2">
                <TouchableOpacity
                  onPress={closeModal}
                  disabled={isSavingFit}
                  className="h-[42px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
                >
                  <Text className="text-[#7AB2B2] text-[16px]">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveSnapshot}
                  className="h-[42px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
                  disabled={isSavingFit}
                >
                  {isSavingFit ? (
                    <Spinner type="primary" />
                  ) : (
                    <Text className="text-white text-[16px]">Save</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <BottomSheet
        ref={bottomSheet}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#DFDFDF" }}
        enableDynamicSizing={true}
        handleIndicatorStyle={{
          backgroundColor: "#7AB2B2",
          width: 40,
          height: 5,
        }}
      >
        <BottomSheetView className="flex-1 p-3 items-center">
          <View className="flex flex-row px-10 w-full justify-between items-center mb-[-2px]">
            {["Closet", "Pieces"].map((tab) => {
              const isActive = activeTab === tab;
              const length = tab === "Closet" ? closetsLength : clothesLength;

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => {
                    if (tab === "Closet" && !selectedClosetId) {
                      setActiveTab(tab);
                    } else if (tab === "Closet" && selectedClosetId) {
                      setSelectedClosetId(null);
                    } else {
                      setActiveTab(tab);
                    }
                  }}
                  className="flex-1 items-center py-3 z-10"
                >
                  <View className="flex-row items-center">
                    {tab === "Closet" && selectedClosetId && (
                      <BackIcon
                        width={13}
                        height={13}
                        color="black"
                        className="mr-2"
                      />
                    )}
                    <View
                      className={`${
                        isActive ? "border-b-[2px] border-black" : ""
                      } flex-row items-center`}
                    >
                      <Text
                        className={`text-sm ${
                          isActive ? "text-black font-bold" : "text-gray-800"
                        }`}
                      >
                        {tab} ({length})
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="w-full h-[2px] bg-white" />

          {/* Closet Tab */}
          <View className="h-[90%]">
            {activeTab === "Closet" && (
              <View className="h-[100%]">
                {selectedClosetId === null ? (
                  <FlatList
                    key={activeTab}
                    className="mt-5 z-20 flex-grow px-2"
                    data={closets}
                    scrollEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCloset}
                    numColumns={3}
                    contentContainerStyle={{ paddingBottom: 4 }}
                  />
                ) : filteredClothes.length === 0 ? (
                  <View className="items-center">
                    <Text className="text-[#B7B7B7] mt-10">
                      This closet has no clothes yet.
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    key="closetsList"
                    className="mt-5 z-20 flex-grow px-2"
                    scrollEnabled={true}
                    data={filteredClothes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <ClothingCard
                        clothingId={item.id}
                        uri={item.image_url}
                        onPress={handleItemPress}
                        selected={selectedImages.includes(item.image_url)}
                      />
                    )}
                    numColumns={3}
                    contentContainerStyle={{ paddingBottom: 2 }}
                  />
                )}
              </View>
            )}

            {/* Pieces Tab */}
            {activeTab === "Pieces" && (
              <View className="h-[100%]">
                <FlatList
                  key={activeTab}
                  className="mt-5 z-20 flex-grow px-2"
                  scrollEnabled={true}
                  data={clothes}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderClothing}
                  numColumns={3}
                />
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DesignPage;
