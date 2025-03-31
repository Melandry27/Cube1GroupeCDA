// index.tsx
import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";
import Title from "../../components/Title";
import RessourceSection from "../../components/RessourceSection";

export default function RessourceList() {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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