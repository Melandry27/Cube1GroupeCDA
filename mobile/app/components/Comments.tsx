import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import {
  deleteComment,
  fetchCommentsByRessourceId,
} from "../services/commentsService";

const Comments = ({ ressourceId }: { ressourceId: string }) => {
  const [comments, setComments] = useState<
    { _id: string; userName?: string; content: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const { token } = useAuth();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchCommentsByRessourceId(ressourceId, token || "");
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ressourceId) {
      loadComments();
    }
  }, [ressourceId]);

  const handleOpenModal = (commentId: string) => {
    setSelectedCommentId(commentId);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedCommentId) {
      try {
        await deleteComment(selectedCommentId, token || "");
        setComments(
          comments.filter((comment) => comment?._id !== selectedCommentId)
        );
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setModalVisible(false);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (comments.length === 0) {
    return (
      <Text style={styles.noComments}>
        Il n'y a pas de commentaire pour cette ressource !
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {comments.map((item) => (
        <View key={item._id} style={styles.commentCard}>
          <Text style={styles.userName}>
            {item.userName || "Utilisateur inconnu"}
          </Text>
          <Text style={styles.content}>{item.content}</Text>
          <Ionicons
            name="trash"
            size={20}
            color="#ff0000"
            style={styles.trashIcon}
            onPress={() => handleOpenModal(item._id)}
          />
        </View>
      ))}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir supprimer ce commentaire ?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  commentCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
  noComments: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  trashIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
  },
  cancelText: {
    color: "#000",
    fontSize: 16,
  },
  deleteText: {
    color: "#ff0000",
    fontSize: 16,
  },
});

export default Comments;
