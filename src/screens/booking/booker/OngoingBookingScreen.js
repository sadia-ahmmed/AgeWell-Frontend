import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProviders'
import { auth } from '../../../firebase/firebaseConfigs'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'
import { Button, Dialog, Divider } from '@rneui/themed'

const OngoingBookingScreen = () => {

    const authCtx = useContext(AuthContext)
    const [appointment, setAppointment] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/get-appointment/${authCtx.userCache.ongoingAppointmentID}`
        const options = {
            mode: "cors",
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` }
        }

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setAppointment(data)
                setIsLoading(false)
            })
            .catch(err => {
                alert(err.message)
            })
    }, [])



    const Loading = () => (
        <View style={[styles.center]}>
            <Dialog.Loading />
        </View>
    )


    const Screen = () => (
        <>
            <Text>Appointment {authCtx.userCache.type === "nurse" ? `for:` : `nurse:`}</Text>
            <Text style={styles.nurse_text}>{authCtx.userCache.type === "nurse" ? `${appointment.userDetails.fullname}` : `${appointment.nurseDetails.fullname}`}</Text>
            <Divider />
            <Text>Time left: {appointment.working_days} days and {appointment.working_hours} hours</Text>
            <Text>Screen under maintenance</Text>
            <Button title="Upload a report" onPress={() => console.log("Upload report under maintenance")} />
        </>
    )


    return (
        <View style={styles.container}>
            {isLoading ? <Loading /> : <Screen />}
        </View>
    )
}

export default OngoingBookingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        marginTop: 0
    },
    center: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    nurse_text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})