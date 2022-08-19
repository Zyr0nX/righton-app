import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import Amplify from "aws-amplify";

Amplify.configure;

AppRegistry.registerComponent("righton", () => App);
