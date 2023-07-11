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
                    <View style={{ padding: 30 }}>
                        <Text>This is a test dashboard</Text>
                        <View style={{ margin: 10 }}>
                            <Button title='BOOKING' onPress={() => props.navigation.navigate('booking-list')} />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Button color='red' title='LOGOUT' onPress={() => onLogoutButtonPress(authCtx)} />
                        </View>

                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default Dummy