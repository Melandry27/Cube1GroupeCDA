import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Title from "../../components/Title";
import {login} from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion.');
      }

      const data = await response.json();
      Alert.alert('Succès', 'Connexion réussie.');
      console.log('Token:', data.token); // Stockez le token de manière sécurisée
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    }
  };

  return (
    <View style={styles.container}>
      <Title size={"large"} style={styles.title}>Connexion</Title>
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
      <TouchableOpacity title="S'inscrire" onPress={handleLogin} style={styles.button}><Title style={styles.buttonText} size={"small"}>Se connecter</Title></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: {marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: '#000091', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});