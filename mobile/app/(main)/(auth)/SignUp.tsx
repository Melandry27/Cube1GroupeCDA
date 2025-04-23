import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Title from "../../components/Title";
import {signUp} from "../../services/authService";
import {useNavigation} from "expo-router";

export default function SignUp() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Inscription',
    });
  }, [navigation]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !adress || !phone) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await signUp(name, email, password, adress, phone);

      if (!response) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte.');
        return;
      }

      Alert.alert('Succès', 'Compte créé avec succès. Veuillez vérifier votre email pour confirmer votre compte.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('(main)/Login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    }
  };

  return (
    <View style={styles.container}>
      <Title size={"large"} style={styles.title}>Créer un compte</Title>
      <TextInput
        style={styles.input}
        placeholder="Name"
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
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity title="S'inscrire" onPress={handleSignUp} style={styles.button}><Title style={styles.buttonText} size={"small"}>S'inscire</Title></TouchableOpacity>
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