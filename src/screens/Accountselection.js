import  { useState } from "react";
import { SafeAreaView, TouchableOpacity} from "react-native";
import {Button, Icon, Image, Text} from '@rneui/themed';


export default function AccountSelection(){
    const [accountType, setAccountType] = useState("");
  
    return (
      <SafeAreaView style={{ textAlign: "center", alignItems: 'center', justifyContent: 'center', }}>
  
        <Text style={{fontWeight: "bold", margin: 40, fontSize: 20, color: "skyblue"}}> Choose your Account type  </Text>
  
        <SafeAreaView style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

        <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "skyblue" 
                    , borderRadius: 20, padding: 15, margin: 10}}
            onPress={() => { setAccountType("careseeker") }}
          >
            {/* <Icon name="elderly" type="material-icon" size={50} style={{padding:30}} />  */}
             <Image source={require('../../public/elderly.png')}  
               style={{ width: 95, height: 95, padding: 10, margin: 8 }} />
            <Text style={{ color: "darkslategrey", fontWeight: "bold" }}>Careseeker</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "skyblue" 
            , borderRadius: 20, padding: 15, margin: 10}}
            onPress={() => { setAccountType("caregiver") }}
          >
          {/* <Icon name="user-nurse" type="font-awesome-5" size={50} style={{padding:30}} /> */}
            <Image source={require('../../public/nurse.png')} 
            style={{ width: 95, height: 95, padding: 10, margin: 8 }} /> 
            <Text style={{ color: "darkslategrey", fontWeight: "bold" }}>Caregiver</Text>
          </TouchableOpacity>
  
        </SafeAreaView>
  

      </SafeAreaView>
    );
  }


    