import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";

const DiabetesPage = (props) => {

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
                  <TouchableOpacity style={styles.button} onPress = {() => props.navigation.navigate("bloodpressure")}>
                    <Text style={styles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress = {() => props.navigation.navigate("bloodpressure")}>
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
    width: 200,
    height: 200,
    marginBottom: 50,
    marginTop: -50,
  },
  question: {
    fontSize: 20,
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
    paddingVertical: 35,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default DiabetesPage;