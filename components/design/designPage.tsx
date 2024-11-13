import { View, Text, TouchableOpacity } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/common/Header";

const DesignPage = () => {
  const snapPoints = useMemo(() => ["45%", "80%"], []);
  const bottomSheet = useRef(null);
  const [activeTab, setActiveTab] = useState("Closet");

  return (
    <GestureHandlerRootView className="flex-1">
      <Header />
      <View className="w-full border-t border-[#D9D9D9] h-72 mt-6"></View>
      <BottomSheet
        ref={bottomSheet}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#EFEFEF" }}
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
                  Closet (3)
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
                  Pieces (10)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-full h-[2px] bg-white" />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DesignPage;
