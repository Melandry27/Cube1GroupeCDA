import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";

const Index = () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Index</Text>
      <TouchableOpacity>
        <Button
          title="Go to Chat"
          onPress={() =>
            user
              ? navigation.navigate("ChatScreen")
              : Alert.alert("Connectez-vous d'abord")
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});

export default Index;
