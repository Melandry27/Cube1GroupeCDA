import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import CommentBar from "../../components/CommentBar";
import Comments from "../../components/Comments";
import FavorisButton from "../../components/FavorisButton";
import Title from "../../components/Title";
import { fetchCategoriesById } from "../../services/categoriesService";
import { fetchRessourceById } from "../../services/ressourcesService";

export default function RessourceDetail() {
  const { id } = useLocalSearchParams();
  const [ressource, setRessource] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    const loadRessource = async () => {
      if (!id) {
        console.error("L'id de la ressource n'existe pas");
        return;
      }
      try {
        const data = await fetchRessourceById(String(id), token || "");
        const category = await fetchCategoriesById(
          data.categoryId,
          token || ""
        );
        setRessource(data);
        setCategory(category);
      } catch (error) {
        console.error("Erreur lors de la récupération de la ressource:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRessource();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000091" />
        <Text style={styles.loadingText}>Chargement de la ressource...</Text>
      </View>
    );
  }

  if (!ressource) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Aucune ressource trouvée pour cet ID.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <Title size={"medium"} style={styles.titleWidth}>
            {ressource.title}
          </Title>

          <Text
            style={[
              styles.author,
              { backgroundColor: category?.color || "#f0f0f0", color: "#fff" },
            ]}
          >
            {category?.name || "Catégorie inconnue"}
          </Text>

          <FavorisButton ressourceId={ressource._id} />

          <Image source={{ uri: ressource.image }} style={styles.image} />

          <Text style={styles.text}>{ressource.content}</Text>

          <Text style={styles.author}>
            {ressource.createdBy?.name || "Utilisateur inconnu"}
          </Text>
        </View>

        <CommentBar
          ressourceId={ressource._id}
          onSubmit={(comment) => console.log(comment)}
        />

        <Comments ressourceId={ressource._id} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  text: {
    fontSize: 18,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  titleWidth: {
    width: "80%",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 20,
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#000091",
  },
  errorText: {
    fontSize: 16,
    color: "#D10000",
    textAlign: "center",
  },
});
