import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Title from "../../components/Title";

export default function RessourceDetail() {
    const { id } = useLocalSearchParams();

    // Récupérer les données de la ressource à partir de l'ID
    // const ressource = getRessourceById(id);

    return (
        <View style={styles.container}>
            <Title size={"medium"}>Titre de la ressource</Title>
            <Image></Image>
            <Text style={styles.text}>ID: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 20,
    },
    text: {
        fontSize: 18,
    },
});
