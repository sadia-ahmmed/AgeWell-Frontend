import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Card, Input, Overlay } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import AdaptiveView from "../../components/AdaptiveView";
import { auth } from "../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../configs";

const JoinFamilyCircle = ({ navigation }) => {
  const [joinCode, setJoinCode] = useState("")

  const joinCircle = () => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken

    const body = {
      code: joinCode
    }

    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/circle/join`
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user_access_token}`,
      },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        alert("Joined circle!")
        navigation.navigate("family-circle-dashboard")
      })
      .catch(err => {
        alert(err.message)
      })

  }

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <AdaptiveView style={styles.container}>
          <Card>
            <Card.Title style={styles.title}>Join Family Circle</Card.Title>
            <Card.Divider />
            <Input
              label="Enter Circle Code"
              value={joinCode}
              onChangeText={setJoinCode}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.linkContainer}>
                <Text>Don't have a circle?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("create-family-circle")}
                >
                  <Text style={styles.link}>Create</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={joinCircle}
              >
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "#00bfff",
    marginLeft: 5,
  },
});

export default JoinFamilyCircle;