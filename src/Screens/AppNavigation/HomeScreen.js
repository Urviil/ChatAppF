import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { ImageLinks } from "../../../assets/ImageLink";
import { GlobalContext } from "../../../context";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const {
    showLoginView,
    setShowLoginView,
    currentUsername,
    setCurrentUsername,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);

  const handleRegisterAndSignIn = (isLogin) => {
    if (currentUsername.trim() !== "") {
      const index = allUsers.findIndex(
        (userItem) => userItem === currentUsername
      );
      if (isLogin) {
        if (index === -1) {
          Alert.alert("Please register first");
        } else {
          setCurrentUser(currentUsername);
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUsername);
          setAllUsers(allUsers);
          setCurrentUser(currentUsername);
        } else {
          Alert.alert("Already Registerd!!!", "Please Login ");
        }
      }
      setCurrentUsername("");
    } else {
      Alert.alert("User name field is empty");
    }
    Keyboard.dismiss();
  };
  console.log("alluser", allUsers, currentUser);

  useEffect(() => {
    if (currentUser.trim() !== "") {
      navigation.navigate("ChatScreen");
    }
  }, [currentUser]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Text>HomeScreen</Text> */}
      <ImageBackground
        style={styles.homeImageStyle}
        source={ImageLinks.homeImage}
      />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.info}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.label}>Enter Your Username</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter Your Username"
                style={styles.loginInput}
                onChangeText={(value) => setCurrentUsername(value)}
                value={currentUsername}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.info}>
            <Text style={styles.label}>Get started</Text>
            <Text style={styles.subLabel}>
              Connect to people around you for free
            </Text>
            <TouchableOpacity
              onPress={() => setShowLoginView(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeImageStyle: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  info: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 15,
    color: "#acacac",
    marginBottom: 15,
  },
  loginInput: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 15,
    marginVertical: 10,
    width: "33%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
