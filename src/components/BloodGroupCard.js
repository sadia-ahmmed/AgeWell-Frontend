import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BloodGroupCard = ({ text, onPress, focus = false }) => {

    return (
        <View >
            <TouchableOpacity style={focus ? styles.card_focused : styles.card} onPress={onPress}>
                <Text style={{ textAlign: "center" }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BloodGroupCard

const styles = StyleSheet.create({
    card: {
        borderColor: "skyblue",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 50,
        textAlign: "center"
    },
    card_focused: {
        backgroundColor: "#46C1E2",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 50,
        textAlign: "center"
    }
})