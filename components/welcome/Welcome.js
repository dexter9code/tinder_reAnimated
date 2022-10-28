import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "./../../constants/colors";
import IconButton from "./IconButton";
import InfoText from "./InfoText";

const height = Dimensions.get("window").height;

const Welcome = function () {
  return (
    <LinearGradient
      style={styles.rootContainer}
      colors={[
        "rgba(255,98,95,255)",
        "rgba(254,78,105,255)",
        "rgb(253,41,123)",
        "rgba(255,70,108,255)",
        "rgba(254,63,112,255)",
        "rgba(254,54,116,255)",
      ]}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/icons/Modern_Tinder_Logo_White.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <InfoText />
          <View style={styles.btnContainer}>
            <IconButton name={"apple"} signInType="apple" style={styles.btn1} />
            <IconButton
              name={"facebook"}
              signInType="facebook"
              style={styles.btn2}
            />
            <IconButton name={"phone"} signInType="phone" style={styles.btn1} />
          </View>
          <Text style={styles.troubleText}>trouble signing in?</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height / 4,
  },
  imageContainer: {
    width: 200,
    height: 150,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btn1: {
    marginLeft: 60,
  },
  btn2: {
    marginLeft: 43,
  },
  infoContainer: {
    justifyContent: "center",
  },
  btnContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  troubleText: {
    textAlign: "center",
    textTransform: "capitalize",
    color: "#f7f7f7",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 20,
  },
});
