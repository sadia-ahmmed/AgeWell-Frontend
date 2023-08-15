import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CustomButton({ title, width, onPress }) {
    return (
        <View>
            <TouchableOpacity style={[styles.btn_style, { width: width }]} onPress={onPress}>
                <Text style={styles.btn_text_style}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn_style: {
        backgroundColor: "#46C1E2",
        // width: 150, 
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },
    btn_text_style: {
        fontSize: 16,
        fontWeight: "bold"
    }
})