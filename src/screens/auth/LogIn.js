import { Button, Icon, Input, Image, Text, Overlay } from "@rneui/themed";
import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Pressable } from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, app } from "../../firebase/firebaseConfigs";
import { Dialog } from "@rneui/themed";
import { invokeLoginService } from "../../services/user/authService";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { TextInput } from "@react-native-material/core";

const LogIn = (props) => {
  // TODO: FIX IMAGE PATH
  // let image_path = LOGIN_IMAGE

  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [hidden, setHidden] = useState(true);

  const [forgot_pass_email, setForgotPassEmail] = useState();
  const [passdialog_visible, setPassDialogVisible] = useState(false);

  const [loading, setLoading] = useState(false)

  const onLoginButtonPress = () => {
    setLoading(true)
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    setEmail(email.trim());
    setPassword(password.trim());

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const user_access_token = user.stsTokenManager.accessToken;

        const body = {
          email,
          password,
          token: user_access_token,
        };

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/login`;
        const options = {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
        };

        fetch(url, options)
          .then((res) => res.json())
          .then((result) => {
            // console.log(result)
            setLoading(false)
            setEmail("");
            setPassword("");
            authCtx.setUserCache(result);
            authCtx.setLoggedIn(true);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
      });
  };

  const sendForgotPasswordEmail = () => {
    console.log("Sent");
    sendPasswordResetEmail(auth, forgot_pass_email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Oh no! Error ${errorCode}: ${errorMessage}`);
      });

    setForgotPassEmail("");
  };

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <View style={styles.page_container}>
          <View style={styles.image_container}>
            <Image
              source={require("../../../assets/loginPagePic.png")}
              style={styles.image_styles}
            />
          </View>

          <Overlay
            isVisible={loading}
          >
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Dialog.Loading />
            </View>
          </Overlay>

          <Input
            label="Email address"
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
            style={styles.input}
          />

          <Input
            label="Password"
            onChangeText={setPassword}
            secureTextEntry={hidden}
            rightIcon={
              <TouchableOpacity onPress={() => setHidden(!hidden)}>
                <Icon
                  name={hidden ? "eye" : "eye-off"}
                  type="ionicon"
                  color="black"
                  size={24}
                />
              </TouchableOpacity>
            }
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.forgetPassWordContainer}
            onPress={() => setPassDialogVisible(true)}
          >
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.bottomRow}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate("signup")}
            >
              <Text style={styles.signUpButton}>Sign up</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("signup")}
            >
              <Text style={styles.signUpButton}>Sign up</Text>
            </TouchableOpacity>


            <Pressable onPress={onLoginButtonPress} style={styles.loginButton}>
              <Text style={styles.buttonText} >Log In</Text>
            </Pressable>
          </View>

          <Dialog
            isVisible={passdialog_visible}
            onBackdropPress={() => setPassDialogVisible(false)}
          >
            <Dialog.Title title="Find email" />
            <Text>Enter your email. We'll send you a password reset link.</Text>
            <Input
              label="Email"
              onChangeText={setForgotPassEmail}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <Button
              style={{ margin: 10 }}
              title="Send"
              onPress={sendForgotPasswordEmail}
            />

            <Dialog.Actions>
              <Dialog.Button
                title="CANCEL"
                onPress={() => setPassDialogVisible(false)}
              />
            </Dialog.Actions>
          </Dialog>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  page_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  image_container: {
    marginTop: -100,
    marginBottom: 10,
  },
  image_styles: {
    width: 350,
    height: 280,
    alignSelf: "center",

  },
  input: {
    marginBottom: 5,

  },
  forgetPassWordContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgetPassword: {
    color: "#439BE8",
    fontWeight: "bold",
    fontSize: 14,

    marginRight: 15,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,

    marginRight: 10,
  },
  signUpButton: {
    color: "#439BE8",
    fontWeight: "bold",
    fontSize: 14,

  },
  loginButton: {
    justifyContent: "center",
    width: 75,
    // height: 32,
    // textAlign: "center",
    // textAlignVertical: "center",
    borderRadius: 10,
    marginLeft: 40,

    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#439BE8",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export default LogIn;
