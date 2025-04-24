import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import {
  addFavorite,
  getFavoritesByRessourceId,
} from "../services/favoritesService";

export default function FavorisButton({
  ressourceId,
}: {
  ressourceId: string;
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user, token } = useAuth();
  const API_URL = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchFavorite = async () => {
      if (!token) {
        console.error("Token is null or undefined.");
        return;
      }

      const _getFavoritesByRessourceId = await getFavoritesByRessourceId(
        ressourceId,
        token
      );

      if (_getFavoritesByRessourceId) {
        setIsFavorited(_getFavoritesByRessourceId.isFavorited);
      }
    };
    fetchFavorite();
  }, [ressourceId]);

  const toggleFavoris = async () => {
    try {
      if (!API_URL) {
        Alert.alert("Erreur", "API_URL non défini");
        return;
      }

      if (!user?._id) {
        Alert.alert("Erreur", "Utilisateur non authentifié.");
        return;
      }

      const data = await addFavorite(ressourceId, user._id, token || "");
      setIsFavorited(data?.isFavorited);
    } catch (error) {
      console.error("Erreur lors de la gestion des favoris :", error);
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
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
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});
