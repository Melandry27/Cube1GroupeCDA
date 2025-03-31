// RessourceSection.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import RessourceCard from "./RessourceCard";

const RessourceSection = ({ itemCount }) => {
    const articles = [
        { id: 1, title: "Article 1", image: { uri: 'https://www.adimeo.com/hubfs/rediger-des-articles-de-blog-qui-seront-lus.webp' }, description: 'Description courte d\'une ressource avec des infos...' },
        { id: 2, title: "Article 1", image: { uri: 'https://www.redacteur.com/blog/wp-content/uploads/sites/6/2022/03/Image-a-la-une-design-blog.png' }, description: 'Description courte d\'une ressource avec des infos...' },
        { id: 3, title: "Article 1", image: { uri: 'https://www.redacteur.com/blog/wp-content/uploads/sites/6/2022/01/structurer-article-blog-8-etapes.jpg.webp' }, description: 'Description courte d\'une ressource avec des infos...' },
        { id: 4, title: "Article 3", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
        { id: 5, title: "Article 4", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
        { id: 6, title: "Article 5", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
        { id: 7, title: "Article 6", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
        { id: 8, title: "Article 7", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
        { id: 9, title: "Article 8", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
        { id: 10, title: "Article 9", image: require('../../assets/adaptive-icon.png'), description: 'Description courte d\'une ressource avec des infos...' },
    ];

    const displayedArticles = articles.slice(0, itemCount);

    return (
        <View style={styles.blogContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {displayedArticles.map(article => (
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
    articleCard: {
        width: 150,
        marginRight: 70,
    },
});

export default RessourceSection;