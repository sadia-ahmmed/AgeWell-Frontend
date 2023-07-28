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
  getDocs,
  where,
} from 'firebase/firestore';
export default function HomePage_MedicineTracker(props) {

  const [medInfo, setMedInfo] = useState('')
  // const { cardView } = styles;
  // const [combineStyles, setCombineStyles] = useState(StyleSheet.flatten([cardView, {backgroundColor:'#f7fafe'}]))
  // const [done, setDone] = useState([]) 

  // const k = StyleSheet.flatten([cardView, {backgroundColor:'#f7fafe'}])
  // const changeCardStyle = () => {
  //   if (done === true) 
  //     {
  //       setDone(!done)
  //       setCombineStyles(StyleSheet.flatten([cardView, {backgroundColor:'#f7fafe'}]))
  //     }
  //   else 
  //     {
  //       setDone(!done)
  //       return setCombineStyles(StyleSheet.flatten([cardView, {backgroundColor:'#c3ebcb'}]))
  //     } 
  // }


  // const doUndoButton  = () => {

  //   return (
  //   <TouchableWithoutFeedback onPress = { changeCardStyle}>
  //                   <View style={styles.doundo}>
  //                     <Text>{done? 'Undo':'Done'}</Text>
  //                   </View>
  //                 </TouchableWithoutFeedback>    
  //   )
  // }
  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'medicine-tracker-info-test'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let medInfo = [];
      querySnapshot.forEach((doc) => {
        medInfo.push({ ...doc.data(), id: doc.id });
      });
      setMedInfo(medInfo);
    });
    return () => unsubscribe();
  }, []);


  // Update in firebase
  const changeDoUndo = async (id,done,name, time, date) => {
    await updateDoc(doc(db, 'medicine-tracker-info-test', id), {
      done: !done,
    });

    if (done == false){

      await addDoc(collection(db, 'medicine-tracker-completed-task'), {
        name: name,
        date : date,
        time: time,
        completedAt : new Date().toLocaleString(),
        taskId: id
      });

  
    }else{

      //delete
      const collectionRef = collection(db,'medicine-tracker-completed-task')
      const qr =query(collectionRef, where ('taskId','==',id))
      const snapShot = await getDocs(qr)

      const result = snapShot.docs.map(doc => ({...doc.data(),id :doc.id}))

      result.forEach(async result => {
        const docRef = doc(db, 'medicine-tracker-completed-task',result.id)
        await deleteDoc(docRef)
      })
    }
    
  };

  const onDelete = async (id) => {
    await deleteDoc(doc(db, 'medicine-tracker-info-test', id));
  };


  return (
    <View style= {styles.homepageBackground}>
      <View style= {styles.headline}>
        <Text style= {{flex:4.5, fontSize: 25,fontWeight: 'bold',}}>Your Medicine Reminder</Text>
        
        <View style={{flex:1,marginEnd:10, width: '100%', height:"100%"}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Add a new medicine')}>
              <Image
              style= {styles.icon}
              source={require('../../images/createIcon.png')}
              />
          </TouchableOpacity>
        </View>

        <View style={{flex:1, width: '100%', height:"100%"}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('View All Completed Tasks')}>
              <Image
              style= {styles.icon}
              source={require('../../images/viewIcon.png')}
              />
          </TouchableOpacity>
        </View>

      </View>

      

      {/* flat list */}

      <View  style={{flex:1}}>

       
      <FlatList data={medInfo}
          renderItem={
            ({ item }) => (
              <View>

              {/* <View style= {combineStyles}>   */}
              <View style= {{
                marginTop:15,
                marginLeft:20,
                marginRight:15,
                flexDirection: 'row',
                backgroundColor: item.done ? '#f0d5db' : '#f7fafe',
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


              }}>
                
                  <View style={{flex:16}}>

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


                <View style={{flex: 1, backgroundColor:'red', marginVertical:40, }}>
                  <TouchableOpacity onPress={() => onDelete(item.id)}>
                    <Text style={{alignSelf: 'flex-end', justifyContent:'flex-start'}} ></Text>
                  </TouchableOpacity>
                </View>
                 
              

              </View>  

              <TouchableWithoutFeedback onPress = {() => changeDoUndo(item.id,
                 item.done, item.name, item.time, item.date.toString())}>
                    <View style={styles.doundo}>
                      <Text>{item.done? 'Undo':'Done'}</Text>
                    </View>
                  </TouchableWithoutFeedback>    
    
              
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
      width: 40,
      height: 80,
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
  
})