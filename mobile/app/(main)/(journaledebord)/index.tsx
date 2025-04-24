import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { getUserCommentsCount } from "../../services/commentsService";
import { getUserFavoritesCount } from "../../services/favoritesService";
import { getUserResourcesCount } from "../../services/ressourcesService";

export default function App() {
  const [stats, setStats] = useState({
    resourcesCreated: 0,
    favorites: 0,
    comments: 0,
  });

  const { user, token } = useAuth();

  useEffect(() => {
    const ressourceCount =
      token && user?._id ? getUserResourcesCount(user?._id, token) : 0;
    const commentCount =
      token && user?._id ? getUserCommentsCount(user?._id, token) : 0;
    const favoriteCount =
      token && user?._id ? getUserFavoritesCount(user?._id, token) : 0;

    const fetchStats = async () => {
      const data = {
        resourcesCreated: ressourceCount,
        favorites: favoriteCount,
        comments: commentCount,
      };
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Title size={"medium"} style={styles.sectionTitle}>
        Statistiques
      </Title>
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ressources créées</Text>
          <Text style={styles.cardNumber}>{stats.resourcesCreated}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Favoris</Text>
          <Text style={styles.cardNumber}>{stats.favorites}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Commentaires</Text>
          <Text style={styles.cardNumber}>{stats.comments}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.rectangleButton}
        onPress={() => router.push("/createRessource")}
      >
        <FontAwesome6 name="plus" color={"#000091"} size={32} />
        <Title size={"small"} style={styles.rectangleTitle}>
          Créer une ressource
        </Title>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rectangleTitle: {
    fontSize: 16,
    color: "#000091",
    marginLeft: 10,
  },
  rectangleButton: {
    marginTop: 20,
    marginHorizontal: 20,
    width: 350,
    height: 75,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000091",
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
