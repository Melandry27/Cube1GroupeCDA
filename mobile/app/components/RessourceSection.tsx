import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { fetchCategories } from "../services/categoriesService";
import { fetchAllRessources } from "../services/ressourcesService";
import RessourceCard from "./RessourceCard";

const RessourceSection = ({ itemCount, type, filterCategory, searchText }) => {
  const [articles, setArticles] = useState<
    {
      _id: string;
      title: string;
      description: string;
      image: string;
      categoryId: string;
      createdAt: string;
    }[]
  >([]);
  const [categories, setCategories] = useState<
    Record<string, { name: string; color: string }>
  >({});
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    const loadRessources = async () => {
      try {
        const [data, categoryData] = await Promise.all([
          fetchAllRessources(token || ""),
          fetchCategories(token || ""),
        ]);

        const categoryMap = categoryData.reduce(
          (
            acc: Record<string, { name: string; color: string }>,
            category: { _id: string; name: string; color: string }
          ) => {
            acc[category._id] = { name: category.name, color: category.color };
            return acc;
          },
          {}
        );

        if (type === "last") {
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        const filteredData = filterCategory
          ? data.filter((article) => article.categoryId === filterCategory)
          : data;

        setCategories(categoryMap);
        setArticles(filteredData);
      } catch (error) {
        console.error("Error fetching articles or categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRessources();
  }, [type, filterCategory]);

  const displayedArticles = articles
    .filter((article) =>
      (article?.title || "")
        .toLowerCase()
        .includes((searchText || "").toLowerCase())
    )
    .slice(0, itemCount);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.blogContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {displayedArticles.map((article) => (
          <TouchableOpacity
            key={String(article._id)}
            style={styles.articleCard}
            onPress={() => router.push(`/${String(article._id)}`)}
          >
            <RessourceCard
              image={article.image}
              title={article.title}
              description={article.description}
              categoryName={categories[article.categoryId]?.name}
              categoryColor={categories[article.categoryId]?.color}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  blogContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  articleCard: {
    width: 150,
    marginRight: 70,
  },
});

export default RessourceSection;
