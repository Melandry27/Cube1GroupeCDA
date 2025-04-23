import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useMembers } from "../../../context/MembersContext";

const Index = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { members, selectMember } = useMembers();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des membres</Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.memberCard}
            onPress={() => {
              selectMember(item._id);
              navigation.navigate("ChatScreen");
            }}
          >
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Chat"
          onPress={() =>
            user
              ? navigation.navigate("ChatScreen")
              : Alert.alert("Connectez-vous d'abord")
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  memberCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "600",
  },
  memberEmail: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Index;
