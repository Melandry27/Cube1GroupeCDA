import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function RessourceDetail() {
    const { query } = useRouter();
    const { id } = query;

    return (
        <View>
            <Text>Détail de la ressource {id}</Text>
        </View>
    );
}