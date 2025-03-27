import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const GradientOverlay = ({ opacity = 1, mapLoad }) => {
  return (
    <View style={[styles.overlay, { opacity }]}>
      <Svg height="120%" width="100%">
        {/* Определяем градиент */}
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="black" stopOpacity="0" />
            {mapLoad ? ( <Stop offset="0" stopColor="black" stopOpacity="1" />): <Stop offset="0.3" stopColor="black" stopOpacity="1" />}
            <Stop offset="0.9" stopColor="black" stopOpacity="1" />
            <Stop offset="0.8" stopColor="black" stopOpacity="1" />
            <Stop offset="0.7" stopColor="black" stopOpacity="1" />
            <Stop offset="0.6" stopColor="black" stopOpacity="1" />
            <Stop offset="0.5" stopColor="black" stopOpacity="1" />
            <Stop offset="0.4" stopColor="black" stopOpacity="1" />
            <Stop offset="0.3" stopColor="black" stopOpacity="1" />
            <Stop offset="1" stopColor="black" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Рисуем прямоугольник с градиентом */}
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default GradientOverlay;