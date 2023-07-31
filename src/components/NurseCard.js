import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, Divider, Icon, Image } from '@rneui/themed'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider'
import { prettyPrintNurseRatings, prettyPrintNurseSpecialities } from '../services/ui/uiService'

const NurseCard = ({ nurse }) => {



    // const prettyPrintNurseSpecialities = () => {
    //     return nurse.specialities.map((item, i) => `${item}${i == nurse.specialities.length - 1 ? '' : ', '}`)
    // }

    // const prettyPrintNurseRatings = () => {
    //     const ints = Math.floor(nurse.rating)
    //     const decs = nurse.rating % 1
    //     const stars = []

    //     for (let i = 0; i < ints; ++i) {
    //         stars.push(<Icon name='star' type='font-awesome' color='gold' />)
    //     }

    //     if (decs > 0.00) {
    //         stars.push(<Icon name='star-half' type='font-awesome' color='gold' />)
    //     }

    //     return stars
    // }


    return (
        <View style={styles.image_container}>
            <Image style={styles.image} source={require('../../assets/avatar.png')} />
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
        }
    },
    image: {
        width: 100,
        height: 100
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