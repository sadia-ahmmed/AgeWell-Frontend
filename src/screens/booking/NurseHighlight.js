import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { Button, Image } from '@rneui/themed'

const NurseHighlight = ({ route, navigation }) => {

    const nurse_details = route.params

    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.container}>
                        <View style={styles.container_center}>
                            <Image source={require('../../../assets/avatar.png')} style={{ width: 200, height: 200 }} />
                        </View>
                        <Text>{"\n"}</Text>
                        <Text style={styles.name_text}>{nurse_details.fullname}</Text>
                        <Text style={styles.subhead_text}>Biography</Text>
                        <Text style={styles.bio_text}>{nurse_details.biography}</Text>
                        <Button title="Book" onPress={() => navigation.navigate('nurse-booking', nurse_details)} />
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
        padding: 20
    },
    container_center: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name_text: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bio_text: {
        fontSize: 16
    },
    subhead_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    }
})