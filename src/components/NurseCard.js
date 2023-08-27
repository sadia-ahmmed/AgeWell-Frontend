import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, Divider, Icon, Image } from '@rneui/themed'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider'
import { prettyPrintNurseRatings, prettyPrintNurseSpecialities } from '../services/ui/uiService'
import { BorderOutlined } from '@ant-design/icons'

const NurseCard = ({ nurse }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {!nurse.avatar && <Image style={styles.image} source={require('../../assets/avatar.png')} />}
                {nurse.avatar && <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${nurse.avatar}` }} />}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nurseName}>{nurse.fullname}</Text>
                <Text style={styles.specialization}>Specialization: {prettyPrintNurseSpecialities(nurse)}</Text>
                <Text style={styles.ratings}>{prettyPrintNurseRatings(nurse)}</Text>
            </View>
        </View>
    )
}

export default NurseCard

const styles = StyleSheet.create({
    // image_container: {
    //     //alignItems: 'center',
    //     justifyContent: 'center',
    //     flex: 1,
    //     textAlign: 'center',
    //     backgroundColor: 'white',
    //     padding: 20,
    //     borderRadius: 10,
    //     shadowOffset: {
    //         width: 100,
    //         height: 0,
    //     },
    //     margin: 20,
    //     //flexDirection: 'row'
      
    // },
    // image: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 20,
    //     borderWidth: 1,
    //     borderColor: "skyblue",
     
       
    // },
    // nurse_name: {
    //     fontWeight: 'bold',
    //     fontSize: 20, 
    //     paddingBottom:8,
    // },
    // rating_text: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     fontSize: 20
    // }
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 100,
            height: 0,
        },
        margin: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0.1,
            height: 0.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,  // For Android
    },
    imageContainer: {
        marginRight: 20,
        
    },
    image: {
        width: 100,
        height: 120,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "skyblue",
        marginLeft: 0, 
    },
    infoContainer: {
        flex: 1,
    },
    nurseName: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 8,
        marginTop:-5,
        color: "#439BE8",

    },
    specialization: {
        fontSize: 14,
        color: "grey",
        marginBottom: 8,
    },
    ratings: {
        
        fontSize: 12,
        marginTop: 10, 
        
    },
})