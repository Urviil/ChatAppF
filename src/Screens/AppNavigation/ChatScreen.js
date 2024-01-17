import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context";
import { ImageLinks } from "../../../assets/ImageLink";
import ChatComponent from "../../common/component/ChatComponent";
import Modals from "../../common/component/Modal";
import { socket } from "../../common/utils";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const {
    currentUser,
    allChatRoooms,
    setAllChatRoooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);
  const navigation = useNavigation();

  const handleLogut = () => {
    setCurrentUser("");
    setShowLoginView(false);
  };
  useEffect(() => {
    if (currentUser.trim() === "") {
      navigation.navigate("HomeScreen");
    }
  }, [currentUser]);
  useEffect(() => {
    socket.emit("getAllGroups");
    socket.on("groupList", (groups) => {
      console.log(groups);
      setAllChatRoooms(groups);
    });
  }, [socket]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headingText}>Welcome {currentUser}</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={handleLogut}
        >
          <Image style={styles.logoutImageStyle} source={ImageLinks.Logout} />
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {allChatRoooms && allChatRoooms.length > 0 ? (
          <FlatList
            data={allChatRoooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create New Group</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && <Modals />}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  logoutImageStyle: {
    width: 20,
    height: 20,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 15,
    width: "100%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
