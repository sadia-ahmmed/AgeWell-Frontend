import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../providers/AuthProviders'

const PendingBookingCard = () => {

    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.container}>
                        {/* // TODO: COMPLETE NURSE PENDING LIST */}
                        <Text></Text>
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default PendingBookingCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 100,
            height: 0,
        }
    },
    appointment_title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    rating_text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20
    }
})