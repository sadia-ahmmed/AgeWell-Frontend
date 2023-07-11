import { SafeAreaView, StyleSheet, Text, View, Image, Button, Alert} from 'react-native'
import React from 'react'

export default function careSeeker1() {
  return (
   <SafeAreaView style={styles.container}>
    <View>
    <Image
        style={styles.imageStyle}
        source={require('/Users/hridoy/Downloads/AgeWell-Frontend-main/assets/2353_R0lVIERBTiA1MjYtMTg.jpg')}
      />
    </View>
    <View>
       <Text style={styles.titleTextStyle}>
        Find Careseeker,{"\n"} Provide Care
        </Text>
        {/* <Text style={styles.baseText}>
        Find the suitable careseekers who are looking for a person like you, provide good service and earn.
        </Text> */}
    </View>
    <View>
      <Text style={styles.title}>
      Find the suitable careseekers who are looking for a person like you, provide good service and earn
      </Text>
      <View style ={styles.b1}>
      <Button
        title="Next"
        onPress={() => Alert.alert('Simple Button pressed')}
      /> 
      </View>
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
    },
    titleTextStyle:{
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:30
    },
    // baseText:{
    //     fontSize:12,
    //     flexWrap: 'wrap'
    //
    title: {
        textAlign: 'center',
        marginVertical: 8,
        margin: 50
    },
    b1:{
        borderRadius: 10,
        width: 200,
        height: 80,
        justifyContents: 'center',
        margin: 20,
        marginVertical: 8,
        marginHorizontal: 120
    }
})