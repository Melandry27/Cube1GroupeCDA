import Constants from 'expo-constants';

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