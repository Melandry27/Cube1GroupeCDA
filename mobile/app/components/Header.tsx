import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import Title from "./Title";

const Header = ({props}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Image source={require('../../assets/Ministère_des_Solidarités_et_de_la_Santé.png')} style={styles.logo} />

                <TouchableOpacity style={styles.menuButton}>
                    <View style={styles.burgerLine} />
                    <View style={styles.burgerLine} />
                    <View style={styles.burgerLine} />
                </TouchableOpacity>
            </View>
            <View style={styles.grayBar} />
            <Title style={styles.title} size={"medium"}>(Re)sources Relationnels</Title>
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

    menuButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 24,
    },
    burgerLine: {
        width: 25,
        height: 3,
        backgroundColor: '#000',
        marginVertical: 2,
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
});

export default Header;