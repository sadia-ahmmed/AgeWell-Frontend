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
    const q = query(collection(db, 'medicine-tracker-info'));
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
      <View style= {styles.headline}>
        <Text style= {{flex:4, fontSize: 25,fontWeight: 'bold',}}>Your Medicine Reminder</Text>
        
        <View style={{flex:1, width: '100%', height:"100%"}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Add a new medicine')}>
              <Image
              style= {styles.icon}
              source={require('../../images/calendarIcon.png')}
              />
          </TouchableOpacity>
        </View>
      </View>

      {/* flat list */}

      <View>
        <FlatList data={medInfo}
          renderItem={
            ({ item }) => (
              <View style= {styles.cardView}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{flex: 1}}>Name:</Text>
                  <Text style={{flex: 3}}>{item.name}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={{flex: 1}}>Starting at:</Text>
                  <Text style={{flex: 3}}>{item.startDate}</Text>
                </View><View style={{flexDirection:'row'}}>
                  <Text style={{flex: 1}}>Ends at:</Text>
                  <Text style={{flex: 3}}>{item.endDate}</Text>
                </View><View style={{flexDirection:'row'}}>
                  <Text style={{flex: 1}}>Time:</Text>
                  <Text style={{flex: 3}}>{item.time}</Text>
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
        marginTop: 8
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

    cardView:{
      // flexDirection: 'row',
      margin:15,
      backgroundColor: '#f7fafe',
      borderRadius:20,
      width:'90%',
      //height:'45%',
      padding:20,
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