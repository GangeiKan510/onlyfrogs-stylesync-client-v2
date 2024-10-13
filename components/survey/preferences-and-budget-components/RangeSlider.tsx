import { View, TextInput } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const RangeSlider = ({ sliderWidth, min, max, step, onValueChange }) => {
  const position = useSharedValue(0);
  const position2 = useSharedValue(sliderWidth);
  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const context = useSharedValue(0);
  const context2 = useSharedValue(0);

  // Using new Gesture API
  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = position.value;
    })
    .onUpdate(e => {
      opacity.value = 1;
      if (context.value + e.translationX < 0) {
        position.value = 0;
      } else if (context.value + e.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else {
        position.value = context.value + e.translationX;
      }
    })
    .onEnd(() => {
      opacity.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    });

  const pan2 = Gesture.Pan()
    .onBegin(() => {
      context2.value = position2.value;
    })
    .onUpdate(e => {
      opacity2.value = 1;
      if (context2.value + e.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (context2.value + e.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = context2.value + e.translationX;
      }
    })
    .onEnd(() => {
      opacity2.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    zIndex: zIndex.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value }],
    zIndex: zIndex2.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    width: position2.value - position.value,
  }));

  // Add this line for Reanimated from v3.5.0
  Animated.addWhitelistedNativeProps({ text: true });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => ({
    text: `₱${
      min +
      Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step
    }`,
  }));

  const maxLabelText = useAnimatedProps(() => ({
    text: `₱${
      min +
      Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step
    }`,
  }));

  return (
    <View style={[{ width: sliderWidth, justifyContent: 'center', alignSelf: 'center' }]}>
      <View style={[{ width: sliderWidth, height: 14, backgroundColor: '#c5eded', borderRadius: 20 }]} />
      <Animated.View style={[sliderStyle, { height: 14, backgroundColor: '#92CCCC', borderRadius: 20, position: 'absolute' }]} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyle, { left: -8, width: 30, height: 30, backgroundColor: 'white', borderColor: '#92CCCC', borderWidth: 5, borderRadius: 30, position: 'absolute' }]}>
          <Animated.View style={[opacityStyle, { position: 'absolute', top: -40, bottom: 20, backgroundColor: 'black', borderRadius: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }]}>
            <AnimatedTextInput
              style={{ color: 'white', padding: 5, fontWeight: 'bold', fontSize: 16, width: '100%' }}
              animatedProps={minLabelText}
              editable={false}
              defaultValue={`₱${
                min +
                Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step
              }`}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={pan2}>
        <Animated.View style={[animatedStyle2, { left: -22, width: 30, height: 30, backgroundColor: 'white', borderColor: '#92CCCC', borderWidth: 5, borderRadius: 30, position: 'absolute' }]}>
          <Animated.View style={[opacityStyle2, { position: 'absolute', top: -40, bottom: 20, backgroundColor: 'black', borderRadius: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }]}>
            <AnimatedTextInput
              style={{ color: 'white', padding: 5, fontWeight: 'bold', fontSize: 16, width: '100%' }}
              animatedProps={maxLabelText}
              editable={false}
              defaultValue={`₱${
                min +
                Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step
              }`}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default RangeSlider;
