import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../../context/AuthContext";
import { useMembers } from "../../../context/MembersContext";

const SOCKET_URL = Constants.expoConfig?.extra?.SOCKET_URL;

type MessageType = {
  _id?: string;
  from: string;
  to: string;
  message: string;
  timestamp?: string;
};

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<MessageType[]>([]);

  const { user } = useAuth();
  const { selectedMember } = useMembers();

  const socket = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!user?._id) return;

    socket.current = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.current.on("connect", () => {
      socket.current?.emit("register", user._id);
      socket.current?.emit("getMessages", {
        fromUserId: user._id,
        toUserId: selectedMember,
      });
    });

    socket.current.on("receivedMessage", (messages) => {
      const adaptedMessages = messages.map((m: any) => ({
        _id: m._id,
        from: m.from,
        to: m.to,
        message: m.message,
        timestamp: m.timestamp,
      }));

      setChat((prev) => {
        const uniqueMessages = [
          ...new Map(
            [...prev, ...adaptedMessages].map((m) => [m._id, m])
          ).values(),
        ];
        return uniqueMessages;
      });
    });

    socket.current.on("receiveMessage", (msg) => {
      setChat((prev) => {
        const uniqueMessages = [
          ...new Map([...prev, msg].map((m) => [m._id, m])).values(),
        ];
        return uniqueMessages;
      });
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [user?._id]);

  const sendMessage = () => {
    const newMessage = {
      from: user?._id || "unknown",
      to: selectedMember,
      message,
    };

    if (newMessage.message.trim() === "") return Alert.alert("Message vide !");
    if (newMessage.from === (selectedMember || "").toString())
      return Alert.alert("Vous ne pouvez pas vous envoyer un message !");
    if (newMessage.message.length > 200)
      return Alert.alert("Message trop long (200 max)");

    socket.current?.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={chat}
        keyExtractor={(item, index) => item._id || index.toString()}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.from === user?._id ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
            {item.timestamp && (
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            )}
          </View>
        )}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Écris ton message..."
          placeholderTextColor="#6A6A6A"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingVertical: 12,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#E3EDFF",
    alignSelf: "flex-end",
    borderColor: "#000091",
    borderWidth: 1,
  },
  otherMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderColor: "#DDDDDD",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: "#161616",
  },
  timestamp: {
    fontSize: 12,
    color: "#6A6A6A",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderTopWidth: 1,
    borderColor: "#D8D8D8",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5FE",
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000091",
    borderRadius: 6,
    color: "#161616",
  },
  sendButton: {
    backgroundColor: "#000091",
    padding: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
});

export default ChatScreen;
