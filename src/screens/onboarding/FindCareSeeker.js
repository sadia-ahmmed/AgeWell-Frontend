import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../providers/AuthProviders";

const FindCareSeeker = ({ index, setStep, setProgress, progressLength, navigation }) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.container}>
          <Image
            source={require("../../../assets/findcareseeker.png")}
            style={styles.image}
          />
          <Text style={styles.heading}>Find Careseeker,</Text>
          <Text style={styles.subHeading}>Provide Care</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Find the suitable careseekers who{"\n"}are
              looking for a person like you,{"\n"}
              provide good service and earn
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {
            setStep(index + 1)
            setProgress((index + 1) / progressLength)
          }}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
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
  image: {
    width: 275,
    height: 180,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 80,
    marginTop: 100
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00bfff",
    opacity: 0.8,
    fontFamily: "serif",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00bfff",
    opacity: 0.8,
    fontFamily: "serif",
  },
  descriptionContainer: {
    marginBottom: 30,
    opacity: 0.5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "sans-serif",
    color: "black",
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
    fontFamily: "sans-serif",
  },
});

export default FindCareSeeker;
