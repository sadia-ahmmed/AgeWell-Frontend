import { StyleSheet, Text, View,Pressable, Image,  TouchableWithoutFeedback, TouchableOpacity, Modal,FlatList } from 'react-native'
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
  const { cardView } = styles;
  const [combineStyles, setCombineStyles] = useState(StyleSheet.flatten([cardView, {backgroundColor:'#f7fafe'}]))
  const [done, setDone] = useState([]) 

  const k = StyleSheet.flatten([cardView, {backgroundColor:'#f7fafe'}])
  const changeCardStyle = () => {
    if (done === true) 
      {
        setDone(!done)
        setCombineStyles(StyleSheet.flatten([cardView, {backgroundColor:'#f7fafe'}]))
      }
    else 
      {
        setDone(!done)
        return setCombineStyles(StyleSheet.flatten([cardView, {backgroundColor:'#c3ebcb'}]))
      } 
  }
  // console.log(combineStyles)
  // console.log(done)

  const doUndoButton  = () => {

    return (
    <TouchableWithoutFeedback onPress = { changeCardStyle}>
                    <View style={styles.doundo}>
                      <Text>{done? 'Undo':'Done'}</Text>
                    </View>
                  </TouchableWithoutFeedback>    
    )
  }
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


  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }
  
 
  let obj = []
  let count = 0;
  for (i of medInfo) {

    const d1 = new Date(i.startDate.replaceAll("/","-"));
    
    const d2 = new Date(i.endDate.replaceAll("/","-"));

    const dates = getDatesInRange(d1, d2)

    for (j of dates){
      obj.push({'name': i.name, 'time':i.time, 'date':j, 'id':i.id, 'idx' : count})
      count += 1
    }

    


  }


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

      <View  style={{flex:1}}>
        <FlatList data={obj}
          renderItem={
            ({ item }) => (
              <View>
              <View style= {combineStyles}>
                
                  <View style={{flex:10}}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex: 1.5}}>Name:</Text>
                        <Text style={{flex: 3.5,}}>{item.name}</Text> 
                    </View>

                    <View style={{flexDirection:'row'}}>
                      <Text style={{flex: 1}}>Date:</Text>
                      <Text style={{flex: 3,}}>{item.date.toString()}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                      <Text style={{flex: 1}}>Time:</Text>
                      <Text style={{flex: 3}}>{item.time}</Text>
                    </View>
                    
                  </View>
              
                    {/* <View style={{flex: .25, justifyContent: 'center', alignItems: 'flex-end',paddingBottom:50}}>

                          <Image
                            style= {styles.dontedIcon}
                            source={require('../../images/editOrdeleteIcon.png')}
                          />
                    </View> */}
                    
              

              </View>  

              {/* <Modal
                transparent={true}
                visible={true}
              >
                  <TouchableWithoutFeedback >
                    <View style={styles.doundo}>
                      <Text>Done</Text>
                    </View>
                  </TouchableWithoutFeedback>
              </Modal>     */}

              {doUndoButton()}

    

              
            </View> 
            )
          }
        keyExtractor={item => item.idx.toString()} />


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
    dotedIcon:{
      width: 20,
      height: 30,
      resizeMode: 'contain'
    },

    cardView:{
      // flexDirection: 'row',
      marginTop:15,
      marginLeft:20,
      marginRight:15,
      flexDirection: 'row',
      backgroundColor: '#f7fafe',
      borderTopEndRadius:20,
      borderTopStartRadius:20,
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
    },
    doundo:{
      
      
      marginLeft:19.5,
      // marginRight:20,
      flexDirection: 'row',
      backgroundColor: '#439be8',
      borderBottomEndRadius:20,
      borderBottomStartRadius: 20,
      width: '90.35%',
      //height:'45%',
      padding:10,
      justifyContent:'center',
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