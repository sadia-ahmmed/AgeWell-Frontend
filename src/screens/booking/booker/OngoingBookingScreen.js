import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProviders'

const OngoingBookingScreen = () => {

    const authCtx = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text>APPOINTMENT</Text>
        </View>
    )
}

export default OngoingBookingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 18
    }
})