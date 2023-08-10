import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { auth } from '../../firebase/firebaseConfigs'
import { signOut } from 'firebase/auth'
import { invokeLogoutService } from '../../services/user/authService'
import { Button } from '@rneui/themed'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { IP_ADDRESS, IP_PORT } from '../../../configs'

const MainScreen = () => {

    const [user, setUser] = useState()
    const authCtx = useContext(AuthContext)

    const onLogoutButtonPress = (authCtx) => {
        invokeLogoutService(authCtx.userCache)
        signOut(auth)
        authCtx.setUserCache([])
        authCtx.setLoggedIn(false)
    }


    useEffect(() => {

        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const httpPolling = setInterval(() => {
            fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/get`, {
                method: "GET",
                mode: "cors",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
            })
                .then(res => res.json())
                .then(result => {
                    setUser(result)
                    authCtx.setUserCache(user)
                })
                .catch(error => {
                    alert('Error getting user details')
                })
        }, 1000)

        return () => clearInterval(httpPolling)

    }, [])


    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.main_container}>
                        <Text>Main</Text>
                        <View style={{ margin: 10 }}>
                            <Button color='red' title='LOGOUT' onPress={() => onLogoutButtonPress(authCtx)} />
                        </View>
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 80,
        padding: 30,
        backgroundColor: "white",
        flex: 1,
    }
})