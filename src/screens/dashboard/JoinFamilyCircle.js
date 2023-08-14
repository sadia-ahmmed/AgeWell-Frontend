import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Card, Input, Overlay} from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";

const JoinFamilyCircle = ({ navigation }) => {
  const [joinLink, setJoinLink] = useState("");

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <SafeAreaView style={styles.container}>
          <Card>
            <Card.Title style={styles.title}>Join Family Circle</Card.Title>
            <Card.Divider />
            <Input
              label="Enter Join Link"
              value={joinLink}
              onChangeText={setJoinLink}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.linkContainer}>
                <Text>Don't have a circle? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("create-family-circle")}
                >
                  <Text style={styles.link}>Create</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("family-circle-dashboard");
                }}
              >
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </SafeAreaView>
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