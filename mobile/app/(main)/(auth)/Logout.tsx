import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { router } from 'expo-router';

export default function Logout() {
  const { logout } = useAuth();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      if (!hasLoggedOut) {
        await logout();
        setHasLoggedOut(true);
        router.push('/Login');
      }
    };

    handleLogout();
  }, [hasLoggedOut, logout]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000091" />
      <Text style={styles.text}>Déconnexion en cours...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
});