import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const addFavorite = async (
  ressourceId: string,
  userId: string,
  token: string
) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ressourceId, userId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add favorite");
  }

  return await response.json();
};

export const getFavoritesByRessourceId = async (
  ressourceId: string,
  token: string
) => {
  const response = await fetch(`${API_URL}/favorites/${ressourceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get favorites");
  }

  return await response.json();
};
