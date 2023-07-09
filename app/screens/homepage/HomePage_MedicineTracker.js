import { StyleSheet, Text, View,Pressable, Image, TouchableOpacity, Modal } from 'react-native'
import {calenderIcon} from '../../images/calendarIcon.png'
import React, { useState } from 'react'
import CreateRecord_medicineTracker from '../add_medicine/CreateRecord_medicineTracker'

export default function HomePage_MedicineTracker(props) {
  const [modal, showModal] = useState(false)
  const addNewMedicine = () => {
    if (modal == false){
      showModal(true)
    }else 
      showModal(false)
return
  }
//   const [count, setCount] = useState(0);
//   const onPress = () => setCount(prevCount => prevCount + 1);
  return (
    <View style= {styles.homepageBackground}>
      <View style= {styles.headline}>
        <Text style= {{flex:4, fontSize: 25,fontWeight: 'bold',}}>Your Medicine Reminder</Text>
        
      <Modal
      visible={addNewMedicine}
      
      >
      <CreateRecord_medicineTracker/>
      </Modal>

        <View style={{flex:1, width: '100%', height:"100%"}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Add a new medicine')}>
          <Image
          style= {styles.icon}
          source={require('../../images/calendarIcon.png')}
          />
       </TouchableOpacity>
        {/* onPress = {() => props.navigation.navigate('CreateRecord')} */}
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
    },
    // centered_view: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#00000099'
    // },
    // warning_modal: {
    //   width: 320,
    //   height: 600,
    //   backgroundColor: '#ffffff',
    //   borderWidth: 1,
    //   borderColor: '#000',
    //   borderRadius: 20,
    // },
    // warning_title: {
    //   height: 50,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#ff0',
    //   borderTopRightRadius: 20,
    //   borderTopLeftRadius: 20,
    // },
    // warning_body: {
    //   height: 500,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // warning_button:{
    //   flex:1,
    //   backgroundColor:'#00ffff',
    //   height:50,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   borderBottomLeftRadius:20,
    //   borderBottomRightRadius:20,
    // }
})