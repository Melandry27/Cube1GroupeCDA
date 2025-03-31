import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import Title from "../../components/Title";

export default function App() {

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <Header />
            <Title size={"small"} style={styles.sectionTitle}>Journal de bords</Title>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    sectionTitle: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },

});
