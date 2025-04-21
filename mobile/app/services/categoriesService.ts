import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL || 'http://192.168.1.124:5000/api';
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};