import { useNavigation } from "expo-router";
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
import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const { logout, token } = useAuth();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer votre email.");
      return;
    }
    try {
      const isReset = await forgotPassword(email);
      if (!isReset) {
        Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
        return;
      }
      if (token) logout();
      Alert.alert("Succès", "Si un compte existe, un email a été envoyé.");
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Réinitialiser le mot de passe" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Title size={"large"} style={styles.title}>
        Réinitialisation
      </Title>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Title style={styles.buttonText} size={"small"}>
          Réinitialiser
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
  title: {
    marginBottom: 20,
  },
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
