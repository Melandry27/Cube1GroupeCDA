import Constants from "expo-constants";
import {fetchAllRessources} from "./ressourcesService";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const createComment = async (
  ressourceId: string,
  content: string,
  userId: string
) => {
  try {
    const response = await fetch(`${API_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ressourceId, content, userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to create comment");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error creating comment:", error.message || error);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const fetchCommentsByRessourceId = async (ressourceId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/comments/ressource/${ressourceId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const getUserCommentsCount = async (userId: string): Promise<number> => {
  try {
    const allResources = await fetchAllRessources();
    const userComments = allResources.filter(resource =>
      resource.comments?.some(comment => comment.createdBy?._id === userId)
    );
    return userComments.reduce((count, resource) => count + resource.comments.length, 0);
  } catch (error) {
    console.error("Error in getUserCommentsCount:", error);
    throw error;
  }
};
