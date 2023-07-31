import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { auth } from '../../firebase/firebaseConfigs'
import { signOut } from 'firebase/auth'
import { invokeLogoutService } from '../../services/user/authService'
import { Button } from '@rneui/themed'

const MainScreen = () => {

    const onLogoutButtonPress = (authCtx) => {
        invokeLogoutService(authCtx.userCache)
        signOut(auth)
        authCtx.setUserCache([])
        authCtx.setLoggedIn(false)
    }

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
        marginTop: 40,
        padding: 30
    }
})