import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const fetchRessourceById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/ressources/${id}`, {
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

export const fetchAllRessources = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/ressources/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchAllRessources:", error);
    throw error;
  }
};

export const createRessource = async (data: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/ressources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Unexpected response format: Not JSON");
    }
  } catch (error) {
    console.error("Error in createRessource:", error);
    throw error;
  }
};
