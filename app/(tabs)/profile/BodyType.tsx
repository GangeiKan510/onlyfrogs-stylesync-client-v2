/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Spinner from "@/components/common/Spinner";
import { useUser } from "@/components/config/user-context";
import NeatHourGlass from "../../../assets/images/bodyTypes/neatHourGlass.svg";
import FullHourGlass from "../../../assets/images/bodyTypes/fullHourGlass.svg";
import Pear from "../../../assets/images/bodyTypes/pear.svg";
import LeanColumn from "../../../assets/images/bodyTypes/leanColumn.svg";
import Apple from "../../../assets/images/bodyTypes/apple.svg";
import InvertedTriangle from "../../../assets/images/bodyTypes/invertedTriangle.svg";
import Back from "../../../assets/icons/back-icon.svg";

const bodyTypes = [
  { name: "Neat Hourglass", image: NeatHourGlass, type: "NeatHourGlass" },
  { name: "Full Hourglass", image: FullHourGlass, type: "FullHourGlass" },
  { name: "Pear", image: Pear, type: "Pear" },
  {
    name: "Inverted Triangle",
    image: InvertedTriangle,
    type: "InvertedTriangle",
  },
  { name: "Lean Column", image: LeanColumn, type: "LeanColumn" },
  { name: "Apple", image: Apple, type: "Apple" },
];

interface BodyTypeProps {
  setBodyType?: (bodyType: string) => void;
}

const BodyType = ({ setBodyType }: BodyTypeProps) => {
  const { user } = useUser();
  const [selectedBodyType, setSelectedBodyType] =
    useState("NeatHourglass");
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (setBodyType) {
      setBodyType(selectedBodyType);
    }
  }, [selectedBodyType, setBodyType]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (setBodyType) {
        setBodyType(selectedBodyType);
      }
      Toast.show({
        type: "success",
        text1: "Body Type Saved",
        text2: "Your body type has been saved successfully.",
      });
  
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "profile" }],
        })
      );
    } catch (error) {
      console.error("Error saving profile:", error);
      Toast.show({
        type: "error",
        text1: "Error saving body type",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "profile" }],
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute left-10 top-16 z-10">
        <TouchableOpacity onPress={handleCancel}>
          <Back width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View className="flex justify-center items-center mt-8">
        <Text className="text-center text-[20px] font-bold">
          Body Type
        </Text>
      </View>
      <View className=" flex-1 justify-center items-center">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="h-[75vh]"
        >
          {bodyTypes.map((bodyType) => (
            <TouchableOpacity
              key={bodyType.type}
              onPress={() => setSelectedBodyType(bodyType.type)}
              className={`border-[2px] rounded-[12px] mx-2 my-32 mt-12 ${
                selectedBodyType === bodyType.type
                  ? "border-tertiary"
                  : "border-transparent"
              }`}
            >
              <View className="py-8 px-3">
                <Text className="text-[20px] text-center text-tertiary">
                  {bodyType.name}
                </Text>
                <bodyType.image />
                <View className="flex items-center justify-center mt-4">
                  <TouchableOpacity
                    className="h-5 w-5 rounded-full flex items-center justify-center border-[2px] border-tertiary"
                    onPress={() => setSelectedBodyType(bodyType.type)}
                  >
                    <View
                      className={`h-3 w-3 rounded-full items-center justify-center ${
                        selectedBodyType === bodyType.type
                          ? "bg-tertiary"
                          : "bg-white"
                      }`}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="absolute bottom-0 w-full flex-row justify-between px-6 pb-4">
        <TouchableOpacity
          onPress={handleCancel}
          className="flex mx-2 rounded-[10px] bg-[#F9F9F9] border border-solid border-[#7AB2B2] w-[160px] h-[42px] justify-center"
        >
          <Text className="text-center text-[#7AB2B2]">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          className= "bg-[#7AB2B2] items-center justify-center rounded-[10px] w-[160px] h-[42px]">
          <View>
            {isSaving ? (
              <Spinner type={"primary"} />
            ) : (
              <Text className="text-[16px] text-white">Save</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default BodyType;
