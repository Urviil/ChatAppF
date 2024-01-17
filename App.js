import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import Router from "../frontend/src/navigation/Router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/Screens/AppNavigation/HomeScreen";
import ChatScreen from "./src/Screens/AppNavigation/ChatScreen";
import MessageScreen from "./src/Screens/AppNavigation/MessageScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Router />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,

    borderTopWidth: 1,
    // backgroundColor: "red",
    // alignItems: "center",
  },
});
