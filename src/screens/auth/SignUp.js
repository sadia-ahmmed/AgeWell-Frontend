import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Button, Card, Input } from "@rneui/themed";
import { invokeSignupService } from "../../services/user/authService";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import AdaptiveView from "../../components/AdaptiveView";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const SignUp = (props) => {
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [retype_password, setRetypePassword] = useState();
  const [signUpBody, setSignUpBody] = useState()

  const onSignupButtonPress = () => {
    if (retype_password !== password) {
      alert("Passwords do not match. Try again!");
    }

    const user = { fullname, email, password, phone, address };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid
        // console.log(uid)
        // console.log(userCredential.user)

        const body = {
          ...user,
          uid,
        };


        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/signup`;
        const options = {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };

        // TODO: finish signup
        fetch(url, options)
          .then((res) => res.json())
          .then((data) => {
            alert(data.message);
            props.navigation.navigate("login");
          })
          .catch((err) => {
            deleteUser(userCredential.user);
            alert(err.message);
          });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      });

  };

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <AdaptiveView style={styles.page_container}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.headline}>Create your account</Text>
              <View style={styles.line}></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 300,
                }}
              >
                <Input label="Full Name" onChangeText={setFullName} />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "stretch", width: 300 }}
              >
                <Input label="Email" onChangeText={setEmail} />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "stretch", width: 300 }}
              >
                <Input
                  label="Password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "stretch", width: 300 }}
              >
                <Input
                  label="Retype Password"
                  secureTextEntry={true}
                  onChangeText={setRetypePassword}
                />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "stretch", width: 300 }}
              >
                <Input label="Phone" onChangeText={setPhone} />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "stretch", width: 300 }}
              >
                <Input label="Address" onChangeText={setAddress} />
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "stretch" }}
              >
                <TouchableOpacity style={styles.button} onPress={onSignupButtonPress}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("login")}
                >
                  <Text style={styles.loginButton}>Log In</Text>
                </TouchableOpacity>

              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 60,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    fontFamily: "sans-serif",
    marginRight: 10,
  },
  loginButton: {
    color: "#6cc456",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "sans-serif",
  },
  signupButton: {
    backgroundColor: "#6cc456",
    color: "white",
    fontWeight: "bold",
    width: 70,
    height: 35,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "sans-serif",
    marginLeft: 40,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginBottom: 10,
    color: "#6cc456",
  },
  line: {
    borderBottomColor: "#6cc456",
    opacity: 0.5,
    borderBottomWidth: 2,
    width: 300,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 14,
    // paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    // paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#6cc456",
    marginLeft: Dimensions.get("window").width / 2 - 140,
    width: 200,
    height: 35,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});
