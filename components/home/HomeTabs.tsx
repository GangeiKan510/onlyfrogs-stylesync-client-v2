import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import ClosetTab from "./closet/ClosetTab";
import { useUser } from "../config/user-context";
import PiecesTab from "./pieces/PiecesTab";
import FitsTab from "./fits/FitsTab";

const HomeTabs = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("Closet");

  const closets = user?.closets || [];
  const clothesLength =
    user?.closets.reduce((total, closet) => total + closet.clothes.length, 0) ||
    0;
  const fitsLength = user?.fits.length;

  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center mb-1 border-b-[2px] border-[#F3F3F3] pb-2">
        <Pressable
          onPress={() => setActiveTab("Closet")}
          className="flex-1 items-start"
        >
          <View>
            <Text
              className={`${
                activeTab === "Closet" ? "font-bold" : ""
              } text-[14px] text-left`}
            >
              Closet ({closets.length})
            </Text>
            {activeTab === "Closet" && (
              <View
                className="h-0.5 bg-black absolute left-0 right-0 mt-2"
                style={{ bottom: -10 }}
              />
            )}
          </View>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("Pieces")}
          className="flex-1 items-center"
        >
          <View>
            <Text
              className={`${
                activeTab === "Pieces" ? "font-bold" : ""
              } text-center text-[14px]`}
            >
              Pieces ({clothesLength})
            </Text>
            {activeTab === "Pieces" && (
              <View
                className="h-0.5 bg-black absolute left-0 right-0 mt-2"
                style={{ bottom: -10 }}
              />
            )}
          </View>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("Fits")}
          className="flex-1 items-end"
        >
          <View>
            <Text
              className={`${
                activeTab === "Fits" ? "font-bold" : ""
              } text-right text-[14px]`}
            >
              Fits ({fitsLength})
            </Text>
            {activeTab === "Fits" && (
              <View
                className="h-0.5 bg-black absolute left-0 right-0 mt-2"
                style={{ bottom: -10 }}
              />
            )}
          </View>
        </Pressable>
      </View>
      <View className="mt-1">
        {activeTab === "Closet" && <ClosetTab closetCards={closets} />}
        {activeTab === "Pieces" && <PiecesTab />}
        {activeTab === "Fits" && <FitsTab />}
      </View>
    </View>
  );
};

export default HomeTabs;
