import React from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet, TextInput} from 'react-native';

const Qp1 = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView style={styles.container}> 
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Gender"
        keyboardType="numeric"
        needsOffscreenAlphaCompositing
      />

   <View>
      <Button title = "Next" onPress={() => alert('HHHHHH')}/>
   </View>
 </SafeAreaView>
  );
};

export default Qp1

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
     container: {
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 16,
        },
        title: {
          textAlign: 'center',
          marginVertical: 8,
        }
  });