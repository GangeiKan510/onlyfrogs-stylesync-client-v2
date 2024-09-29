import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import BodyTypeAImage from "../../../assets/images/svg/body-type-a.svg";
import BodyTypeBImage from "../../../assets/images/svg/body-type-b.svg";
import { SafeAreaView } from "react-native-safe-area-context";

interface BodyTypeProps {
  setBodyType?: (bodyType: string) => void;
}

const BodyType = ({ setBodyType }: BodyTypeProps) => {
  const [selectedBodyType, setSelectedBodyTypeState] =
    useState<string>("TypeA");

  useEffect(() => {
    if (setBodyType) {
      setBodyType(selectedBodyType);
    }
  }, [selectedBodyType]);

  return (
    <SafeAreaView>
      <View>
        <View className="flex justify-center items-center mt-5 mb-2">
          <Text className="text-[20px] font-medium">What is your body type?</Text>
        </View>
        <View className="flex-row h-[75vh] items-center gap-3 mx-auto">
          <Pressable
            onPress={() => setSelectedBodyTypeState("TypeA")}
            className={`border-[2px] rounded-[12px] ${
              selectedBodyType === "TypeA"
                ? "border-tertiary"
                : "border-transparent"
            }`}
          >
            <View className="py-20 px-5">
              <Text className="text-[20px] text-center text-tertiary">Type A</Text>
              <BodyTypeAImage />
              <View className="flex items-center justify-center mt-4">
                <View
                  className={`h-5 w-5 rounded-full flex items-center justify-center border-[2px] border-tertiary ${
                    selectedBodyType === "TypeA" ? "bg-tertiary" : "bg-white"
                  }`}
                />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setSelectedBodyTypeState("TypeB")}
            className={`border-[2px] rounded-[12px] ${
              selectedBodyType === "TypeB"
                ? "border-tertiary"
                : "border-transparent"
            }`}
          >
            <View className="py-20 px-5">
              <Text className="text-[20px] text-center text-tertiary">Type B</Text>
              <BodyTypeBImage />
              <View className="flex items-center justify-center mt-4">
                <View
                  className={`h-5 w-5 rounded-full flex items-center justify-center border-[2px] border-tertiary ${
                    selectedBodyType === "TypeB" ? "bg-tertiary" : "bg-white"
                  }`}
                />
              </View>
            </View>
          </Pressable>
        </View>
        <View className="flex-row justify-between mx-2 mb-4 ">
          <Pressable className="flex mx-2 mt-8 bg-[#F9F9F9] rounded-[10px] w-[160px] h-[42px] border border-solid border-[#7AB2B2]">
            <Text className="text-center text-[#7AB2B2] text-[16px] py-2">Cancel</Text>
          </Pressable>

          <Pressable className=" bg-[#7AB2B2] mx-2 mt-8 rounded-[10px] w-[160px] h-[42px] border border-solid border-[#7AB2B2]">
            <Text className="text-center text-[16px] text-white px-auto px-4 py-2">
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BodyType;
