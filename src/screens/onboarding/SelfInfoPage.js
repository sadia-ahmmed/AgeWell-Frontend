import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";

const SelfInfoPage = (props) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <AuthContext.Consumer>
        {(auth) => (
                <View style={styles.container}>
                {/* <TouchableOpacity
                  style={styles.backIcon}
                  onPress={() => props.navigation.navigate("findcareseeker")}
                >
                  <Icon name="arrow-back" size={28} color="#00bfff" />
                </TouchableOpacity> */}
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
                  <TouchableOpacity style={styles.button} onPress= {() => props.navigation.navigate("diabetespage")}>
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
