import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {AuthProvider} from "../../context/AuthContext";

export default function MainLayout() {
    return (
      <AuthProvider>
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Accueil",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(ressources)"
                options={{
                    title: "Ressources",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="book" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(journaledebord)/index"
                options={{
                    title: "Journal de Bord",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="chart-column" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(main)/profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
        </Tabs>
      </AuthProvider>
    );
}