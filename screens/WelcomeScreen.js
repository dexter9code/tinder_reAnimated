import { StatusBar } from "expo-status-bar";
import Welcome from "../components/welcome/Welcome";

const WelcomeScreen = function () {
  return (
    <>
      <StatusBar style="light" />
      <Welcome />
    </>
  );
};

export default WelcomeScreen;
