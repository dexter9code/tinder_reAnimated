import { Dimensions, Image, StyleSheet, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import InformationCard from "./InformationCard";
import { colors } from "./../../constants/colors";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.95;
const CARD_HIGHT = height * 0.7;

const ListItem = function ({ index, item }) {
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

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
      scrollX.value = withSpring(0);
      scrollY.value = withSpring(0);
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(scrollX.value, [0, width / 2], ["0", "30"]);

    return {
      transform: [
        { translateX: scrollX.value },
        { rotateZ: `-${rotate}deg` },
        // { translateY: scrollY.value },
      ],
    };
  });

  const InfoStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollX.value, [0, width / 3], [0, 1]);
    return {
      opacity,
    };
  });

  const InfoStyle2 = useAnimatedStyle(() => {
    if (scrollX.value < 0) {
      const opacity = interpolate(-scrollX.value, [0, width / 3], [0, 1]);
      return {
        opacity,
      };
    }
    return {};
  });

  return (
    <PanGestureHandler onGestureEvent={onSwipeHandler}>
      <Animated.View style={[styles.rootContainer, cardStyle]}>
        <Animated.View style={[styles.image]}>
          <Image
            source={{ uri: item.photo }}
            style={{ width: "100%", height: "100%" }}
          />
          <Animated.Text style={[styles.aboutText, styles.i, InfoStyle]}>
            Like
          </Animated.Text>
          <Animated.Text
            style={[styles.nopeContainer, styles.nopeText, InfoStyle2]}
          >
            nope
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
    </PanGestureHandler>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  rootContainer: {
    width: width,
    height: CARD_HIGHT,
    position: "absolute",
    overflow: "hidden",
    marginTop: 15,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HIGHT,
    borderRadius: 10,
    overflow: "hidden",
  },
  card: {
    position: "absolute",
    bottom: 20,
  },
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
});
