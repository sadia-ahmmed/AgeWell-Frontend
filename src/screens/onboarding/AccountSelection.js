import { useState } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Icon, Image, Text } from '@rneui/themed';
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";


export default function AccountSelection({ navigation, setStep, setProgress, progressLength }) {
  const authCtx = useContext(AuthContext)

  const onPressBox = (type) => {

    const user_access_token = auth.currentUser.stsTokenManager.accessToken

    const body = {
      key: "type",
      type
    }

    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/set-account-detail`
    const options = {
      mode: "cors",
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
      body: JSON.stringify(body)
    }


    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        authCtx.setUserCache(data)
        setStep(1)
        setProgress(1 / progressLength)
      })
      .catch(err => {
        alert(err.message)
      })

  }


  return (
    <SafeAreaView>

      <Text style={styles.title_text}>Choose your Account type</Text>

      <SafeAreaView style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

        <TouchableOpacity
          style={{
            alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "skyblue"
            , borderRadius: 20, padding: 15, margin: 10
          }}
          onPress={() => onPressBox("user")}
        >
          {/* <Icon name="elderly" type="material-icon" size={50} style={{padding:30}} />  */}
          <Image source={require('../../../public/elderly.png')}
            style={{ width: 95, height: 95, padding: 10, margin: 8 }} />
          <Text style={{ color: "darkslategrey", fontWeight: "bold", textAlign: "center" }}>Careseeker</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.choice_box_area}
          onPress={() => onPressBox("nurse")}
        >
          {/* <Icon name="user-nurse" type="font-awesome-5" size={50} style={{padding:30}} /> */}
          <Image source={require('../../../public/nurse.png')}
            style={{ width: 95, height: 95, padding: 10, margin: 8 }} />
          <Text style={{ color: "darkslategrey", fontWeight: "bold" }}>Caregiver</Text>
        </TouchableOpacity>

      </SafeAreaView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  choice_box_area: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 20,
    padding: 15,
    margin: 10,
    fontWeight: "bold"
  },
  title_text: {
    fontWeight: "900",
    marginBottom: 40,
    fontSize: 24,
    color: "skyblue",
    textAlign: "center"
  }
})

