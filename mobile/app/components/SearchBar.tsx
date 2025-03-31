import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchText, setSearchText }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher une ressource... "
                placeholderTextColor="#A0A0A0"
                value={searchText}
                onChangeText={setSearchText}
            />
            <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        borderBottomWidth: 2,
        borderColor: '#000091',
    },

    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f5f5fe',
        fontStyle: "italic"
    },
    searchIcon: {
        padding: 10,
        backgroundColor: '#000091',
        borderTopRightRadius: 5,
        borderBottomColor: '#000091'
    },
});

export default SearchBar;