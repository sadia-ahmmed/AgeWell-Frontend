import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text , Image, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';                         

import AccountSelection from './src/screens/account-selection';
import CareGiver from './src/screens/CareGiver';

export default function App() {
  return (
    
    <SafeAreaView style={styles.container}>
      <Text>Hello huhuhu</Text>
      <AccountSelection />
      <Button title="Go to CareGiver" onPress={() => navigation.navigate('CareGiver')} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});