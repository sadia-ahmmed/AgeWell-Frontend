import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Button } from 'react-native';
import { Card, Input } from '@rneui/themed'
import { AuthContext } from '../../providers/AuthProviders';
import AdaptiveView from '../../components/AdaptiveView';
import { auth } from '../../firebase/firebaseConfigs';
import { IP_ADDRESS, IP_PORT } from '../../../configs';

const CreateFamilyCircle = ({ navigation }) => {

  const [familyCircleName, setFamilyCircleName] = useState("");

  const handleCreate = () => {
    // Your logic for handling the creation
    const user_access_token = auth.currentUser.stsTokenManager.accessToken

    const body = {
      circle_name: familyCircleName
    }
    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/circle/create`
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user_access_token}`
      },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        navigation.navigate("family-circle-dashboard")
      })
      .catch(err => {
        alert(err.message)
      })

  }

  return (
    <AuthContext.Consumer>
      {
        (authCtx) => (
          <AdaptiveView style={styles.container}>
            <Card style={styles.card}>
              <Card.Title>Create Family Circle</Card.Title>
              <Card.Divider />
              <Input label="Enter Family Circle Name" value={familyCircleName} onChangeText={setFamilyCircleName} />
              <View style={styles.bottomRow}>
                <View style={styles.joinTextContainer}>
                  <Text>Already have a circle?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("join-family-circle")}>
                    <Text style={styles.link}>Join</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreate}
                >
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </AdaptiveView>
        )
      }
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  joinTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "#00bfff",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",

  },
});

export default CreateFamilyCircle;