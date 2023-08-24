import { Button, Icon, Input, Image, Text } from "@rneui/themed";
import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { LOGIN_IMAGE } from "../../../Images";
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

  const onLoginButtonPress = () => {
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
            <TouchableOpacity
              onPress={() => props.navigation.navigate("signup")}
            >
              <Text style={styles.signUpButton}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLoginButtonPress}>
              <Text style={styles.loginButton}>Log In</Text>
            </TouchableOpacity>
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
    marginBottom: 20,
  },
  image_styles: {
    width: 350,
    height: 280,
    alignSelf: "center",
  },
  input: {
    marginBottom: 15,
    fontFamily: "sans-serif",
  },
  forgetPassWordContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgetPassword: {
    color: "#00bfff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "sans-serif",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginRight: 15,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    fontFamily: "sans-serif",
    marginRight: 10,
  },
  signUpButton: {
    color: "#00bfff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "sans-serif",
  },
  loginButton: {
    backgroundColor: "#00bfff",
    color: "white",
    fontWeight: "bold",
    width: 65,
    height: 32,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "sans-serif",
    marginLeft: 40,
  },
});

export default LogIn;

//   return (
//     <AuthContext.Consumer>
//       {(authCtx) => (
//         <View
//           style={styles.page_container}
//           // edges={['top']}
//         >
//           <View style={styles.image_container}>
//             <Image
//               source={require("../../../assets/loginPagePic.png")}
//               style={styles.image_styles}
//             />
//           </View>

//           <Input
//             label="Email address"
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             textContentType="emailAddress"
//           />

//           <Input
//             label="Password"
//             onChangeText={setPassword}
//             secureTextEntry={hidden ? true : false}
//             rightIcon={
//               <TouchableOpacity
//                 onPress={() => (hidden ? setHidden(false) : setHidden(true))}
//               >
//                 <Icon
//                   name={hidden ? "eye" : "eye-off"}
//                   type="ionicon"
//                   color="black"
//                   size={24}
//                 />
//               </TouchableOpacity>
//             }
//           />
//           {/* forget password below the input */}

//           <View style={styles.forgetPassWordContainer}>
//             <TouchableOpacity onPress={() => setPassDialogVisible(true)}>
//               <Text style={styles.forgetPassword}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.bottomRow}>
//             <View style={styles.signup}>
//               <Text>Don't have an account?</Text>
//               <TouchableOpacity
//                 onPress={() => props.navigation.navigate("signup")}
//               >
//                 <Text style={styles.signUpButton}> Sign up</Text>
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity onPress={onLoginButtonPress}>
//               <Text style={styles.login}>Log In</Text>
//             </TouchableOpacity>
//           </View>

//   <Dialog
//     isVisible={passdialog_visible}
//     onBackdropPress={() => setPassDialogVisible(false)}
//   >
//     <Dialog.Title title="Find email" />
//     <Text>Enter your email. We'll send you a password reset link.</Text>
//     <Input
//       label="Email"
//       onChangeText={setForgotPassEmail}
//       keyboardType="email-address"
//       textContentType="emailAddress"
//     />
//     <Button
//       style={{ margin: 10 }}
//       title="Send"
//       onPress={sendForgotPasswordEmail}
//     />

//     <Dialog.Actions>
//       <Dialog.Button
//         title="CANCEL"
//         onPress={() => setPassDialogVisible(false)}
//       />
//     </Dialog.Actions>
//   </Dialog>

//           {/* <View>
//                             <Button style={{ margin: 10 }} title="Google" onPress={() => googleLogin()} />
//                         </View> */}
//         </View>
//       )}
//     </AuthContext.Consumer>
//   );
// };

// export default LogIn;

// const styles = StyleSheet.create({
//   page_container: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     margin: 30,
//     marginTop: 100,
//   },
//   image_container: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image_styles: {
//     width: 250,
//     height: 250,
//     margin: 30,
//     alignSelf: "center",
//   },
//   forgetPassWordContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     alignItems: "flex-start",
//     justifyContent: "flex-end",
//     marginRight: 5,
//   },
//   forgetPassword: {
//     color: "#00bfff",
//     fontWeight: "bold",
//     fontSize: 14,
//     fontFamily: "sans-serif",
//     marginBottom: 10,
//     textShadowColor: "rgba(0, 0, 0, 0.1)",
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//   },
//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   signup: {
//     flexDirection: "row",
//     marginBottom: 20,
//     alignItems: "flex-start",
//     justifyContent: "flex-end",
//     marginRight: 5,
//   },
//   signUpButton: {
//     color: "#00bfff",
//     fontWeight: "bold",
//     fontSize: 14,
//     fontFamily: "sans-serif",
//     marginBottom: 10,
//   },
//   login: {
//     backgroundColor: "#00bfff",
//     color: "white",
//     fontWeight: "bold",
//     width: 60,
//     height: 30,
//     textAlign: "center",
//     textAlignVertical: "center",
//     borderRadius: 10,
//     fontSize: 16,
//     fontFamily: "sans-serif",

//   },
// });
