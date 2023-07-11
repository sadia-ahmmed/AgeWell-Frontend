import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { Button, Input } from '@rneui/themed'
import { IP_ADDRESS, IP_PORT } from '../../../configs'

const BookingScreen = ({ route, navigation }) => {


    const nurse_details = route.params
    let [working_hours, setWorkingHours] = useState()


    const onBookButtonPress = (authCtx) => {
        working_hours = parseInt(working_hours)

        const appointmentBody = {
            booked_by: authCtx.userCache.uid,
            working_hours: working_hours
        }

        const body = JSON.stringify(appointmentBody)

        fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/nurse/book/${nurse_details.uid}`, {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authCtx.userCache.user_access_token}` },
            body: body
        })
            .then(res => res.json())
            .then(result => {
                alert("Success")
                navigation.navigate("dummy")
            })
            .catch(error => {
                alert("Error")
            })
    }


    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.main_container}>
                        <View style={styles.name_container}>
                            <Text style={styles.text_header}>Book appointment with:</Text>
                            <Text style={styles.name_text}>{nurse_details.fullname}</Text>
                        </View>
                        <Input
                            label="Working hours"
                            onChangeText={setWorkingHours}
                        />
                        <Button title="Book appointment" onPress={() => onBookButtonPress(authCtx)} />
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default BookingScreen

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 30
    },
    name_container: {
        marginBottom: 30
    },
    text_header: {
        fontSize: 16,
    },
    name_text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})