import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [allChatRoooms, setAllChatRoooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupName, setCurrentGroupName] = useState("");
  const [messages, setMessages] = useState({});
  const [allChatMessages, setAllChatMessages] = useState([]);
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  return (
    <GlobalContext.Provider
      value={{
        showLoginView,
        setShowLoginView,
        currentUsername,
        setCurrentUsername,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers,
        modalVisible,
        setModalVisible,
        currentGroupName,
        setCurrentGroupName,
        allChatRoooms,
        setAllChatRoooms,
        messages,
        setMessages,
        allChatMessages,
        setAllChatMessages,
        currentChatMessage,
        setCurrentChatMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
