import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import {calenderIcon} from '../../images/calendarIcon.png'
import React from 'react'

export default function HomePage_MedicineTracker() {
  const moveToAddNewMedicine = () => {
    return 
  }
  return (
    <View style= {styles.homepageBackground}>
      <View style= {styles.headline}>
        <Text style= {{flex:4, fontSize: 25,fontWeight: 'bold',}}>Your Medicine Reminder</Text>
        <View style={{flex:1, width: '100%', height:"100%"}}>
        <TouchableOpacity onPress={() => this.moveToAddNewMedicine()}>
          <Image
          style= {styles.icon}
          source={require('../../images/calendarIcon.png')}
          />
        </TouchableOpacity>
        
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    homepageBackground : {
        flex:1,
        backgroundColor: 'white',
        marginTop: 8
    },
    headline:{
      flexDirection: 'row',
      width: '100%',
      height: '15%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems:'center',
      padding:20
    },
    icon:{
      width: 50,
      height: 90,
      resizeMode: 'contain'
    }
    
})