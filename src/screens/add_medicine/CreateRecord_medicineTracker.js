import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modal } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import { db } from '../../firebase/firebaseConfigs.js'
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';


export default function CreateRecord_medicineTracker(props) {
  const [name, setName]= useState('')
  const [time, setTime]= useState('')
  const today = new Date().toLocaleDateString('en-ZA')
  // console.log(today)
  const [startDate, setStartDate]= useState(today)
  const [endDate, setEndDate]= useState(today)
  const [openOnStartDate, setOpenOnStartDate] = useState(false)
  const [openOnEndDate, setOpenOnEndDate] = useState(false)

  const handleOnPressStartDate = () => {
    setOpenOnStartDate(!openOnStartDate)
  }

  
  const handleDateChangeStartDate = (propDate) => {
    setStartDate(propDate)
  }

  const handleOnPressEndDate = () => {
    setOpenOnEndDate(!openOnEndDate)
  }

  
  const handleDateChangeEndDate = (propDate) => {
    setEndDate(propDate)
  }
  

  const datepicker = () =>{
    return(
      <DatePicker
            mode='calendar'
            selected={date}
            onDateChange={handleDateChange}
            />
      
    )
  }

  // console.log(name)
  // console.log(startDate)
  // console.log(endDate)
  // console.log(time)




  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }





// Add med information
const addMedicine = async (e) => {
  e.preventDefault(e);
  if (name === '' || time === '') {
    alert('Please enter a valid todo');
    return;
  }
  props.navigation.navigate('homePage')

  // --------------------------------------------------------

  const d1 = new Date(startDate.replaceAll("/","-"));
    
  const d2 = new Date(endDate.replaceAll("/","-"));

  const dates = getDatesInRange(d1, d2)

  for (j of dates){

    await addDoc(collection(db, 'medicine-tracker-info-test'), {
      name: name,
      date : j.toLocaleDateString(),
      time : time,
      done: false
    });

  }

  setName('');
  setTime('');

  props.navigation.navigate('homePage')
  return
};



  return (
    <View >
      <View style = {{margin: 30}}>
        
      <View style={{flexDirection:'row',alignItems:'center' }}>
        <Text style={{flex:1, }}>Name :</Text>
        <TextInput
          editable
          multiline
          // numberOfLines={4}
          // maxLength={40}
          onChangeText={v => setName(v)}
          value={name}
          style={styles.inputStyle}
        />
      </View>



      <View style={{flexDirection:'row', marginTop:15,alignItems:'center' }}>
      <Text style={{flex:1}}>Start Date :</Text>
      <Pressable onPress={handleOnPressStartDate}
      style={styles.inputStyle}
      >
      <View pointerEvents="none">
        <TextInput 
        
        value={startDate}
        />
      </View>
      </Pressable>
      </View>


      {/* modal start date */}

      <Modal
      animationType='slide'
      transparent={true}
      visible={openOnStartDate}
      >
        <View style = {styles.centeredView}>
          <View style = {styles.modalView}>

          

            <DatePicker
            mode='calendar'
            selected={startDate}
            onDateChange={handleDateChangeStartDate}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{paddingTop:10, }}>
                Close
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>



      
      <View style={{flexDirection:'row',marginTop:15,alignItems:'center' }}>
      <Text style={{flex:1}}>End Date :</Text>
      <Pressable onPress={handleOnPressEndDate}
      style={styles.inputStyle}
      >
      <View pointerEvents="none">
        <TextInput 
        
        value={endDate}
        />
      </View>
      </Pressable>
      </View>


      {/* modal End date */}

      <Modal
      animationType='slide'
      transparent={true}
      visible={openOnEndDate}
      >
        <View style = {styles.centeredView}>
          <View style = {styles.modalView}>


            <DatePicker
            mode='calendar'
            selected={endDate}
            onDateChange={handleDateChangeEndDate}
            />

            <TouchableOpacity onPress={handleOnPressEndDate}>
              <Text style={{paddingTop:10, }}>
                Close
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>




      <View style={{flexDirection:'row',marginTop:15,alignItems:'center' }}>
        <Text style={{flex:1}}>Take your medicine at :</Text>
        <TextInput
          editable
          multiline
          onChangeText={v => setTime(v)}
          value={time}
          style={styles.inputStyle}
        />
      </View>
      </View>

      <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:20}}>
        <TouchableOpacity onPress = {addMedicine} style={{height:40,
          width:80, 
          backgroundColor:'#439be8', 
          justifyContent: 'center', 
          alignItems:'center',
          borderRadius: 15}}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    marginLeft: 15,
    padding: 10, 
    backgroundColor:'white',
    flex:3,
    borderRadius:20
    // marginTop: 10,
  },
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:22
  },
  modalView:{
    margin:20,
    backgroundColor: 'white',
    borderRadius:20,
    width:'80%',
    //height:'45%',
    padding:35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})