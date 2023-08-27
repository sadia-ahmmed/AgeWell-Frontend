import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import CustomButton from "../../components/CustomButton";

const BloodPressure = ({ index, setStep, setProgress, progressLength }) => {

  const authCtx = useContext(AuthContext)

  const [blood_pressure, setBloodPressure] = useState("")

  const handleClick = () => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken


    const body = {
      key: "blood_pressure",
      blood_pressure
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
        setStep(index + 1)
        setProgress((index + 1) / progressLength)
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.container}>
          <Image
            source={require("../../../assets/blood-pressure.png")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.question}>Enter your{"\n"}Blood Pressure?</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              label="Blood Pressure"
              value={blood_pressure}
              onChangeText={setBloodPressure}
              containerStyle={styles.input}
            />
          </View>
          <CustomButton title="Next" width={150} marginTop={30} onPress={handleClick} />
        </View>
      )}
    </AuthContext.Consumer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 200
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    color: "#00bfff",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 50,
    marginTop: 150,
  },
  textContainer: {
    alignItems: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    opacity: 0.8,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BloodPressure;
