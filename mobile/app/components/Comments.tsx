import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import {deleteComment, fetchCommentsByRessourceId, editComment} from '../services/commentsService';
import { Ionicons } from "@expo/vector-icons";

const Comments = ({ ressourceId }: { ressourceId: string }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchCommentsByRessourceId(ressourceId);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
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

// Doit on garder la modification
    const handleModify = async () => {
        if (selectedCommentId) {
            await editComment(selectedCommentId, ressourceId);
            setModalVisible(false);
        }
    };

    const handleDelete = async () => {
        if (selectedCommentId) {
            await deleteComment(selectedCommentId);
            setComments(comments.filter(comment => comment._id !== selectedCommentId));
            setModalVisible(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (comments.length === 0) {
        return <Text style={styles.noComments}>Il n'y a pas de commentaire pour cette ressource !</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={comments.slice().reverse()}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                    <View style={styles.commentCard}>
                        <Text style={styles.userName}>{item.userName || 'Utilisateur inconnu'}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                            color="#666"
                            style={styles.ellipsisIcon}
                            onPress={() => handleOpenModal(item._id)}
                        />
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalOption} onPress={handleModify}>
                            <Text style={styles.modalText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={handleDelete}>
                            <Text style={styles.modalTextDelete}>Supprimer</Text>
                        </TouchableOpacity>
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
    listContent: {
        paddingBottom: 20,
    },
    commentCard: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    content: {
        fontSize: 14,
        color: '#333',
    },
    noComments: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    ellipsisIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    modalOption: {
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalText: {
        fontSize: 16,
        color: '#000',
    },
    modalTextDelete: {
        fontSize: 16,
        color: '#ff0000',
    },
});

export default Comments;