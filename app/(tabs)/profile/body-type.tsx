/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";
import { updateBodyType } from "@/network/web/user";

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
  const { user, refetchMe } = useUser();
  const router = useRouter();
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");
  const [initialBodyType, setInitialBodyType] = useState<string>("");
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    if (user?.body_type) {
      setSelectedBodyType(user.body_type);
      setInitialBodyType(user.body_type);
      setLoading(false);
    }
  }, [user?.body_type]);

  useEffect(() => {
    if (setBodyType) {
      setBodyType(selectedBodyType);
    }
  }, [selectedBodyType, setBodyType]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedUser = await updateBodyType({
        id: user?.id || "",
        body_type: selectedBodyType,
      });

      refetchMe();

      Toast.show({
        type: "success",
        text1: "Body Type Saved",
        text2: "Your body type has been saved successfully.",
      });
      router.push("/(tabs)/profile");
    } catch (error) {
      console.error("Error saving body type:", error);
      Toast.show({
        type: "error",
        text1: "Error saving body type",
        text2: "Failed to save your body type. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Spinner type="primary" />
      </SafeAreaView>
    );
  }

  const isSaveDisabled = selectedBodyType === initialBodyType || isSaving;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-2 px-6 z-30">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile")}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Body Type
        </Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {bodyTypes.map((bodyType) => (
            <TouchableOpacity
              key={bodyType.type}
              onPress={() => setSelectedBodyType(bodyType.type)}
              className={`border-[2px] rounded-[12px] mx-2 my-12 ${
                selectedBodyType === bodyType.type
                  ? "border-tertiary"
                  : "border-transparent"
              }`}
            >
              <View className="justify-center items-center mt-4 px-1.5">
                <Text className="text-[20px] text-center text-tertiary">
                  {bodyType.name}
                </Text>
                <bodyType.image />
                <View className="flex items-center justify-center top-[-16]">
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
        <View className="mt-auto py-2 w-full px-6">
          <TouchableOpacity
            className={`flex items-center justify-center h-[42px] rounded-lg ${
              isSaveDisabled ? "bg-[#9fcccc]" : "bg-bg-tertiary"
            }`}
            onPress={handleSave}
            disabled={isSaveDisabled}
          >
            {isSaving ? (
              <Spinner type="primary" />
            ) : (
              <Text
                className={`text-white ${
                  isSaveDisabled ? "text-gray-500" : "text-white"
                }`}
              >
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BodyType;
