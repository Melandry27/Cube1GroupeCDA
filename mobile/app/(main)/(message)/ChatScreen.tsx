import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../../context/AuthContext";

const SOCKET_URL = "http://10.176.130.12:3001";

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

  console.log("user", user);

  const socket = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const recipientId = "68078cbfc3f097a92fdabb62";

  useEffect(() => {
    if (!user?._id) return;

    socket.current = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.current.on("connect", () => {
      socket.current?.emit("register", user._id);
      socket.current?.emit("getMessages", {
        fromUserId: user._id,
        toUserId: recipientId,
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
      to: recipientId,
      message,
    };

    if (newMessage.message.trim() === "") return Alert.alert("Message vide !");
    if (newMessage.from === newMessage.to)
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
          style={styles.input}
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingVertical: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#F1F0F0",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default ChatScreen;
