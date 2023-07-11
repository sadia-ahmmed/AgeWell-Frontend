import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { invokeLogoutService } from '../../services/user/authService'
import { AuthContext } from '../../providers/AuthProviders'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfigs'

const Dummy = (props) => {

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
                    <View>
                        <Text>Dummy</Text>
                        <Button title='LOGOUT' onPress={() => onLogoutButtonPress(authCtx)} />
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default Dummy