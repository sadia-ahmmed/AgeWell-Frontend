import { Button, Icon, Input, Image, Text } from '@rneui/themed'
import React, { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { LOGIN_IMAGE } from '../../../Images'
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth, app } from '../../firebase/firebaseConfigs'
import { Dialog } from '@rneui/themed'
import { invokeLoginService } from '../../services/user/authService'
import { IP_ADDRESS, IP_PORT } from '../../../configs'

const LogIn = (props) => {

    // TODO: FIX IMAGE PATH
    // let image_path = LOGIN_IMAGE

    const authCtx = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [hidden, setHidden] = useState(true)

    const [forgot_pass_email, setForgotPassEmail] = useState()
    const [passdialog_visible, setPassDialogVisible] = useState(false)


    const onLoginButtonPress = () => {

        setEmail(email.trim())
        setPassword(password.trim())

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                const user_access_token = user.stsTokenManager.accessToken

                const body = {
                    email, password, token: user_access_token
                }

                const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/login`
                const options = {
                    headers: { 'Content-Type': 'application/json', },
                    method: "POST",
                    mode: 'cors',
                    body: JSON.stringify(body),
                }

                fetch(url, options)
                    .then(res => res.json())
                    .then((result) => {
                        // console.log(result)
                        setEmail("")
                        setPassword("")
                        authCtx.setUserCache(result)
                        authCtx.setLoggedIn(true)
                    }).catch((err) => {
                        alert(err.message)
                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage, errorCode)
            });
    }


    const sendForgotPasswordEmail = () => {
        console.log("Sent")
        sendPasswordResetEmail(auth, forgot_pass_email)
            .then(() => {
                alert("Password reset email sent! Check your inbox.")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Oh no! Error ${errorCode}: ${errorMessage}`)
            });

        setForgotPassEmail("")
    }


    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.page_container}
                    // edges={['top']}
                    >

                        {/* <View style={styles.image_container}>
                            <Image source={require('../../../assets/login-illustration.png')} style={styles.image_styles} />
                        </View> */}


                        < Input
                            label='Email address'
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            textContentType='emailAddress'
                        />

                        <Input
                            label='Password'
                            onChangeText={setPassword}
                            secureTextEntry={hidden ? true : false}
                            rightIcon={
                                <TouchableOpacity onPress={() => hidden ? setHidden(false) : setHidden(true)}>
                                    <Icon
                                        name={hidden ? 'eye' : 'eye-off'}
                                        type='ionicon'
                                        color='black'
                                        size={24}
                                    />
                                </TouchableOpacity>
                            }
                        />

                        <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "flex-start" }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate("signup") }}>
                                <Text style={{ textAlign: "left", fontWeight: "bold", color: "blue" }}>Sign up</Text>
                            </TouchableOpacity>

                            {/* //* invisible box */}
                            <Text style={{ width: 110 }}>{"\n"}</Text>

                            <TouchableOpacity onPress={() => setPassDialogVisible(true)}>
                                <Text style={{ textAlign: "right", fontWeight: "bold" }}>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 10 }}>
                            <Button title="Log In" onPress={onLoginButtonPress} />
                        </View>


                        <Dialog
                            isVisible={passdialog_visible}
                            onBackdropPress={() => setPassDialogVisible(false)}
                        >
                            <Dialog.Title title='Find email' />
                            <Text>Enter your email. We'll send you a password reset link.</Text>
                            <Input
                                label='Email'
                                onChangeText={setForgotPassEmail}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                            />
                            <Button style={{ margin: 10 }} title="Send" onPress={sendForgotPasswordEmail} />

                            <Dialog.Actions>
                                <Dialog.Button title="CANCEL" onPress={() => setPassDialogVisible(false)} />
                            </Dialog.Actions>
                        </Dialog>

                        {/* <View>
                            <Button style={{ margin: 10 }} title="Google" onPress={() => googleLogin()} />
                        </View> */}

                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default LogIn


const styles = StyleSheet.create({
    page_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 30,
        marginTop: 100
    },
    image_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image_styles: {
        width: 250,
        height: 250,
        margin: 30,
        alignSelf: "center"
    },
})