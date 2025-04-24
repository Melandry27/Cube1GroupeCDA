import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const fetchMembers = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/users/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch ressource");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ressource:", error);
    throw error;
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
