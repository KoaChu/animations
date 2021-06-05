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
import { AnimatePresence } from "framer-motion";
import { MotiView } from "moti";

import DrawerButton from "../components/DrawerButton";

const AnimatedAnt = Animated.createAnimatedComponent(AntDesign);

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const CIRCLE_SIZE = 75;
const runner = "https://image.flaticon.com/icons/png/512/55/55240.png";
const finish = "https://image.flaticon.com/icons/png/512/65/65578.png";

const CircleButton = ({ onPress, animatedValue, buttonColor }) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#3a9fbf", "#3a9fbf"],
  });
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["#3a9fbf", "#3a9fbf", "#3a9fbf", "gold", "gold"],
  });
  const buttonOpacity = animatedValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [1, 0, 0, 0, 1],
  });
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        ...styles.circleContainer,
        backgroundColor: containerBg,
      }}
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

const Pic = ({ imgSrc, vis, animatedValue, from }) => {
  const inputRange = [0, 0.8, 1];

  const slideIn = animatedValue.interpolate({
    inputRange,
    outputRange: [width, 0, -width],
  });

  const skew = animatedValue.interpolate({
    inputRange,
    outputRange: ["0deg", "15deg", "0deg"],
  });

  return (
    <Animated.View
      style={{
        width: width * 3,
        height,
        justifyContent: "flex-end",
        transform: [{ translateX: slideIn }, { skewX: skew }],
      }}
    >
      <Image source={{ uri: runner }} style={styles.runner} />
      <Image source={{ uri: finish }} style={styles.flag} />
    </Animated.View>
  );
};

export default function ButtonTransitionScreen({ navigation }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [buttonColor, setButtoncolor] = useState("gold");
  const [visible, setVisible] = useState(false);

  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 2000,
      useNativeDriver: false,
    });

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    setVisible(!visible);
    setButtoncolor(index === 1 ? "gold" : "#3a9fbf");
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <DrawerButton navigation={navigation} />
      <View
        style={{
          width,
          height: height / 2,
          backgroundColor: "transparent",
          position: "absolute",
          zIndex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Pic animatedValue={animatedValue} />
        {/* <AnimatePresence exitBeforeEnter>
            {!visible && <Pic imgSrc={runner} vis={visible} animatedValue={animatedValue} from={-width}/>}
            {visible && <Pic imgSrc={finish} vis={visible} animatedValue={animatedValue} from={width} />}
        </AnimatePresence> */}
      </View>
      <CircleButton
        onPress={onPress}
        animatedValue={animatedValue}
        buttonColor={buttonColor}
      />
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
    backgroundColor: "blue",
  },
  runner: {
    width: 100,
    height: 100,
    position: "absolute",
    left: width / 2 - width - 50,
    zIndex: 999,
  },
  flag: {
    width: 100,
    height: 100,
    position: "absolute",
    left: width / 2 + width - 50,
    zIndex: 999,
  },
});
