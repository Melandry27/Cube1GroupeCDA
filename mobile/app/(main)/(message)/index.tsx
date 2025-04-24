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
  const { user } = useAuth();
  const { members, selectMember } = useMembers();

  return (
    <>
    <Header />
    <View style={styles.container}>
      <Title size={"large"} style={styles.title}>Liste des membres</Title>

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
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 22,
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
