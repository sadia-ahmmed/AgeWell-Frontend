import { StatusBar } from 'expo-status-bar';
import { Button, TouchableWithoutFeedback, StyleSheet, Text, View , Image, SafeAreaView, TouchableOpacity} from 'react-native';
import Qp1 from './src/screens/Qp1';

const i = 10

export default function App() {
    
  return (
    
    <SafeAreaView style={styles.container}>
      {/* <AccountSelection /> */}
      <Qp1/> 
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
