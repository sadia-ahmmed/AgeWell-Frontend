import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProviders'
import { auth } from '../../../firebase/firebaseConfigs'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'

const OngoingBookingScreen = () => {

    const authCtx = useContext(AuthContext)
    const [appointment, setAppointment] = useState()

    useEffect(() => {

        const httpPolling = setInterval(() => {
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
                })
                .catch(err => {
                    alert(err.message)
                })

        }, 3000)

        return () => clearInterval(httpPolling)
    }, [])

    return (
        <View style={styles.container}>
            <Text>Appointment {authCtx.userCache.type === "nurse" ? `for ${appointment.userDetails.fullname}` : `nurse ${appointment.nurseDetails.fullname}`}</Text>
        </View>
    )
}

export default OngoingBookingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 18
    }
})