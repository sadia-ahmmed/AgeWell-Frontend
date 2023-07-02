import { StatusBar } from 'expo-status-bar';
import { Button, TouchableWithoutFeedback, StyleSheet, Text, View , Image, SafeAreaView, TouchableOpacity} from 'react-native';

export default function App() {
    
  return (
    
    <SafeAreaView style={styles.container}>
      <Text>Hello huhuhu</Text>
      {/* <AccountSelection /> */}
      <StatusBar style="auto" />
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
