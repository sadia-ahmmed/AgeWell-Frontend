import { Button, Icon, Input, Image, Text } from "@rneui/themed";
import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const CaringConnection = ({ index, setStep, setProgress, progressLength, navigation }) => {

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <View style={styles.container}>
          <Text style={styles.headline}>Caring Connection</Text>
          <Text style={styles.headline}>for Generations!</Text>
          <Image
            source={require("../../../assets/caringconnections.png")}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setStep(index + 1)
              setProgress((index + 1) / progressLength)
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
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
  headline: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#00bfff",
    opacity: 0.8,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
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

export default CaringConnection;
