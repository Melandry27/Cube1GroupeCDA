import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import RessourceCard from "./RessourceCard";
import { fetchAllRessources } from '../services/ressourcesService';

const RessourceSection = ({ itemCount, type, filterCategory }) => {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRessources = async () => {
            try {
                const data = await fetchAllRessources();

                if (type === 'last') {
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                const filteredData = filterCategory
                  ? data.filter((article) => article.categoryId === filterCategory)
                  : data;

                setArticles(filteredData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRessources();
    }, [type, filterCategory]);

    const displayedArticles = articles.slice(0, itemCount);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.blogContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {displayedArticles.map(article => (
                    <TouchableOpacity
                        key={String(article._id)}
                        style={styles.articleCard}
                        onPress={() => router.push(`/${String(article._id)}`)}
                    >
                        <RessourceCard
                            image={article.image}
                            title={article.title}
                            description={article.description}
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