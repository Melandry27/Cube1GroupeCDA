import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Title from "../../components/Title";

export default function Login() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Connexion",
    });
  }, [navigation]);

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data: boolean = await login(email, password);

      if (!data) return;

      Alert.alert("Succès", "Connexion réussie", [
        {
          text: "OK",
          onPress: () => router.push("(main)"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    }
  };

  return (
    <View style={styles.container}>
      <Title size={"large"} style={styles.title}>
        Connexion
      </Title>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        title="S'inscrire"
        onPress={handleLogin}
        style={styles.button}
      >
        <Title style={styles.buttonText} size={"small"}>
          Se connecter
        </Title>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("(auth)/ForgotPassword")}>
        <Title size={"xsmall"} style={styles.forgotText}>
          Mot de passe oublié ?
        </Title>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#000091",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  forgotText: {
    marginTop: 15,
    color: "#000091",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
