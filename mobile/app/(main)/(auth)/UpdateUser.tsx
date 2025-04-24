import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Title from "../../components/Title";
import { updateUserProfile } from "../../services/authService";

export default function UpdateProfile() {
  const { user, token, logout } = useAuth();

  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [adress, setAdress] = useState(user?.adress || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleUpdate = async () => {
    if (!name || !email || !adress || !phone) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }

    try {
      const isUpdated = await updateUserProfile(token || "", {
        name,
        email,
        adress,
        phone,
      });

      if (!isUpdated) {
        Alert.alert("Erreur", "Échec de la mise à jour du profil.");
        return;
      }

      logout();
      Alert.alert("Succès", "Profil mis à jour avec succès.");
      router.push("(main)/index");
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Title size="small" style={styles.backButtonText}>
            ← Retour
          </Title>
        </TouchableOpacity>
        <Title size="large" style={styles.title}>
          Mettre à jour le profil
        </Title>

        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          value={adress}
          onChangeText={setAdress}
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          <Title style={styles.buttonText} size="small">
            Mettre à jour
          </Title>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: "#000091",
    fontSize: 16,
  },
});
