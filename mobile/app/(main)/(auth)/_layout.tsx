import {Stack, Tabs} from 'expo-router';
import {FontAwesome} from "@expo/vector-icons";

export default function AuthLayout() {
  return <Stack screenOptions={{name: "profile", title: "Accueil", headerShown: false }} />;}