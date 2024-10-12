import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface AddCardProps {
  onPress: () => void;
}

const AddClosetCard: React.FC<AddCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "30%", minWidth: 80, aspectRatio: 1 }}
      className="m-1"
    >
      <View
        style={{ backgroundColor: "#d9d9d9" }}
        className="w-full h-full justify-center items-center rounded-[10px] overflow-hidden"
      >
        <AntDesign name="plus" size={46} color="white" />
        <Text className="text-base text-white">Add Closet</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddClosetCard;
