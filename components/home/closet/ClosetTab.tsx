/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import ClosetCard from "@/components/cards/ClosetCard";
import { useUser } from "@/components/config/user-context";
import { createCloset } from "@/network/web/closet";
import AddClosetCard from "@/components/cards/AddClosetCard";
import ClosetType from "@/utils/types/ClosetType";
import MoreInfoIcon from "../../../assets/icons/more-info-icon.svg";
import Toast from "react-native-toast-message";

interface ClosetTabProps {
  closetCards: ClosetType[] | undefined;
}

const ClosetTab = ({ closetCards }: ClosetTabProps) => {
  const { user, refetchMe } = useUser();

  const [closetName, setClosetName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const NAME_CHAR_MINUMUM = 0;

  const minimunChar = closetName.length < NAME_CHAR_MINUMUM;

  const isAddDisabled = !closetName.trim() || minimunChar;

  const handleModalVisibility = () => {
    setModalVisible(true);
  };

  const handleCreateCloset = async () => {
    if (isAddDisabled) return;

    setIsRequestLoading(true);

    const closetData = {
      name: closetName.trim(),
      description: description.trim(),
      user_id: user?.id as string,
    };

    try {
      await createCloset(closetData);
      setModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Successfully created a new closet!",
        position: "top",
        swipeable: true,
      });
      await refetchMe();
    } catch (error) {
      console.error("Error creating closet:", error);
      Toast.show({
        type: "error",
        text1: "Failed to create closet.",
        position: "top",
        swipeable: true,
      });
      setModalVisible(false);
    } finally {
      setClosetName("");
      setDescription("");
      setIsRequestLoading(false);
    }
  };

  console.log("Closets", user?.closets);
  console.log("Clothing URL", user?.closets[0].clothes[0].image_url);
  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start">
        {closetCards?.map((closet: any) => {
          const clothingInCloset = closet.clothes || [];

          console.log("Clothing in Closet", clothingInCloset);

          const imageUri =
            clothingInCloset.length > 0
              ? clothingInCloset[0].image_url
              : "https://lh3.googleusercontent.com/pw/AP1GczMpwiLxbGQkZGPAbApzNsZPrj7I8aqlXXj1gVqKU4UindflHV1YdgnaH3yWBP35nufvm1dZNmYcoCBg1XrBed4zrYPt8VuOgpWjZk0vZfW56vuptA=w2400";

          return (
            <ClosetCard
              key={closet.id}
              id={closet.id}
              name={closet.name}
              uri={imageUri}
            />
          );
        })}

        <AddClosetCard onPress={handleModalVisibility} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="w-4/5 bg-white rounded-[10px] p-5 items-center">
            <View className="w-full flex items-center justify-center mb-1">
              <Text className="text-[18px] font-bold">Add New Closet</Text>
            </View>
            <View className="w-full">
              <View className="mb-3 mt-4">
                <Text className="text-[16px] mb-1 self-start">Name </Text>
                <TextInput
                  className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 w-full"
                  maxLength={20}
                  value={closetName}
                  onChangeText={(input) => setClosetName(input)}
                />
              </View>
              <View className="mb-3">
                <Text className="text-[16px] mb-1 self-start">
                  Description{" "}
                </Text>
                <TextInput
                  className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 w-full"
                  maxLength={30}
                  value={description}
                  onChangeText={(input) => setDescription(input)}
                />
              </View>
              <View className="flex-row my-7 gap-3 items-center justify-center px-3">
                <MoreInfoIcon />
                <Text className="text-text-secondary">
                  Make your closet name reflect the type of clothes you want to
                  store.
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between w-full">
              <Pressable
                className="h-[42px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-base text-center text-text-tertiary">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className={`h-[42px] flex-1 border   rounded-lg mx-2 justify-center items-center ${isAddDisabled ? "bg-[#c2e0e0] border-[#c2e0e0]" : "bg-[#7ab3b3] border-[#7ab3b3]"}`}
                onPress={handleCreateCloset}
                disabled={isAddDisabled}
              >
                <Text className="text-base text-white text-center">
                  {isRequestLoading ? (
                    <ActivityIndicator size={"small"} color={"#fff"} />
                  ) : (
                    "Add"
                  )}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClosetTab;
