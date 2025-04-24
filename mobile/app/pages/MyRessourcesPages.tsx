import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Title from "../components/Title";
import { fetchRessourcesByUser } from "../services/ressourcesService";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const MyRessourcesPage = () => {
  const { user } = useAuth();
  const [ressources, setRessources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadRessources = async () => {
      if (!user || !user._id) return;
      try {
        const data = await fetchRessourcesByUser(user._id);
        setRessources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRessources();
  }, [user]);

  const handlePress = (id) => {
    router.push(`/${String(id)}`);
  };

  const renderRessourceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item._id)}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Title size="medium" style={styles.title}>
        Mes Ressources
      </Title>
      {ressources.length > 0 ? (
        <FlatList
          data={ressources}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={renderRessourceItem}
        />
      ) : (
        <Text style={styles.emptyText}>
          Vous n'avez aucune ressource pour le moment.
        </Text>
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

export default MyRessourcesPage;