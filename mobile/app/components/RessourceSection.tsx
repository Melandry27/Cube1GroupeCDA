import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import RessourceCard from "./RessourceCard";

const RessourceSection = ({ itemCount }) => {
    const router = useRouter();
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
                    <TouchableOpacity key={article.id} style={styles.articleCard} onPress={() => router.push(`/${article.id}`)}>
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
