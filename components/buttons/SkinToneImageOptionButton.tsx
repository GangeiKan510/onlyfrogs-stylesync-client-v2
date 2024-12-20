import React from "react";
import { View, Pressable } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import Animated, {
  withDelay,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  SharedValue,
} from "react-native-reanimated";
import CameraIcon from "../../assets/icons/survey/skin-tone-classification/camera-icon.svg";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 65;

type IconNameType = "camera" | "upload";

type FloatingActionButtonProps = {
  isExpanded: SharedValue<boolean>;
  index: number;
  iconName: IconNameType;
  onPress: () => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  isExpanded,
  index,
  iconName,
  onPress,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 25;

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
        onPress();
        isExpanded.value = false;
      }}
      style={[animatedStyles, {height:50, bottom: -40 + index * 50,}]}
    >
      <View
        className="w-[50px] h-[50px] bg-[#7ab3b3] absolute rounded-full flex justify-center items-center flex-row right-0.25 "
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
          transform: [{ translateY: -2 }],
        }}
      >
        <AntDesignIcons
          name={iconName as keyof typeof AntDesignIcons.glyphMap}
          size={25}
          color="#f8f9ff"
        />
      </View>
    </AnimatedPressable>
  );
};

const SkinToneImageOptions: React.FC<{
  onCameraPress: () => void;
  onGalleryPress: () => void;
}> = ({ onCameraPress, onGalleryPress }) => {
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
    <View className="h-full">
      <AnimatedPressable
        onPress={handlePress}
        className={`${isExpanded ? "bg-[#7ab3b3]" : "bg-[#7ab3b3]"}  h-[50px] w-[50px] rounded-full flex justify-center items-center z-20 bottom-10`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
          top:40,
          transform: [
            { translateY: -2 },
          ],
        }}
      >
        <Animated.Text style={[plusIconStyle]}>
          <CameraIcon />
        </Animated.Text>
      </AnimatedPressable>

      <FloatingActionButton
        isExpanded={isExpanded}
        index={1}
        iconName="camera"
        onPress={onCameraPress}
      />
      <FloatingActionButton
        isExpanded={isExpanded}
        index={2}
        iconName="upload"
        onPress={onGalleryPress}
      />
    </View>
  );
};

export default SkinToneImageOptions;
