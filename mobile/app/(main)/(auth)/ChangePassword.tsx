import { Ionicons } from "@expo/vector-icons";
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
import { changePassword } from "../../services/authService";

export default function ChangePassword() {
  const navigation = useNavigation();

  const { token, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert(
        "Erreur",
        "Le nouveau mot de passe doit être différent de l'ancien."
      );
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const isChanged = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword,
        token || ""
      );
      if (!isChanged) {
        return Alert.alert("Erreur", "Impossible de changer le mot de passe.");
      }
      logout();
      Alert.alert("Succès", "Mot de passe modifié avec succès !");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Modifier le mot de passe" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Title size={"large"} style={styles.title}>
        Modifier le mot de passe
      </Title>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ancien mot de passe"
          secureTextEntry={!showCurrent}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity
          onPress={() => setShowCurrent(!showCurrent)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showCurrent ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          secureTextEntry={!showNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowNew(!showNew)}
          style={styles.eyeIcon}
        >
          <Ionicons name={showNew ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showConfirm ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Title style={styles.buttonText} size={"small"}>
          Valider
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 5,
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
