import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, Divider, Image } from '@rneui/themed'

const NurseCard = ({ nurse }) => {
    return (
        <View style={styles.image_container}>
            <Image style={styles.image} source={require('../../assets/avatar.png')} />
            <Text>{"\n"}</Text>
            <Text style={{ fontWeight: 'bold' }}>{nurse.fullname}</Text>
            <Text>Rating: {nurse.rating}/5</Text>
        </View>
    )
}

export default NurseCard

const styles = StyleSheet.create({
    image_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 10,
        shadowOffset: {
            width: 100,
            height: 0,
        }
    },
    image: {
        width: 100,
        height: 100
    }
})