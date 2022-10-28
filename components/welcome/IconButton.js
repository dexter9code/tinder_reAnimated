import { Pressable, View, StyleSheet, Text, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const BUTTON_WIDTH = width / 1.2;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const IconButton = function ({ name, signInType, style }) {
  const widthX = useSharedValue(BUTTON_WIDTH);
  const heigthY = useSharedValue(50);

  const rStyle = useAnimatedStyle(() => {
    return {
      width: widthX.value,
      height: heigthY.value,
    };
  });

  function onPressHandler() {
    console.log(`pressed`);
    widthX.value = withTiming(
      BUTTON_WIDTH - 20,
      { duration: 100 },
      (finished) => {
        if (finished) {
          widthX.value = withTiming(BUTTON_WIDTH);
        }
      }
    );
    heigthY.value = withTiming(40, { duration: 100 }, (finished) => {
      if (finished) {
        heigthY.value = withTiming(50);
      }
    });
  }

  return (
    <AnimatedPressable
      style={[styles.buttonContainer, rStyle]}
      onPress={onPressHandler}
    >
      <MaterialCommunityIcons
        name={name}
        size={24}
        color={"#f7f7f7"}
        style={styles.icon}
      />
      <View style={[styles.textContainer, style]}>
        <Text style={styles.text}>sign in with {signInType}</Text>
      </View>
    </AnimatedPressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    marginVertical: 8,
  },

  icon: {
    padding: 5,
  },
  textContainer: {
    textAlign: "center",
  },
  text: {
    textTransform: "uppercase",
    color: "#f7f7f7",
    fontSize: 14,
    fontWeight: "600",
  },
});
