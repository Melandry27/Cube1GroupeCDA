import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const fetchMembers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/members`);
    if (!response.ok) {
      throw new Error("Failed to fetch ressource");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ressource:", error);
    throw error;
  }
};
