import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AnimatePresence } from 'framer-motion'
import { MotiView } from 'moti'

import DrawerButton from "../components/DrawerButton";

const AnimatedAnt = Animated.createAnimatedComponent(AntDesign);

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const CIRCLE_SIZE = 75;
const runner = 'https://image.flaticon.com/icons/png/512/55/55240.png';
const finish = 'https://image.flaticon.com/icons/png/512/65/65578.png';

const CircleButton = ({ onPress, animatedValue, buttonColor }) => {
    const inputRange = [0, 0.001, 0.5, 0.501, 1];
    const containerBg = animatedValue.interpolate({
        inputRange,
        outputRange: ['gold', 'gold', 'gold', '#3a9fbf', '#3a9fbf']
    });
    const circleBg = animatedValue.interpolate({
        inputRange,
        outputRange: ['#3a9fbf', '#3a9fbf', '#3a9fbf', 'gold', 'gold']
    });
    const buttonOpacity = animatedValue.interpolate({
        inputRange: [0, 0.250, 0.5, 0.750, 1],
        outputRange: [1, 0, 0, 0, 1],
    });
  return (
    <Animated.View
      style={{ ...StyleSheet.absoluteFillObject, ...styles.circleContainer, backgroundColor: containerBg, }}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 10, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "50%", "0%"],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View style={{ ...styles.button, opacity: buttonOpacity }}>
            <AnimatedAnt name="arrowright" size={32} color={buttonColor} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const Pic = (src) => {
    return (
        <MotiView style={styles.imageWrapper}>
            {/* <Image
                source={{ uri: src }}
            /> */}
        </MotiView>
    );
}

export default function ButtonTransitionScreen({ navigation }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [buttonColor, setButtoncolor] = useState('gold');

  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 2000,
      useNativeDriver: false,
    });

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    setButtoncolor(index === 1 ? 'gold' : '#3a9fbf');
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <DrawerButton navigation={navigation} />
      {/* <AnimatePresence exitBeforeEnter>
        <Pic />
      </AnimatePresence> */}
      <CircleButton onPress={onPress} animatedValue={animatedValue} buttonColor={buttonColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
    padding: 8,
    backgroundColor: "gold",
  },
  circle: {
    backgroundColor: "#3a9fbf",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  button: {
    // width: CIRCLE_SIZE,
    // height: CIRCLE_SIZE,
    // borderRadius: CIRCLE_SIZE,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  imageWrapper: {
    width,
    height,
    backgroundColor: 'blue'
  },    
});
