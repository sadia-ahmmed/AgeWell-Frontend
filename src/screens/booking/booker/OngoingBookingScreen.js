import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../../providers/AuthProviders'

const OngoingBookingScreen = () => {
    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View>
                        <Text>OngoingBookingScreen</Text>
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default OngoingBookingScreen

const styles = StyleSheet.create({})