import React, { useState } from 'react';
import {TouchableOpacity, StyleSheet, Alert, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { addFavorite, removeFavorite } from '../services/favoritesService';


export default function FavorisButton({ ressourceId }: { ressourceId: string }) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriId, setFavoriId] = useState<string | null>(null);
    const API_URL = Constants.expoConfig?.extra?.API_URL;


    const toggleFavoris = async () => {
        try {
            if (!API_URL) {
                Alert.alert("Erreur", "API_URL non défini");
                return;
            }

            if (isFavorited && favoriId) {
                await removeFavorite(favoriId);
                setIsFavorited(false);
                setFavoriId(null);
                ToastAndroid.show('Ressource supprimée des favoris.', ToastAndroid.SHORT);
            } else {
                const data = await addFavorite(ressourceId, "Joseph", "Truc"); //A modifier nigo
                setIsFavorited(true);
                setFavoriId(data._id);
                ToastAndroid.show('Ressource ajoutée aux favoris !', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Erreur lors de la gestion des favoris :', error);
            Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={toggleFavoris}>
            <Ionicons
                name={isFavorited ? "heart" : "heart-outline"}
                size={24}
                color={isFavorited ? "red" : "black"}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
});
