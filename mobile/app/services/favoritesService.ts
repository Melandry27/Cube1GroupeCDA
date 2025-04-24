import Constants from 'expo-constants';
import {fetchAllRessources} from "./ressourcesService";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const addFavorite = async (ressourceId: string, userId: string, type: string) => {
    const response = await fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ressourceId, userId, type }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add favorite');
    }

    return await response.json();
};

export const removeFavorite = async (favoriId: string) => {
    const response = await fetch(`${API_URL}/favorites/${favoriId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove favorite');
    }

    return await response.json();
};


export const getUserFavoritesCount = async (userId: string): Promise<number> => {
    try {
        const allResources = await fetchAllRessources();
        const userFavorites = allResources.filter(resource =>
          resource.favorites?.some(favorite => favorite.createdBy?._id === userId)
        );
        return userFavorites.length;
    } catch (error) {
        console.error("Error in getUserFavoritesCount:", error);
        throw error;
    }
};

export const fetchFavoritesByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/ressources`);
        if (!response.ok) {
            throw new Error('Failed to fetch resources');
        }
        const allResources = await response.json();
        return allResources.filter(resource =>
          resource.favorites?.some(favorite => favorite.createdBy?._id === userId)
        );
    } catch (error) {
        console.error("Error fetching resources by user ID:", error);
        throw error;
    }
}
