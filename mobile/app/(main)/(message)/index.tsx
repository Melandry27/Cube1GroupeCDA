import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useMembers } from "../../../context/MembersContext";
import Header from "../../components/Header";
import Title from "../../components/Title";

const Index = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  const { members, selectMember } = useMembers();

  return (
    <>
      <Header />
      <View style={styles.container}>
        {token && (
          <>
            <Title size={"large"} style={styles.title}>
              Liste des membres
            </Title>
            {members.length === 0 ? (
              <Text style={styles.memberName}>
                Aucun membre disponible pour le moment.
              </Text>
            ) : (
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
            )}
          </>
        )}
        {!token && (
          <View style={styles.buttonContainer}>
            <Text style={styles.memberName}>
              Connecte-toi pour pouvoir accéder au message
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  memberCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
    alignContent: "center",
    textAlign: "center",
    margin: 25,
  },
  memberEmail: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Index;
