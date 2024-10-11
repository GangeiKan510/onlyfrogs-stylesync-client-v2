import React, { useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import Spinner from "../common/Spinner";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 65;

type Action = {
  iconName: keyof typeof AntDesignIcons.glyphMap;
  onPress: () => void;
  label: string;
};

type FloatingActionMenuProps = {
  actions: Action[];
  loading?: boolean;
};

const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  actions,
  loading = false,
}) => {
  const isExpanded = useSharedValue(false);

  useEffect(() => {
    if (loading) {
      isExpanded.value = false;
    }
  }, [loading]);

  const handlePress = () => {
    if (!loading) {
      isExpanded.value = !isExpanded.value;
    }
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = isExpanded.value ? "45deg" : "0deg";
    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  });

  return (
    <View>
      {actions.map((action, index) => {
        const animatedStyles = useAnimatedStyle(() => {
          const moveValue = isExpanded.value ? OFFSET * (index + 1) : 0;
          const translateValue = withSpring(-moveValue, SPRING_CONFIG);
          const scaleValue = isExpanded.value ? 1 : 0;
          return {
            transform: [
              { translateY: translateValue },
              { scale: withDelay(index * 25, withTiming(scaleValue)) },
            ],
          };
        });

        return (
          <AnimatedPressable
            key={index}
            onPress={action.onPress}
            style={[
              animatedStyles,
              {
                position: "absolute",
                bottom: 50,
                right: 40,
              },
            ]}
            disabled={loading}
          >
            <View
              style={{
                backgroundColor: "#7ab3b3",
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 5,
              }}
            >
              <AntDesignIcons
                name={action.iconName}
                size={25}
                color="#f8f9ff"
              />
            </View>
            <Text style={{ color: "#fff", marginTop: 5, textAlign: "center" }}>
              {action.label}
            </Text>
          </AnimatedPressable>
        );
      })}

      <AnimatedPressable
        onPress={handlePress}
        disabled={loading}
        style={{
          backgroundColor: "#7ab3b3",
          height: 50,
          width: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
          position: "absolute",
          bottom: 50,
          right: 40,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        {loading ? (
          <Spinner type="primary" />
        ) : (
          <Animated.Text style={[plusIconStyle]}>
            <AntDesignIcons name="plus" size={30} color={"white"} />
          </Animated.Text>
        )}
      </AnimatedPressable>
    </View>
  );
};

export default FloatingActionMenu;
