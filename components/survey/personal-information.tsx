import { View, Text, TextInput } from "react-native";
import React from "react";
import Header from "@/components/common/Header";

const PersonalInformation = () => {
  return (
    <View>
    <Header />
    <View>
      <Text className="text-[20px] text-center font-bold">
        Personal Information
      </Text>
    </View>
    {/* Birthday */}
    <View>
      <Text className="pt-6 px-5 text-[16px]">Birthday</Text>
    </View>
    {/* Gender */}
    <View className="mt-32">
      <View>
         <Text className="pt-30 px-5 text-[16px]">Gender</Text>
      </View>
     <View>
    
     </View>
    </View>
    {/* Height */}
    <View className="mt-32">
      <View className="flex-row">
        <Text className="pt-30 px-5 text-[16px]">Height</Text>
        <Text className="pt-25 absolute right-10 text-[20px] text-[#7AB2B2]">
          cm
        </Text>
      </View>
      <View>
        <TextInput
          className="pt-3 g-[#F3F3F3] bh-[42px] rounded-[10px] px-4 w-80"
          keyboardType="numeric"
          placeholder="Enter Height"
        />
      </View>
    </View>
    {/* Weight */}
    <View className="mt-32">
      <View className="flex-row">
        <Text className="pt-30 px-5 text-[16px]">Weight</Text>
        <Text className="pt-25 absolute right-10 text-[20px] text-[#7AB2B2]">
          kg
        </Text>
      </View>
      <View className="mt-3">
        <TextInput
          className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
          keyboardType="numeric"
          placeholder="Enter Weight"
        />
      </View>
    </View>
  </View>
  );
};

export default PersonalInformation;
