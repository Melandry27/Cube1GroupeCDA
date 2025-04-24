import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const createComment = async (
  ressourceId: string,
  content: string,
  userId: string,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const editComment = async (
  commentId: string,
  content: string,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error("Failed to edit comment");
    }
    return await response.json();
  } catch (error) {
    console.error("Error editing comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export const fetchCommentsByRessourceId = async (
  ressourceId: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/comments/ressource/${ressourceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
