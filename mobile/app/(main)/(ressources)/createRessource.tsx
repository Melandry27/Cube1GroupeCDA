import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { createRessource } from "../../services/ressourcesService";

// 🧩 Déclaration de l'écran en dehors du composant principal
export const unstable_settings = {
  initialRouteName: "createRessource",
};

export const ScreenOptions = () => (
  <Stack.Screen
    name="createRessource"
    options={{
      title: "Créer une ressource",
      presentation: "modal",
    }}
  />
);

const CreateRessource = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
        return;
      }

      await createRessource({
        title: formData.title,
        content: formData.content,
        type: "In Progress",
        createdBy: user?._id,
        categoryId: "68078faa525dd7b117b4e437",
      });

      Alert.alert("Succès", "La ressource a été créée.");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur inconnue", "Une erreur est survenue.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Créer une nouvelle ressource</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(value) => handleChange("title", value)}
            placeholder="Entrez le titre"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contenu *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={formData.content}
            onChangeText={(value) => handleChange("content", value)}
            placeholder="Entrez la description"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Créer la ressource</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5FE",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#161616",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000091",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#161616",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000091",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateRessource;
