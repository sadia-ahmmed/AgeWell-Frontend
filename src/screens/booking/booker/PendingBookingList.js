import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Card, Dialog } from '@rneui/themed'
import { AuthContext } from '../../../providers/AuthProviders'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'
import { useEffect } from 'react'
import { auth } from '../../../firebase/firebaseConfigs'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'


const PendingBookingList = () => {

    const [pendingList, setPendingList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/pending`, {
            method: "GET",
            mode: "cors",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setPendingList(result)
                setLoading(false)
            })
            .catch(error => {
                alert('Error getting pending lists')
            })

    }, [])


    let Screen = () => (
        <View style={styles.container}>
            <FlatList
                data={pendingList}
                renderItem={({ item }) => <TouchableOpacity onPress={() => props.navigation.navigate('nurse-highlight', item)}><Text>Text</Text></TouchableOpacity>}
                keyExtractor={(item) => item._id}
            />
        </View>
    )

    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    loading ? <View><Dialog.Loading /></View> : <Screen />
                )
            }
        </AuthContext.Consumer>
    )
}

export default PendingBookingList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 90,
        padding: 30,
        flex: 1,
    }
})