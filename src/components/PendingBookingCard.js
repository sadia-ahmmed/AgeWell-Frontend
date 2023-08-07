import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PendingBookingCard = () => {
    return (
        <View style={styles.container}>
            <Text>PendingBookingCard</Text>
        </View>
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
    nurse_name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    rating_text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20
    }
})