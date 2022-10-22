import { View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { colors } from "./../../constants/colors";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const BottomIcons = function ({
  cancelHandler,
  superHandler,
  likeHandler,
  scroll,
}) {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  console.log(scroll);
  //   const likeStyles = useAnimatedStyle(() => {
  //     const inputRange = [0, width / 2];
  //     const backgroundColor = interpolateColor(
  //       scroll,
  //       [0, width / 2],
  //       ["#fff", "#00B488"]
  //     );

  //     return {
  //       backgroundColor,
  //       opacity: 0.4,
  //     };
  //   });

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.sideContainer,
          pressed && styles.reloadPressed,
        ]}
      >
        <MaterialCommunityIcons name="reload" size={28} color={colors.yellow} />
      </Pressable>

      <Pressable
        onPress={cancelHandler}
        style={({ pressed }) => [
          styles.mainContainer,
          pressed && styles.dislikePressed,
        ]}
      >
        <Entypo name="cross" size={40} color={colors.redPastel} />
      </Pressable>

      <Pressable
        onPress={superHandler}
        style={({ pressed }) => [
          styles.sideContainer,
          pressed && styles.superPressed,
        ]}
      >
        <FontAwesome name="star" size={24} color={colors.blue} />
      </Pressable>

      <AnimatedPressable onPress={likeHandler} style={[styles.mainContainer]}>
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
  );
};

export default BottomIcons;

const styles = StyleSheet.create({
  container: {
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
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "50%",
    height: "50%",
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
