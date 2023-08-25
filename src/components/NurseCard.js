import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, Divider, Icon, Image } from '@rneui/themed'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider'
import { prettyPrintNurseRatings, prettyPrintNurseSpecialities } from '../services/ui/uiService'

const NurseCard = ({ nurse }) => {
    return (
        <View style={styles.image_container}>
            {!nurse.avatar && <Image style={styles.image} source={require('../../assets/avatar.png')} />}
            {nurse.avatar && <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${nurse.avatar}` }} />}
            <Text>{"\n"}</Text>
            <Text style={styles.nurse_name}>{nurse.fullname}</Text>
            <CardDivider />
            <Text>Specializes in {prettyPrintNurseSpecialities(nurse)}</Text>
            <CardDivider />
            <Text>{prettyPrintNurseRatings(nurse)}</Text>
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
        padding: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 100,
            height: 0,
        },
        margin: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 300,
        borderWidth: 1,
        borderColor: "skyblue"
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