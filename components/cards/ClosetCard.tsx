/* eslint-disable no-constant-condition */
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, useRouter } from "expo-router";
import { routes } from "@/utils/routes";

interface CardProps {
  name?: string;
  onPress?: () => void;
  uri: string;
  id: string;
}

const ClosetCard: React.FC<CardProps> = ({ name, onPress, uri, id }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "30%", minWidth: 80, aspectRatio: 1 }}
      className="m-1"
    >
      <View className="w-full h-full rounded-[10px] overflow-hidden">
        {true ? (
          <TouchableOpacity
            onPress={() =>
              router.push(
                `${routes.expandedCloset as Href<string>} ${id}` as Href<string>
              )
            }
          >
            <ImageBackground
              source={{
                uri: uri,
              }}
              className="w-full h-full justify-center items-center"
              resizeMode="cover"
            >
              <View
                style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                className="w-full h-full absolute justify-center items-center"
              >
                <Text className="text-base text-white text-center">{name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <View
            style={{ backgroundColor: "#d9d9d9" }}
            className="w-full h-full justify-center items-center"
          >
            <AntDesign name="plus" size={46} color="white" />
            <Text className="text-base text-white">Add Closet</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ClosetCard;
