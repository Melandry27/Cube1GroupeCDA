import React, {useEffect, useState} from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";
import Title from "../../components/Title";
import RessourceSection from "../../components/RessourceSection";
import {fetchCategories} from "../../services/categoriesService";

export default function RessourceList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadCategories() {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        }
        loadCategories();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <StatusBar style="auto" />
            <ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                        <Title key={category._id} size={"small"} style={styles.sectionTitle}>
                            {category.name}
                        </Title>
                    ))}
                </ScrollView>


                <Title size={"small"} style={styles.sectionTitle}>Vos ressources favorites</Title>
                <RessourceSection itemCount={3} />

                <Title size={"small"} style={styles.sectionTitle}>Nos dernières ressources</Title>
                <RessourceSection itemCount={5} />

                <Title size={"small"} style={styles.sectionTitle}>Nos dernières ressources</Title>
                <RessourceSection itemCount={2} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sectionTitle: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});