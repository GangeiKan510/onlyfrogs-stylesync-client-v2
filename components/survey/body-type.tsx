import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import BodyTypeAImage from "../../assets/images/svg/body-type-a.svg";
import BodyTypeBImage from "../../assets/images/svg/body-type-b.svg";

const BodyType = () => {
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);

  return (
    <View>
      <View className="flex justify-center items-center mt-10">
        <Text className="text-[20px]">What is your body type?</Text>
      </View>
      <View className="flex-row h-[75vh] items-center gap-3 mx-auto">
        {/* Type A */}
        <Pressable
          onPress={() => setSelectedBodyType("TypeA")}
          className={`border-[2px] rounded-[12px] ${
            selectedBodyType === "TypeA"
              ? "border-tertiary"
              : "border-transparent"
          }`}
        >
          <View className="py-28 px-5">
            <Text className="text-[20px] text-center text-tertiary">
              Type A
            </Text>
            <BodyTypeAImage />
            <View className="flex items-center justify-center mt-4">
              <Pressable
                className="h-5 w-5 rounded-full flex items-center justify-center border-[2px] border-tertiary"
                onPress={() => setSelectedBodyType("TypeA")}
              >
                <View
                  className={`h-3 w-3 rounded-full ${
                    selectedBodyType === "TypeA" ? "bg-tertiary" : "bg-white"
                  }`}
                />
              </Pressable>
            </View>
          </View>
        </Pressable>

        {/* Type B */}
        <Pressable
          onPress={() => setSelectedBodyType("TypeB")}
          className={`border-[2px] rounded-[12px] ${
            selectedBodyType === "TypeB"
              ? "border-tertiary"
              : "border-transparent"
          }`}
        >
          <View className="py-28 px-5">
            <Text className="text-[20px] text-center text-tertiary">
              Type B
            </Text>
            <BodyTypeBImage />
            <View className="flex items-center justify-center mt-4">
              <Pressable
                className="h-5 w-5 rounded-full flex items-center justify-center border-[2px] border-tertiary"
                onPress={() => setSelectedBodyType("TypeB")}
              >
                <View
                  className={`h-3 w-3 rounded-full ${
                    selectedBodyType === "TypeB" ? "bg-tertiary" : "bg-white"
                  }`}
                />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default BodyType;
