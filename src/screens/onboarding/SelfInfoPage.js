import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { auth } from "../../firebase/firebaseConfigs";

const SelfInfoPage = ({ index, navigation, setStep, setProgress, progressLength }) => {

  const authCtx = useContext(AuthContext)

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  const handleClick = () => {

    const user_access_token = auth.currentUser.stsTokenManager.accessToken

    let body = {
      key: "age",
      age
    }

    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/set-account-detail`
    let options = {
      mode: "cors",
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
      body: JSON.stringify(body)
    }


    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        authCtx.setUserCache(data)
      })
      .catch(err => {
        alert(err.message)
      })


    body = {
      key: "gender",
      gender
    }
    options = {
      mode: "cors",
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        authCtx.setUserCache(data)
      })
      .catch(err => {
        alert(err.message)
      })


    body = {
      key: "weight",
      weight
    }
    options = {
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
          <View style={styles.centerContent}>
            <Text style={styles.heading}>Tell me more about yourself</Text>
            <View style={styles.inputContainer}>
              <Input
                label="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                containerStyle={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Gender"
                value={gender}
                onChangeText={setGender}
                containerStyle={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                containerStyle={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </AuthContext.Consumer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    color: "#00bfff",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#00bfff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: "#00bfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default SelfInfoPage;
