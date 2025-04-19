import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra?.API_URL || 'http://192.168.1.124:5000/api';

export const fetchRessourceById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/ressources/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch ressource');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching ressource:', error);
        throw error;
    }
};

export const fetchAllRessources = async () => {
    try {
        const response = await fetch(`${API_URL}/ressources/`);
        if (!response.ok) {
            throw new Error('Failed to fetch ressources');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching ressources:', error);
        throw error;
    }
};

export const createRessource = async (ressource: {
    title: string;
    content: string;
    type: string;
    createdBy: string;
}) => {
    try {
        const response = await fetch(`${API_URL}/ressources/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ressource),
        });
        if (!response.ok) {
            throw new Error('Failed to create ressource');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating ressource:', error);
        throw error;
    }
};