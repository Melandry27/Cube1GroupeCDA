import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const Header = () => {
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
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
});

export default Header;