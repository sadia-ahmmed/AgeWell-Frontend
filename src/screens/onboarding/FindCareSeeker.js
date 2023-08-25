import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../providers/AuthProviders";

const FindCareSeeker = (props) => {
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
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("selfinfopage")}>
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
    width: 375,
    height: 280,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bfff",
    opacity: 0.8,
    fontFamily: "serif",
  },
  subHeading: {
    fontSize: 24,
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
