import React, { useRef } from "react";
import { View, Pressable, Animated } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface AddButtonProps {
  onPress: () => void;
  isActive: boolean;
}

const AddButton = ({ onPress, isActive }: AddButtonProps) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  React.useEffect(() => {
    Animated.timing(rotation, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isActive, rotation]);

  return (
    <Pressable
      className="items-center justify-center bg-[#7ab3b3] rounded-full"
      onPress={onPress}
      style={{ width: 60, height: 60 }}
    >
      <Animated.View
        style={[
          { justifyContent: "center", alignItems: "center" },
          animatedStyle,
        ]}
      >
        <View className="justify-center items-center">
          <Feather name={isActive ? "plus" : "plus"} size={32} color="white" />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default AddButton;
