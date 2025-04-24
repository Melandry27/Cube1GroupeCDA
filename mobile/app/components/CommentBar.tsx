import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { createComment } from "../services/commentsService";

const CommentBar = ({
  ressourceId,
  onSubmit = () => {},
}: {
  ressourceId: string;
  onSubmit?: (comment: string) => void;
}) => {
  const [comment, setComment] = useState("");

  const { token } = useAuth();

  const handleSend = async () => {
    if (comment.trim()) {
      try {
        const userId = "646f3a2b4c1d4e2f8b5e0c9a";
        await createComment(ressourceId, comment, userId, token || "");
        onSubmit(comment);
        setComment("");
        ToastAndroid.show(
          "Commentaire ajouté, en attente de validation",
          ToastAndroid.SHORT
        );
      } catch (error) {
        ToastAndroid.show(
          "Erreur lors de l'ajout du commentaire",
          ToastAndroid.SHORT
        );
        console.error("Error creating comment:", error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Écrire un commentaire..."
        value={comment}
        onChangeText={setComment}
      />
      <Ionicons
        name="send"
        size={20}
        color="#fff"
        style={styles.searchIcon}
        onPress={handleSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#f5f5fe",
    fontStyle: "italic",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomWidth: 2,
    borderColor: "#000091",
  },

  searchIcon: {
    padding: 10,
    backgroundColor: "#000091",
    borderTopRightRadius: 5,
    borderBottomColor: "#000091",
    height: 43,
  },
});

export default CommentBar;
