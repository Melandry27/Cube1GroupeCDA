import Constants from "expo-constants";
import { fetchAllRessources } from "./ressourcesService";

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

export const getUserFavoritesCount = async (
  userId: string,
  token: string
): Promise<number> => {
  try {
    const allResources = await fetchAllRessources(token);
    const userFavorites = allResources.filter((resource) =>
      resource.favorites?.some((favorite) => favorite.createdBy?._id === userId)
    );
    return userFavorites.length;
  } catch (error) {
    console.error("Error in getUserFavoritesCount:", error);
    throw error;
  }
};

export const fetchFavoritesByUserId = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/favorites/getByUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching resources by user ID:", error);
    throw error;
  }
};
