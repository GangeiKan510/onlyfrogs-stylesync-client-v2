import { View, Text, Pressable, Modal } from "react-native";
import CloseIcon from "@/assets/icons/x-icon.svg";
import { useState } from "react";
import MoreInfoIcon from "@/assets/icons/more-info-icon.svg";
import { useRouter } from "expo-router";

const TokenInfoModal = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTokenInfo = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View className="">
      <Pressable onPress={handleTokenInfo}>
        <MoreInfoIcon color="black" width={20} height={20} />
      </Pressable>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={handleTokenInfo}
        animationType="fade"
      >
        <View className="flex-grow justify-center items-center">
          <View className="relative w-[80%] bg-white border-2 rounded-xl border-[#F2F2F2] shadow-lg ">
            <View className="flex-row justify-between bg-[#F2F2F2] w-full">
              <Text className="text-lg font-bold p-4">Token Information!</Text>
              <CloseIcon
                className="right-4 top-4 p-2"
                width={24}
                height={24}
                color={"black"}
                onPress={handleTokenInfo}
              />
            </View>
            <View className="relative p-5 ">
              <Text className="text-base">
                Tokens are like points that get used whenever you chat with Ali.
                They help keep the conversation going!
              </Text>
              <Text className="mt-4 text-base">
                Note: You will get 150 tokens daily!🎊
              </Text>
            </View>
            <View className=" mb-2 w-full rounded-2xl justify-center items-center p-2">
              <Pressable
              className="w-full items-center  bg-[#7AB2B2] rounded-2xl p-2"
                onPress={() => router.push("/(tabs)/profile/subscription")}
              >
                <Text className="text-white">Get more Tokens </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TokenInfoModal;
