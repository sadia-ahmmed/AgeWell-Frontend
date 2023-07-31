import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Dialog } from '@rneui/themed'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { IP_ADDRESS, IP_PORT } from '../../../configs'
import { auth } from '../../firebase/firebaseConfigs'
import NurseCard from '../../components/NurseCard'

const BookingList = (props) => {

    const [nurseList, setNurseList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/nurse/get`, {
            method: "GET",
            mode: "cors",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
        })
            .then(res => res.json())
            .then(result => {
                setNurseList(result)
                setLoading(false)
            })
            .catch(error => {
                alert('Error getting nurses')
            })

    }, [])


    let Screen = () => (
        <View style={styles.page_container}>
            <FlatList
                data={nurseList}
                renderItem={({ item }) => <TouchableOpacity onPress={() => props.navigation.navigate('nurse-highlight', item)}><NurseCard nurse={item} /></TouchableOpacity>}
                keyExtractor={(item) => item.uid}
            />
        </View>
    )


    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    loading ? <Dialog.Loading /> : <Screen />
                )
            }
        </AuthContext.Consumer>
    )
}

export default BookingList

const styles = StyleSheet.create({
    page_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 150
    },
})