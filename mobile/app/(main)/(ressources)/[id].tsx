import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Title from "../../components/Title";
import CommentBar from "../../components/CommentBar";
import Comments from "../../components/Comments";
import FavorisButton from "../../components/FavorisButton";
import { fetchRessourceById } from "../../services/ressourcesService";
import {fetchCategoriesById} from "../../services/categoriesService";

export default function RessourceDetail() {
    const { id } = useLocalSearchParams();
    const [ressource, setRessource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const loadRessource = async () => {
            if (!id) {
                console.error("L'id de la ressource n'existe pas");
                return;
            }
            try {
                const data = await fetchRessourceById(String(id));
                const category = await fetchCategoriesById(data.categoryId);
                setRessource(data);
                setCategory(category);
            } catch (error) {
                console.error('Erreur lors de la récupération de la ressource:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRessource();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!ressource) {
        return <Text style={styles.text}>Aucune ressource trouvée pour cet ID.</Text>;
    }

    console.log('ressource', ressource, category);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <Title size={"medium"} style={styles.titleWidth}>{ressource.title}</Title>
                    <Text style={[styles.author, { backgroundColor: category.color, color: '#fff' }]}>{category.name}</Text>                    <FavorisButton ressourceId={ressource._id} />
                    <Image source={{ uri: ressource.image }} style={styles.image} />
                    <Text style={styles.text}>{ressource.content}</Text>
                    <Text style={styles.author}>{ressource.createdBy.name}</Text>
                </View>
                <CommentBar
                    ressourceId={ressource._id}
                    onSubmit={(comment) => console.log(comment)}
                />
                <Comments ressourceId={ressource._id} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    text: {
        fontSize: 18,
    },
    author: {
        fontSize: 16,
        fontStyle: 'italic',
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 10,
    },
    titleWidth: {
        width: '80%',
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 20,
    },
});