import React from 'react';
import { View, Image, ScrollView, Text, StyleSheet } from 'react-native';
import BlogCard from "./RessourceCard";
import RessourceCard from "./RessourceCard";

const BlogSection = () => {

    // La team, faut modifier ici pour boucler sur les ressources de la base de données
    const articles = [
        { id: 1, title: "Articlo 1", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... '},
        { id: 2, title: "Article 2", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 3, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 4, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 5, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 6, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 7, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 8, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
        { id: 9, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Descirption courte d\'une ressource avec des infos... ' },
    ];

    return (
        <View style={styles.blogContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {articles.map(article => (
                    <View key={article.id} style={styles.articleCard}>
                        <RessourceCard
                            image={article.image}
                            title={article.title}
                            description={article.description}
                        />
                    </View>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    articleCard: {
        width: 150,
        marginRight: 70,
    },
    articleImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    articleTitle: {
        textAlign: 'center',
        marginTop: 5,
    },
});

export default BlogSection;
