import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OnboardingClosureScreen = ({ setProgress, setStep, progressLength }) => {
    return (
        <View >
            <Text style={{ textAlign: "center", fontSize: 24 }}>You're all set!</Text>
            <Text style={{ textAlign: "center" }}>Please wait while we redirect you to our app!</Text>
        </View>
    )
}

export default OnboardingClosureScreen

const styles = StyleSheet.create({})