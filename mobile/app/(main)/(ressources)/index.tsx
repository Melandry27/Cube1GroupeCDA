import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../components/Header";
import RessourceSection from "../../components/RessourceSection";
import Title from "../../components/Title";
import { fetchCategories } from "../../services/categoriesService";

export default function RessourceList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories = await fetchCategories(token || "");
      setCategories(fetchedCategories);
    }
    loadCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <StatusBar style="auto" />
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category._id}
              onPress={() => handleCategorySelect(category._id)}
            >
              <Title
                size={"small"}
                style={[
                  styles.tag,
                  selectedCategory === category._id && styles.selectedTag,
                ]}
              >
                {category.name}
              </Title>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Title size={"small"} style={styles.sectionTitle}>
          Ressources
        </Title>
        <RessourceSection
          itemCount={10}
          type="filtered"
          filterCategory={selectedCategory}
          searchText={searchText}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tag: {
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  selectedTag: {
    backgroundColor: "#B0BEC5",
  },
});
