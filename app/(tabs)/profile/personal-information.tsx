/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { useUser } from "@/components/config/user-context";
import Back from "../../../assets/icons/back-icon.svg";
import { routes } from "@/utils/routes";

function PersonalInformation() {
  const router = useRouter();
  const { user } = useUser();
  const [height, setHeight] = useState<number | string>(user?.height || "");
  const [weight, setWeight] = useState<number | string>(user?.weight || "");
  const [birthDate, setBirthDate] = useState<string>(
    user?.birth_date
      ? new Date(user.birth_date).toLocaleDateString("en-US")
      : ""
  );
  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | "Non-Binary" | "Rather Not Say" | null
  >(user?.gender || null);

  const genderOptions = ["Male", "Female", "Non-Binary", "Rather Not Say"];

  const handleSave = () => {
    console.log({ height, weight, birthDate, selectedGender });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-10 px-6 z-30">
        <TouchableOpacity
          onPress={() => router.push(routes.profile as Href<string | object>)}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Personal Information
        </Text>
      </View>

      <View className="flex-1 px-6 mt-10">
        {/* Birthday Input */}
        <View className="mb-5">
          <Text>Birthday</Text>
          <TextInput
            className="border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3 mt-2"
            placeholder="MM/DD/YYYY"
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numeric"
          />
        </View>

        {/* Gender Selection */}
        <View className="mb-5">
          <Text>Gender</Text>
          <View className="flex-row justify-between mt-3">
            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender}
                className={`flex-1 py-2 px-5 border rounded-[10px] mr-2 ${
                  selectedGender === gender ? "bg-tertiary" : "border-tertiary"
                }`}
                onPress={() => setSelectedGender(gender as any)}
              >
                <Text
                  className={`text-center ${
                    selectedGender === gender ? "text-white" : "text-tertiary"
                  }`}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Height Input */}
        <View className="mb-5">
          <Text>Height (cm)</Text>
          <TextInput
            className="h-[40px] border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3 mt-2"
            placeholder="Enter height"
            value={height.toString()}
            onChangeText={(value) => setHeight(Number(value))}
            keyboardType="numeric"
          />
        </View>

        {/* Weight Input */}
        <View className="mb-5">
          <Text>Weight (kg)</Text>
          <TextInput
            className="h-[40px] border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3 mt-2"
            placeholder="Enter weight"
            value={weight.toString()}
            onChangeText={(value) => setWeight(Number(value))}
            keyboardType="numeric"
          />
        </View>

        {/* Save Button */}
        <View className="mt-auto pb-2">
          <TouchableOpacity
            className="flex items-center justify-center h-[40px] bg-[#7AB2B2] rounded-lg"
            onPress={handleSave}
          >
            <Text className="text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PersonalInformation;
