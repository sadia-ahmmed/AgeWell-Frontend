import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { Button, Image } from '@rneui/themed'
import { prettyPrintNurseRatings, prettyPrintNurseSpecialities } from '../../services/ui/uiService'

const NurseHighlight = ({ route, navigation }) => {

    const nurse_details = route.params

    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.container}>
                        <View style={styles.container_center}>
                            <Image source={require('../../../assets/avatar.png')} style={{ width: 150, height: 150 }} />
                        </View>
                        <Text>{"\n"}</Text>
                        <Text style={styles.name_text}>{nurse_details.fullname}</Text>
                        <Text>{prettyPrintNurseRatings(nurse_details)}</Text>
                        <Text style={styles.specialities}>Specialities: {prettyPrintNurseSpecialities(nurse_details)}</Text>
                        <Text style={styles.subhead_text}>Biography</Text>
                        <Text style={styles.bio_text}>{nurse_details.biography}</Text>
                        <View style={styles.submit_btn}>
                            <Button color="#46C1E2" title="Book an Appointment" onPress={() => navigation.navigate('nurse-booking', nurse_details)} />
                        </View>
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default NurseHighlight

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 30
    },
    container_center: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name_text: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10
    },
    bio_text: {
        fontSize: 12
    },
    specialities: {
        fontWeight: 'bold',
        marginTop: 10
    },
    subhead_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20
    },
    submit_btn: {
        position: 'absolute',
        bottom: 50,
        left: 90,
    }
})