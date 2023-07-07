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
        placeholder="useless placeholder"
        keyboardType="numeric"
      />

   <View>
      <Text style={styles.title}>
        The title and onPress handler are required. It is recommended to set
        accessibilityLabel to help make your app usable by everyone.
      </Text>
      <Button
        title="Press me"
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
        }
  });