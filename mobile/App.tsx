import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from './app/components/Header';

export default function App() {
  return (
    <SafeAreaView>
      <Header />
      {/*<Text>Bienvenue sur ressource relationnel</Text>*/}
      <StatusBar style="auto" />
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
});
