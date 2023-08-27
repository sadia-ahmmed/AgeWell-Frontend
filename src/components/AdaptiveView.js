import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AdaptiveView = (props) => {


    return (
        <>
            {
                Platform.OS === "ios" || Platform.OS === "macos" ?
                    <SafeAreaView style={props.style}>
                        {props.children}
                    </SafeAreaView>
                    :
                    <View style={props.style}>
                        {props.children}
                    </View>
            }
        </>
    )
}

export default AdaptiveView

const styles = StyleSheet.create({})