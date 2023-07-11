import React from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet, TextInput, Alert} from 'react-native';

const Qp1 = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>
       Tell me more
       about yourself
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Gender"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Weight"
        keyboardType="numeric"
      /> 

   <View>
      <Button
        title="Next"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
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
          fontSize:25,
          fontWeight: 'bold',
        }
  });