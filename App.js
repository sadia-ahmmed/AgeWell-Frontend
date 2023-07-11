import { StatusBar } from 'expo-status-bar';
import { Button, TouchableWithoutFeedback, StyleSheet, Text, View , Image, SafeAreaView, TouchableOpacity} from 'react-native';
import Qp1 from './src/screens/Qp1';
import Qp2 from './src/screens/Qp2';
import CareSeeker1  from './src/screens/CareSeeker1';

const i = 10

export default function App() {
    
  return (
    
    <SafeAreaView style={styles.container}>
      {/* <AccountSelection /> */}
      {/* <CareSeeker1/>
      <Qp1/>  */}
      {/* <StatusBar style="auto" /> */}
      <Qp2/>

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
