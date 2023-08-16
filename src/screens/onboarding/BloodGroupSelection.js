import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BloodGroupSelection = () => {
    return (
        <View>
            <Text>BloodGroupSelection</Text>
        </View>
    )
}

export default BloodGroupSelection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    choice_box_area: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "skyblue",
        borderRadius: 20,
        padding: 15,
        margin: 10,
        fontWeight: "bold"
    },
    title_text: {
        fontWeight: "900",
        marginBottom: 40,
        fontSize: 24,
        color: "skyblue"
    }
})