import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header";
import RessourceSection from "../components/RessourceSection";
import Title from "../components/Title";

export default function App() {
  const { user } = useAuth();

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Header/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title size={"small"} style={styles.sectionTitle}>
          👋 Bonjour {user?.name || "nouvel utilisateur"}
        </Title>

        {user ? (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.squareButton}
                onPress={() => router.push("/pages/MyFavoritesPages")}
              >
                <Ionicons size={32} color={"#000091"} name={"heart"} />
                <Title size={"small"} style={styles.squareTitle}>
                  Mes Favoris
                </Title>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.squareButton}
                onPress={() => router.push("/pages/MyRessourcesPages")}
              >
                <FontAwesome6 name="book" color={"#000091"} size={32} />
                <Title size={"small"} style={styles.squareTitle}>
                  Mes Ressources
                </Title>
              </TouchableOpacity>
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

            <TouchableOpacity
              onPress={() => router.push("(auth)/Logout")}
              style={[styles.rectangleButton, { backgroundColor: "#ffdddd", marginTop: 10 }]}
            >
              <FontAwesome6 name="right-from-bracket" color={"red"} size={24} />
              <Title size={"small"} style={[styles.rectangleTitle, { color: "red" }]}>
                Se déconnecter
              </Title>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.rectangleButton}
              onPress={() => router.push("(auth)/Login")}
            >
              <FontAwesome6 name="right-to-bracket" color={"#000091"} size={24} />
              <Title size={"small"} style={styles.rectangleTitle}>
                Se connecter
              </Title>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rectangleButton, { marginTop: 10 }]}
              onPress={() => router.push("(auth)/SignUp")}
            >
              <FontAwesome6 name="user-plus" color={"#000091"} size={24} />
              <Title size={"small"} style={styles.rectangleTitle}>
                S'inscrire
              </Title>
            </TouchableOpacity>
          </>
        )}

        <Title size={"small"} style={styles.sectionTitle}>
          📚 Les dernières ressources
        </Title>
        <RessourceSection itemCount={5} type={"last"} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paragraph: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 16,
  },
  squareButton: {
    marginHorizontal: 20,
    marginTop: 20,
    width: 150,
    height: 150,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  squareTitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#000091",
  },
  rectangleTitle: {
    fontSize: 16,
    color: "#000091",
    marginLeft: 10,
  },
  scrollContent: {
    paddingBottom: 200,
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
});
