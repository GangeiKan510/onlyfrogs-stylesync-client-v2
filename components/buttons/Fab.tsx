/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import Animated, {
  withDelay,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 65;

const FloatingActionButton = ({
  isExpanded,
  index,
  iconName,
  onPress,
}: any) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPress={() => {
        onPress(); // Call the button-specific action
        isExpanded.value = false; // Close the menu
      }}
      style={[animatedStyles, styles.shadow, styles.button]}
    >
      <AntDesignIcons name={iconName} size={25} color="#f8f9ff" />
    </AnimatedPressable>
  );
};

const Fab = ({ onCameraPress, onGalleryPress, onLinkPress }: any) => {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  });

  return (
    <View>
      {/* Main Plus Button */}
      <AnimatedPressable
        onPress={handlePress}
        style={[styles.shadow, styles.mainButton]}
      >
        <Animated.Text style={[plusIconStyle, styles.iconContent]}>
          <AntDesignIcons name="plus" size={30} color={"white"} />
        </Animated.Text>
      </AnimatedPressable>

      {/* Action Buttons */}
      <FloatingActionButton
        isExpanded={isExpanded}
        index={1}
        iconName="camerao"
        onPress={onCameraPress}
      />
      <FloatingActionButton
        isExpanded={isExpanded}
        index={2}
        iconName="upload"
        onPress={onGalleryPress}
      />
      <FloatingActionButton
        isExpanded={isExpanded}
        index={3}
        iconName="link"
        onPress={onLinkPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    zIndex: 1,
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#977AB3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContent: {
    fontSize: 24,
    color: "#f8f9ff",
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#7ab3b3",
    position: "absolute",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
    flexDirection: "row",
    right: 6,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Fab;
