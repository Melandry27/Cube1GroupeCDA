import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from "./Title";
import SearchBar from "./SearchBar";

const Header = ({ props }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Image source={require('../../assets/Ministère_des_Solidarités_et_de_la_Santé.png')} style={styles.logo} />

                <TouchableOpacity style={styles.searchButton} onPress={() => setSearchVisible(!searchVisible)}>
                    <Ionicons name="search" size={24} color="#000091" />
                </TouchableOpacity>
            </View>
            <View style={styles.grayBar} />
            <Title style={styles.title} size={"medium"}>(Re)sources Relationnelles</Title>

            {searchVisible && (
                <View style={styles.searchContainer}>
                    <SearchBar/>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    grayBar: {
        height: 2,
        backgroundColor: '#e1e1e1',
        marginHorizontal: 22,
    },
    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 24,
    },
    logo: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#161616',
    },
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default Header;
