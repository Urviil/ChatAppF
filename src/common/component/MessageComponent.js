import { View, Text, StyleSheet } from "react-native";

export default function MessageComponent({ item, currentUser }) {
  const currentUserStatus = item.currentUser !== currentUser;
  return (
    <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
      <View style={styles.messageItemContainer}>
        <View style={styles.messageItemSubContainer}>
          <View
            style={
              currentUserStatus
                ? styles.messageItem
                : [styles.messageItem, { backgroundColor: "#703efe" }]
            }
          >
            <Text
              style={
                currentUserStatus ? { color: "black" } : { color: "#e5c1fe" }
              }
            >
              {item.text}
            </Text>
          </View>
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageItemContainer: {
    maxWidth: "50%",

    marginBottom: 15,
  },
  messageItemSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 2,
  },

  messageTime: {
    marginLeft: 10,
  },
});
