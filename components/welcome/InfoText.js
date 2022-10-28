import { Text, StyleSheet } from "react-native";

const InfoText = function () {
  return (
    <Text style={styles.text}>
      By tapping Create Account or Sign In,you agree to our{" "}
      <Text style={styles.underLine}>Terms</Text>.Learn how we proccess your
      data in our <Text style={styles.underLine}>Privacy Policy</Text> and{" "}
      <Text style={styles.underLine}>Cookies Policy</Text>
    </Text>
  );
};

export default InfoText;

const styles = StyleSheet.create({
  text: {
    color: "#f7f7f7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 13,
  },
  underLine: {
    textDecorationLine: "underline",
  },
});
