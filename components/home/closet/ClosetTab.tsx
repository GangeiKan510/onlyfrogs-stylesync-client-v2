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
// import UploadClothing from "./upload-clothing/UploadClothing";

interface ClosetTabProps {
  closetCards: ClosetType[] | undefined;
}

const ClosetTab = ({ closetCards }: ClosetTabProps) => {
  const { user, refetchMe } = useUser();

  const [closetName, setClosetName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isClosetNameEmpty, setIsClosetNameEmpty] = useState(false);
  // const [selectedCloset, setSelectedCloset] = useState<ClosetType | null>(null);

  const handleModalVisibility = () => {
    setModalVisible(true);
  };

  const handleCreateCloset = async () => {
    if (closetName === "") {
      setIsClosetNameEmpty(true);
      return;
    }
    setIsClosetNameEmpty(false);
    setIsRequestLoading(true);

    const closetData = {
      name: closetName,
      description: description,
      user_id: user?.id as string,
    };

    try {
      await createCloset(closetData);
      await refetchMe(); // Refresh the user data after creating the closet
    } catch (error) {
      console.error("Error creating closet:", error);
    } finally {
      setClosetName("");
      setDescription("");
      setModalVisible(false);
      setIsRequestLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start">
        {closetCards?.map((closet) => {
          const clothingInCloset = user?.clothes.filter(
            (clothing) => clothing.closet_id === closet.id
          );

          const imageUri =
            clothingInCloset && clothingInCloset.length > 0
              ? clothingInCloset[0].image_url
              : "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square-300x300.jpg";

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
                <Text className="text-[16px] mb-1 self-start">
                  Name{" "}
                  {isClosetNameEmpty && (
                    <Text className="text-[#EE4E4E]">
                      *Closet name is required
                    </Text>
                  )}
                </Text>
                <TextInput
                  className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 w-full"
                  value={closetName}
                  onChangeText={(input) => setClosetName(input)}
                />
              </View>
              <View className="mb-3">
                <Text className="text-[16px] mb-1 self-start">Description</Text>
                <TextInput
                  className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 w-full"
                  value={description}
                  onChangeText={(input) => setDescription(input)}
                />
              </View>
              <View className="flex-row my-7 gap-3 items-center">
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
                className="h-[42px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
                onPress={handleCreateCloset}
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
