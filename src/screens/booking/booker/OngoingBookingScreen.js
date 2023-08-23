import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProviders'
import { auth } from '../../../firebase/firebaseConfigs'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'
import { Button, Dialog, Divider } from '@rneui/themed'
import AdaptiveView from '../../../components/AdaptiveView'
import AdaptiveWebView from '../../../components/AdaptiveWebView'
import { Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'

const OngoingBookingScreen = () => {

    const authCtx = useContext(AuthContext)
    const [appointment, setAppointment] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [paymentLink, setPaymentLink] = useState("-")

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


    const showPaymentWindow = () => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/payment/init`
        const options = {
            mode: "cors",
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user_access_token}`
            }
        }

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                // Linking.openURL(data.url)
                Linking.openURL(data.url)
            })
            .catch(err => {
                alert(err)
            })
    }




    const Loading = () => (
        <AdaptiveView style={[styles.center]}>
            <Dialog.Loading />
        </AdaptiveView>
    )


    const Screen = () => (
        <>
            <Text>Appointment {authCtx.userCache.type === "nurse" ? `for:` : `nurse:`}</Text>
            <Text style={styles.nurse_text}>{authCtx.userCache.type === "nurse" ? `${appointment.userDetails.fullname}` : `${appointment.nurseDetails.fullname}`}</Text>
            <Divider />
            <Text>Time left: {appointment.working_days} days and {appointment.working_hours} hours</Text>
            {/* <Text>Screen under maintenance</Text> */}
            <Button title="Complete Appointment" onPress={showPaymentWindow} />

        </>
    )


    return (
        <AdaptiveView style={styles.container}>
            {isLoading ? <Loading /> : <Screen />}
        </AdaptiveView>
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