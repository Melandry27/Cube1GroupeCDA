import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "./app/components/Header";
import RessourceSection from "./app/components/RessourceSection";
import Title from "./app/components/Title";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView>
        <Header />
        <StatusBar style="auto" />
        <Title size={"small"} style={styles.sectionTitle}>
          Nos dernières ressources
        </Title>
        <RessourceSection />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
