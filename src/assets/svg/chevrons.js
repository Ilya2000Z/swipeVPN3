import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, withDelay, withSequence } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Chevrons = () => {
  const opacity1 = useSharedValue(0.25);
  const opacity2 = useSharedValue(0.25);
  const opacity3 = useSharedValue(0.25);

  useEffect(() => {
    opacity1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.25, { duration: 500 }),
        withDelay(400, withTiming(0.25, { duration: 0 }))
      ), -1, false
    );

    opacity2.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(1, { duration: 500 })),
        withTiming(0.25, { duration: 500 }),
        withDelay(200, withTiming(0.25, { duration: 0 }))
      ), -1, false
    );

    opacity3.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(1, { duration: 500 })),
        withTiming(0.25, { duration: 500 })
      ), -1, false
    );
  }, []);

  const animatedProps1 = useAnimatedProps(() => ({
    strokeOpacity: opacity1.value,
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    strokeOpacity: opacity2.value,
  }));

  const animatedProps3 = useAnimatedProps(() => ({
    strokeOpacity: opacity3.value,
  }));

  return (
    <View>
      <Svg width="58" height="12" viewBox="0 0 58 12" fill="none">
        <AnimatedPath
          animatedProps={animatedProps1}
          d="M26 1L31 6L26 11"
          stroke="#E7FE55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          animatedProps={animatedProps2}
          d="M39 1L44 6L39 11"
          stroke="#E7FE55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          animatedProps={animatedProps3}
          d="M52 1L57 6L52 11"
          stroke="#E7FE55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default Chevrons;