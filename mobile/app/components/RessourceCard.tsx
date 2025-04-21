import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Title from "./Title";

const RessourceCard = ({ title, description, image }) => {
    return (
        <View style={styles.card}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.textContainer}>
                <Title size={"small"} style={styles.title}>{title}</Title>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: 200,
        margin: 10,
    },
    image: {
        width: '100%',
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
        color: '#555',
    },
});

export default RessourceCard;
