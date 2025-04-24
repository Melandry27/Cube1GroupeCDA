import { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, Text} from "react-native";
import {fetchFavoritesByUserId, fetchRessourcesByUserId} from "../services/favoritesService";
import { useAuth } from "../../context/AuthContext";
import Title from "../components/Title";

const MyFavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user || !user._id) return;
      try {
        const data = await fetchFavoritesByUserId(user._id);
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);
  return (
    <View style={styles.container}>
      <Title size="medium" style={styles.title}>
        Mes Favoris
      </Title>
      {favorites && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Vous n'avez aucun favori pour le moment.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000091",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MyFavoritesPage;