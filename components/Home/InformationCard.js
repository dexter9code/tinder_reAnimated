import { View, StyleSheet, Text } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const InformationCard = function ({ name, age, city, distance, style }) {
  return (
    <View style={style}>
      <View style={styles.fontsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.age}>{age}</Text>
        <MaterialIcons name="verified" size={28} color="dodgerblue" />
      </View>
      <View>
        <View style={[styles.fontsContainer, { marginTop: 8 }]}>
          <MaterialCommunityIcons
            name="city-variant-outline"
            size={18}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.aboutText}>lives in {city}</Text>
        </View>
        <View style={styles.fontsContainer}>
          <Ionicons
            name="md-location"
            size={18}
            color="white"
            style={styles.icon}
          />
          <Text style={[styles.aboutText, { textTransform: "lowercase" }]}>
            {distance} miles away
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InformationCard;

const styles = StyleSheet.create({
  name: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#f7f7f7",
    textAlign: "center",
  },
  age: {
    fontSize: 24,
    color: "#f7f7f7",
    paddingHorizontal: 5,
    textAlignVertical: "center",
    marginTop: 5,
  },
  aboutText: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "500",
    color: "#ffffff",
  },
  fontsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
});
