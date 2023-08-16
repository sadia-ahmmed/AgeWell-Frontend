import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AccountSelection from './AccountSelection'
import GenderSelection from './GenderSelection'

const Onboarding = () => {
    const steps = [AccountSelection, GenderSelection]


    return (
        <View>
            <Text>Onboarding</Text>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({})