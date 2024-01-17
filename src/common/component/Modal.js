import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { GlobalContext } from "../../../context";
import { socket } from "../utils/index";

const Modals = () => {
  const {
    modalVisible,
    setModalVisible,
    currentGroupName,
    setCurrentGroupName,
  } = useContext(GlobalContext);

  const handleCreateNewRoom = () => {
    console.log("cucurrentGroupNamere", currentGroupName);
    socket.emit("createNewGroup", currentGroupName);
    setModalVisible(false);
    setCurrentGroupName("");
    Keyboard.dismiss();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter Group Name"
            style={styles.loginInput}
            onChangeText={(value) => setCurrentGroupName(value)}
            value={currentGroupName}
          />

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => handleCreateNewRoom()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginInput: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 12,
    width: "48%",
    marginTop: 15,
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Modals;
