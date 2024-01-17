import { useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../../../context";
import { useNavigation } from "@react-navigation/native";

export default ChatComponent = ({ item }) => {
  const navigation = useNavigation();

  const handleNavigateToMessageScreen = () => {
    navigation.navigate("MessageScreen", {
      currentGroupName: item.currentGroupName,
      currentGroupId: item.id,
    });
  };

  return (
    <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
      <View style={styles.circle}></View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.userName}>{item.currentGroupName}</Text>
          <Text style={styles.message}>
            {item && item.message && item.message.length - 1
              ? item.message[item.message.length - 1]?.text
              : "Tap to start messaging"}
          </Text>
        </View>
        <View>
          <Text style={styles.time}>
            {item && item.message && item.message.length - 1
              ? item.message[item.message.length - 1]?.time
              : "Now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    height: 80,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "black",
  },
  message: {
    fontSize: 14,
    opacity: 0.7,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  time: {
    opacity: 0.6,
  },
});
