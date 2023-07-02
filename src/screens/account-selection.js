import  { useEffect, useState } from "react";
import { StyleSheet, View, Icon } from "react-native";
import {Button, Image, Text } from '@rneui/themed';



function AccountSelection() {
   // const [appointments, setAppointments] = useState([]);
  
   // useEffect(() => {
    //  fetchAppointments();
   // }, []);

    return (
        <View>
            
            <Text> Choose your Account type  </Text>
            <Button
                
                icon={{
                name: 'user',
                type: 'font-awesome',
                size: 30,
                color: 'white',
              }}

              title="CareSeeker"
            
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(67, 155, 232, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            >
                
            </Button>
            <Image
                source={require('D:\REACT\react-native\AgeWell-Frontend\public\examination.png')}
            />
        </View>
      );
    }

    
    export default AccountSelection;