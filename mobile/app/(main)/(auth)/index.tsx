import { router, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../components/Header";

export default function Index() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
    });
  }, [navigation]);

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("(auth)/Login");
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        {user ? (
          <>
            <Text style={styles.text}>Bienvenue, {user.name}!</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("(main)/ChangePassword")}
            >
              <Text style={styles.buttonText}>Changer mon mots de passe</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("(auth)/Login")}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("(auth)/SignUp")}
            >
              <Text style={styles.buttonText}>Créer un compte</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000091",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,

    textAlign: "center",
  },
});
