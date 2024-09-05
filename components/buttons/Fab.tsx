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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 65;

type IconNameType = "camerao" | "upload" | "link";

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
        onPress();
        isExpanded.value = false;
      }}
      style={[animatedStyles]}
    >
      <View className="w-[50px] h-[50px] bg-[#7ab3b3] absolute rounded-full flex justify-center items-center flex-row right-0.25 bottom-6">
        <AntDesignIcons
          name={iconName as keyof typeof AntDesignIcons.glyphMap}
          size={25}
          color="#f8f9ff"
        />
      </View>
    </AnimatedPressable>
  );
};

const Fab: React.FC<{
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onLinkPress: () => void;
}> = ({ onCameraPress, onGalleryPress, onLinkPress }) => {
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
      <AnimatedPressable
        onPress={handlePress}
        className={`${isExpanded ? "bg-[#7ab3b3]" : "bg-[#7ab3b3]"}  h-[50px] w-[50px] rounded-full flex justify-center items-center z-20`}
      >
        <Animated.Text style={[plusIconStyle]}>
          <AntDesignIcons name="plus" size={30} color={"white"} />
        </Animated.Text>
      </AnimatedPressable>

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

export default Fab;
