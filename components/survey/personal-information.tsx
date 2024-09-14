import { View, Text, TextInput } from "react-native";
import React, { useMemo, useState } from "react";
import Header from "@/components/common/Header";
import { RadioButtonProps } from "react-native-radio-buttons-group";

const PersonalInformation = () => {
  const gender: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1", // do not change  id
        label: "Man",
      },
      {
        id: "2", // do not change
        label: "Woman",
      },
      {
        id: "3", // do not change
        label: "Non-Binary",
      },
      {
        id: "4", // do not change
        label: "Prefer not to say",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();

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
          <View className="px-5 flex-row flex-wrap">
          {gender.map(button => (
            <View
              key={button.id}
              className={`border border-[#7AB2B2] rounded-full p-1 mb-4 w-[44%] ${selectedId === button.id ? 'bg-[#7AB2B2]' : 'bg-[#F3F3F3]'} m-2`}
            >
              <Text
                className={`text-center text-base ${selectedId === button.id ? 'text-white' : 'text-black'}`}
                onPress={() => setSelectedId(button.id)}
              >
                {button.label}
              </Text>
            </View>
          ))}
        </View>
        </View>
        <View></View>
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
