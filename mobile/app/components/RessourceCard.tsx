import Constants from "expo-constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Title from "./Title";

const API_URL_IMAGE = Constants.expoConfig?.extra?.API_URL_IMAGE;

const RessourceCard = ({
  title,
  description,
  image,
  categoryName,
  categoryColor,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `${API_URL_IMAGE}/${image}` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Title size={"small"} style={styles.title}>
          {title}
        </Title>
        {categoryName && (
          <View
            style={[
              styles.categoryTag,
              { backgroundColor: categoryColor || "#969696" },
            ]}
          >
            <Text style={styles.categoryText}>{categoryName}</Text>
          </View>
        )}
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 200,
    margin: 10,
  },
  image: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  categoryTag: {
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    // backgroundColor: '#E0E0E0',
    alignSelf: "flex-start",
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default RessourceCard;
