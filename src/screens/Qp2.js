import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'

export default function Qp2() {
  return (
    <SafeAreaView>
       <Text style={styles.title}>
      Do you have Diabetes?
      </Text>
      <View>
      <Image
        style={styles.imageStyle}
        source={require('/Users/hridoy/Downloads/AgeWell-Frontend-main/assets/glucose-meter.png')}
      />
      </View>

      <View style={styles.fixToText}>
        <Button
          title="Yes"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="No"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>


      <View>
      <Button
        title="Next"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
   </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
     width: 'auto',
     height: 'auto',
     alignItems: 'center',
     justifyContent: 'center',
    },
  imageStyle:{
      paddingTop: 10,
      width: 200,
      height: 200,
      marginHorizontal: 30,
      paddingBottom:10
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize:25,
    fontWeight: 'bold',
    paddingBottom:20
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 50
  },
})