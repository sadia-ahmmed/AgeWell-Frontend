import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { Button, Card, Input } from '@rneui/themed'
import { invokeSignupService } from '../../services/user/authService'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfigs'

const SignUp = (props) => {

    const [fullname, setFullName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [retype_password, setRetypePassword] = useState()



    const onSignupButtonPress = () => {

        if (retype_password !== password) {
            alert("Passwords do not match. Try again!")
        }

        const user = { fullname, email, password, phone }

        invokeSignupService(user)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Signed Up!")
                props.navigation.navigate('login')
                // userCredential.user.updateProfile({
                //     displayName: fullname
                // })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error ${errorCode}: ${errorMessage}`)
            });
    }



    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.page_container}>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: 300, }}>
                            <Input label='Full Name' onChangeText={setFullName} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'stretch', width: 300, }}>
                            <Input label='Email' onChangeText={setEmail} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'stretch', width: 300, }}>
                            <Input label='Phone' onChangeText={setPhone} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'stretch', width: 300, }}>
                            <Input label='Password' secureTextEntry={true} onChangeText={setPassword} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'stretch', width: 300, }}>
                            <Input label='Retype Password' secureTextEntry={true} onChangeText={setRetypePassword} />
                        </View>
                        <Button title='Sign Up' onPress={onSignupButtonPress} />
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default SignUp

const styles = StyleSheet.create({
    page_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 30
    },
})