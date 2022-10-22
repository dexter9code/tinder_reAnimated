import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Pressable, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import InformationCard from "./InformationCard";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "./../../constants/colors";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width * 0.95;
const CARD_HIGHT = height * 0.7;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ListItem = function ({ index, item }) {
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const [isPressed, setIsPressed] = useState(false);
  const [nopeIsPressed, setNopeIsPressed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPressed(false);
    }, 50);
  }, [isPressed]);

  useEffect(() => {
    setTimeout(() => {
      setNopeIsPressed(false);
    }, 50);
  }, [nopeIsPressed]);

  const onSwipeHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.width = scrollX.value;
      ctx.height = scrollY.value;
    },
    onActive: (e, ctx) => {
      if (e.numberOfPointers === 1) {
        scrollX.value = ctx.width + e.translationX;
        scrollY.value = ctx.height + e.translationY;
      }
      return;
    },
    onEnd: () => {
      scrollX.value = withSpring(0, { stiffness: 60 });
      scrollY.value = withSpring(0, { stiffness: 50 });
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(scrollX.value, [0, width / 2], ["0", "30"]);

    return {
      transform: [
        { translateX: scrollX.value },
        { rotateZ: `-${rotate}deg` },
        { translateY: scrollY.value },
      ],
    };
  });

  const InfoStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollX.value, [0, width / 2], [0, 1]);

    return {
      opacity,
    };
  });

  const InfoStyle2 = useAnimatedStyle(() => {
    if (scrollX.value < 0) {
      const opacity = interpolate(-scrollX.value, [0, width / 2], [0, 1]);
      return {
        opacity,
      };
    }
    return {};
  });

  const superLikeStyles = useAnimatedStyle(() => {
    if (scrollY.value < 0) {
      const opacity = interpolate(-scrollY.value, [0, width / 2], [0, 1]);
      return {
        opacity,
      };
    }
    return {};
  });

  const onLikePressHanlder = useCallback(() => {
    setIsPressed(true);
  });
  const onNopePressHanlder = useCallback(() => {
    setNopeIsPressed(true);
  });

  const likeStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollX.value,
      [0, width / 2],
      ["#fff", "#00B488"]
    );

    return {
      backgroundColor,
      opacity: 0.4,
    };
  });
  const dislikeStyles = useAnimatedStyle(() => {
    if (scrollX.value < 0) {
      const backgroundColor = interpolateColor(
        -scrollX.value,
        [0, width / 2],
        ["#fff", "#FF5864"]
      );
      return {
        backgroundColor,
        opacity: 0.4,
      };
    }
    return {};
  });

  const superLikeBtn = useAnimatedStyle(() => {
    if (scrollY.value < 0) {
      const backgroundColor = interpolateColor(
        -scrollY.value,
        [0, width / 2],
        ["#fff", "#0290ff"]
      );
      return {
        backgroundColor,
        opacity: 0.4,
      };
    }
    return {};
  });

  return (
    <PanGestureHandler onGestureEvent={onSwipeHandler}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.rootContainer, cardStyle]}>
          <Animated.View style={[styles.imageContainer]}>
            <Image source={{ uri: item.photo }} style={styles.iamge} />
            <Animated.Text style={[styles.aboutText, styles.i, InfoStyle]}>
              Like
            </Animated.Text>

            <Animated.Text
              style={[styles.nopeContainer, styles.nopeText, InfoStyle2]}
            >
              nope
            </Animated.Text>

            <Animated.Text
              style={[styles.superContainer, styles.superText, superLikeStyles]}
            >
              Super {"\n"}liked
            </Animated.Text>

            <InformationCard
              name={item.name}
              age={item.age}
              city={item.location}
              distance={item.area}
              style={styles.card}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View style={styles.btnContainer}>
          <View style={styles.newBtncontainer}>
            <Pressable
              style={({ pressed }) => [
                styles.sideContainer,
                pressed && styles.reloadPressed,
              ]}
            >
              <MaterialCommunityIcons
                name="reload"
                size={28}
                color={colors.yellow}
              />
            </Pressable>

            <AnimatedPressable
              onPress={onNopePressHanlder}
              style={[
                styles.mainContainer,
                dislikeStyles,
                nopeIsPressed && styles.dislikePressed,
              ]}
            >
              <Entypo name="cross" size={40} color={colors.redPastel} />
            </AnimatedPressable>

            <AnimatedPressable style={[styles.sideContainer, superLikeBtn]}>
              <FontAwesome name="star" size={24} color={colors.blue} />
            </AnimatedPressable>
            <AnimatedPressable
              onPress={onLikePressHanlder}
              style={[
                styles.mainContainer,
                likeStyles,
                isPressed && styles.likePressed,
              ]}
            >
              <AntDesign name="heart" size={30} color={colors.green} />
            </AnimatedPressable>

            <Pressable
              style={({ pressed }) => [
                styles.sideContainer,
                pressed && styles.rocketPressed,
              ]}
            >
              <Ionicons name="ios-flash" size={24} color={colors.purple} />
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootContainer: {
    width: width,
    height: CARD_HIGHT,
    position: "absolute",
    overflow: "hidden",
    marginTop: 15,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_HIGHT,
    borderRadius: 18,
    overflow: "hidden",
  },
  iamge: {
    width: "100%",
    height: "100%",
  },
  card: {
    position: "absolute",
    bottom: 20,
  },

  // like message
  aboutText: {
    position: "absolute",
    left: 10,
    top: width / 12,
    borderColor: colors.green,
    color: colors.green,
    borderWidth: 2,
    borderRadius: 8,
    transform: [
      {
        rotate: "-30deg",
      },
    ],
  },
  i: {
    fontSize: 35,
    paddingHorizontal: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 3,
    opacity: 0,
  },

  // dislike message
  nopeContainer: {
    position: "absolute",
    right: 10,
    top: width / 12,
    borderColor: colors.redPastel,
    color: colors.redPastel,
    borderWidth: 2,
    borderRadius: 8,
  },
  nopeText: {
    fontSize: 35,
    paddingHorizontal: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 3,
    opacity: 0,
  },

  //super like message
  superContainer: {
    position: "absolute",
    bottom: 150,
    right: width / 4,
    borderColor: colors.blue,
    color: colors.blue,
    borderWidth: 2,
    borderRadius: 8,
    transform: [
      {
        rotate: "-20deg",
      },
    ],
  },
  superText: {
    fontSize: 35,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 3,
    paddingLeft: 15,
    opacity: 0,
  },

  btnContainer: {
    position: "absolute",
    bottom: 50,
  },
  newBtncontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mainContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    shadowColor: "#e6e6e6",
    shadowOffset: {
      //   width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#f7f7f7",
  },
  sideContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    shadowColor: "#e6e6e6",
    shadowOffset: {
      //   width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#f7f7f7",
  },

  likePressed: {
    backgroundColor: colors.green,
    opacity: 0.4,
  },
  dislikePressed: {
    backgroundColor: colors.redPastel,
    opacity: 0.4,
  },
  rocketPressed: {
    backgroundColor: colors.purple,
    opacity: 0.4,
  },
  superPressed: {
    backgroundColor: colors.blue,
    opacity: 0.4,
  },
  reloadPressed: {
    backgroundColor: colors.yellow,
    opacity: 0.4,
  },
});
