import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Card, Dialog } from '@rneui/themed'
import { AuthContext } from '../../../providers/AuthProviders'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'
import { useEffect } from 'react'
import { auth } from '../../../firebase/firebaseConfigs'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useContext } from 'react'
import PendingBookingCard from '../../../components/PendingBookingCard'
import AdaptiveView from '../../../components/AdaptiveView'


const PendingBookingList = () => {

    const authCtx = useContext(AuthContext)
    const [pendingList, setPendingList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const httpPolling = setInterval(() => {

            const type = authCtx.userCache.type

            fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/pending/${type}`, {
                method: "GET",
                mode: "cors",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
            })
                .then(res => res.json())
                .then(result => {
                    setPendingList(result)
                    setLoading(false)
                })
                .catch(error => {
                    alert('Error getting pending lists')
                })
        }, 5000)

        return () => clearInterval(httpPolling)

    }, [])


    let Screen = () => (
        <AdaptiveView style={styles.container}>
            {
                pendingList.length > 0 ?
                    <FlatList
                        data={pendingList}
                        renderItem={({ item, index }) =>
                            <PendingBookingCard appointment={item.appointment_details} target_user={item.responseUser} key={index} />
                        }
                        keyExtractor={(item) => item.appointment_details._id}
                    /> : <Text>No pending appointments</Text>
            }

        </AdaptiveView>
    )

    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    loading ? <AdaptiveView style={styles.container_loading}><Dialog.Loading /></AdaptiveView> : <Screen />
                )
            }
        </AuthContext.Consumer>
    )
}

export default PendingBookingList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 10,
        padding: 30,
        flex: 1,
    },
    container_loading: {
        backgroundColor: "white",
        paddingTop: 10,
        padding: 30,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    }
})