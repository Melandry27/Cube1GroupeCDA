import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {AuthProvider, useAuth} from "../../context/AuthContext";
import {MembersProvider} from "../../context/MembersContext";

export default function MainLayout() {
 const user = useAuth();
  return (
    <AuthProvider>
      <MembersProvider>
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
              name="(message)"
              options={{
                title: "Messages",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome6 name="message" color={color} size={size} />
                ),
              }}
            />
          <Tabs.Screen
            name="(auth)"
            options={{
              title: "Utilisateur",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="user" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </MembersProvider>
    </AuthProvider>
  );
}