import { StatusBar } from 'expo-status-bar';
import { Button, TouchableWithoutFeedback, StyleSheet, Text, View , Image, SafeAreaView, TouchableOpacity} from 'react-native';

import AccountSelection from './src/screens/account-selection';

export default function App() {
  return (
    
    <SafeAreaView style={styles.container}>
      <Text>Hello huhuhu</Text>
      <AccountSelection />
      <Button title="Click Me" onPress={() => alert('Button Clicked')} />

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