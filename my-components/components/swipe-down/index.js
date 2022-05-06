import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const {height} = Dimensions.get("window")

function SwipeDown() {
  const position = useSharedValue(0);

  useEffect(() => {
    position.value=0

  }, [])
  

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
        position.value =  e.translationY;
    })
    .onEnd((e) => {
      if (position.value > 200) {
        position.value = withTiming(height, { duration: 100 });
      } else {
        position.value = withTiming(0, { duration: 100 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value , scale: inter}],
  }));
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}

const styles= StyleSheet.create({
    box: {
        width:300,
        height:300,
        backgroundColor: 'red'
    }
})

export default SwipeDown;
