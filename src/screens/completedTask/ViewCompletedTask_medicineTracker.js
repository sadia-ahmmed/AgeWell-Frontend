import { StyleSheet, Text, View,Pressable, Image, TouchableOpacity, Modal,FlatList } from 'react-native'
import {calenderIcon} from '../../images/calendarIcon.png'
import React, { useState,useEffect } from 'react'
import CreateRecord_medicineTracker from '../add_medicine/CreateRecord_medicineTracker'
import { db } from '../../firebase'
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
export default function HomePage_MedicineTracker(props) {

  const [medInfo, setMedInfo] = useState('')

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'medicine-tracker-completed-task'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let medInfo = [];
      querySnapshot.forEach((doc) => {
        medInfo.push({ ...doc.data(), id: doc.id });
      });
      setMedInfo(medInfo);
    });
    return () => unsubscribe();
  }, []);

  console.log(medInfo)

  return (
    <View style= {styles.homepageBackground}>
      
      {/* flat list */}

      <View>
        <FlatList data={medInfo}
          renderItem={
            ({ item }) => (
              <View style= {styles.cardView}>
                
              <View style={{flex:10}}>

                <View style={{flexDirection:'row'}}>
                    <Text style={{flex: 2}}>Name:</Text>
                    <Text style={{flex: 4,}}>{item.name}</Text> 
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={{flex: 2}}>Date:</Text>
                  <Text style={{flex: 4,}}>{item.date}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={{flex: 2}}>Time:</Text>
                  <Text style={{flex: 4}}>{item.time}</Text>
                </View>
                <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:.5, marginVertical:10, paddingVertical:10}}>
                  <Text style={{flex: 2}}>completed At:</Text>
                  <Text style={{flex: 4}}>{item.completedAt}</Text>
                </View>

              </View>
                
              </View>   
            )
          }
        keyExtractor={item => item.id.toString()} />


      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    homepageBackground : {
        flex:1,
        backgroundColor: 'white',
        // marginTop: 8
    },
    headline:{
      flexDirection: 'row',
      width: '100%',
      height: '15%',
      backgroundColor: '#f7fafe',
      justifyContent: 'center',
      alignItems:'center',
      padding:20
    },
    icon:{
      width: 50,
      height: 90,
      resizeMode: 'contain'
    },
    dontedIcon:{
      width: 20,
      height: 30,
      resizeMode: 'contain'
    },

    cardView:{
      // flexDirection: 'row',
      margin:15,
      flexDirection: 'row',
      backgroundColor: '#f7fafe',
      borderRadius:20,
      width:'90%',
      //height:'45%',
      padding:20,
     marginLeft:20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset:{
        width:0,
        height:1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2
    }
    
})