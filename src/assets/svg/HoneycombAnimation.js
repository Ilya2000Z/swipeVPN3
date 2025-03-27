import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Polygon, G } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const hexagons = [
  { x: 150, y: 50, delay: 0 },
  { x: 110, y: 110, delay: 350 },
  { x: 190, y: 110, delay: 150 },
  { x: 70, y: 170, delay: 500 },
  { x: 150, y: 170, delay: 250 },
  { x: 230, y: 170, delay: 650 },
];

const HoneycombAnimation = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={300} height={300} viewBox="0 0 300 300">
        {hexagons.map(({ x, y, delay }, index) => (
          <Hexagon key={index} x={x} y={y} delay={delay} />
        ))}
      </Svg>
    </View>
  );
};

const Hexagon = ({ x, y, delay }) => {
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 2500, easing: Easing.out(Easing.exp) }, () => {
        scale.value = withTiming(0.5, { duration: 2500 }, () => {
          scale.value = withTiming(1, { duration: 2500 });
        });
      });
      rotate.value = withTiming(360, { duration: 2500, easing: Easing.out(Easing.exp) }, () => {
        rotate.value = withTiming(0, { duration: 2500 }, () => {
          rotate.value = withTiming(360, { duration: 2500 });
        });
      });
      opacity.value = withTiming(1, { duration: 2500 }, () => {
        opacity.value = withTiming(0, { duration: 2500 }, () => {
          opacity.value = withTiming(1, { duration: 2500 });
        });
      });
    }, delay);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <G transform={`translate(${x}, ${y})`}>
      <AnimatedPolygon
        animatedProps={animatedProps}
        points="-30,0 -15,-26 15,-26 30,0 15,26 -15,26"
        fill="#E7FE55"
      />
    </G>
  );
};

export default HoneycombAnimation;
