import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../configs";

const DiabetesPage = ({ index, setStep, setProgress, progressLength }) => {

  const authCtx = useContext(AuthContext)

  const handleClick = (diabetes) => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken


    const body = {
      key: "diabetes",
      diabetes
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
          {/* <TouchableOpacity
                  style={styles.backIcon}
                  onPress={() => props.navigation.navigate("selfinfopage")}
                >
                  <Icon name="arrow-back" size={28} color="#00bfff" />
                </TouchableOpacity> */}
          <Image
            source={require("../../../assets/diabetics.png")}
            style={styles.image}
          />
          <Text style={styles.question}>Do you have diabetes?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleClick("yes")}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleClick("no")}>
              <Text style={styles.buttonText}>No</Text>
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
    justifyContent: "center",
    alignItems: "center",
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
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
    opacity: 0.8,
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

export default DiabetesPage;
