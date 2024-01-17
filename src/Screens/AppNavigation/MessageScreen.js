import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { GlobalContext } from "../../../context";
import MessageComponent from "../../common/component/MessageComponent";
import { socket } from "../../common/utils";

const MessageScreen = ({ route }) => {
  const { currentGroupName, currentGroupId } = route.params;

  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);
  const handleSend = () => {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMessage,
        groupIdentifier: currentGroupId,
        currentUser,
        timeData,
      });
      setCurrentChatMessage("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    socket.emit("findGroup", currentGroupId);
    socket.on("foundGroup", (allchats) => setAllChatMessages(allchats));
  }, [socket]);
  return (
    <View style={styles.container}>
      <View style={[styles.container, { padding: 15 }]}>
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} currentUser={currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          onChangeText={(value) => setCurrentChatMessage(value)}
          value={currentChatMessage}
          placeholder="Enter Your Message"
        />
        <Pressable onPress={handleSend} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Send</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  messageInput: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#703efe",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
