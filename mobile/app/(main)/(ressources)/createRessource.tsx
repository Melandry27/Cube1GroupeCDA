import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { createRessource } from '../../services/ressourcesService';
import {Stack} from "expo-router/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../../../context/AuthContext";

const CreateRessource = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth();
    const handleSubmit = async () => {
        try {

            console.log('createressource - user',user)

            await createRessource({
                title,
                content,
                type: 'In Progress',
                createdBy: user._id,
                categoryId: '67fd7f954eb452d7b67827a2',
            });
            alert('Ressource created successfully!');
            router.push('/');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error creating ressource:', error.message);
                alert(`Error creating ressource: ${error.message}`);
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred while creating the ressource.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                name="createRessource"
                options={{
                    title: "Créer une ressource",
                    presentation: "modal",
                }}
            />
            <Text style={styles.label}>Titre</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />
            <Text style={styles.label}>Contenu</Text>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                placeholder="Enter description"
            />

            

            <TouchableOpacity title="Create Ressource" style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Créer une ressource</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#000091',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CreateRessource;