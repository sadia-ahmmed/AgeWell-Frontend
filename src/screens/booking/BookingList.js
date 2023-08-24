import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Dialog, Input } from '@rneui/themed'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { IP_ADDRESS, IP_PORT } from '../../../configs'
import { auth } from '../../firebase/firebaseConfigs'
import NurseCard from '../../components/NurseCard'
import AdaptiveView from '../../components/AdaptiveView'

const BookingList = (props) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [nurseList, setNurseList] = useState([])
    const [nurseListOnQuery, setNurseListOnQuery] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNurses()
    }, [])


    const fetchNurses = () => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/get-nurses`, {
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
    }


    const dynamicSearch = (query) => {
        setSearchQuery(query)
        query = query.trim()
        if (query === "") {
            fetchNurses()
            return
        }

        const queried_list = nurseList.filter((value) => {
            return value.specialities.includes(query)
        })
        setNurseListOnQuery(queried_list)
    }


    let Screen = () => (
        <AdaptiveView style={styles.page_container}>
            {
                nurseList.length === 0 ? <Text>No nurses found</Text> :
                    (
                        searchQuery === "" ?
                            <FlatList
                                data={nurseList}
                                renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={() => props.navigation.navigate('nurse-highlight', item)}><NurseCard key={index} nurse={item} /></TouchableOpacity>}
                                keyExtractor={(item) => item.uid}
                            />
                            :
                            (
                                nurseListOnQuery.length === 0 ? <Text>No nurses found</Text> :
                                    <FlatList
                                        data={nurseListOnQuery}
                                        renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={() => props.navigation.navigate('nurse-highlight', item)}><NurseCard key={index} nurse={item} /></TouchableOpacity>}
                                        keyExtractor={(item) => item.uid}
                                    />
                            )
                    )
            }
        </AdaptiveView>
    )


    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    loading ? <AdaptiveView style={styles.container_loading}><Dialog.Loading /></AdaptiveView> :
                        <>
                            <Input style={styles.search_bar_style} label="Search" placeholder="ex: Health, Pediatrician" value={searchQuery} onChangeText={dynamicSearch} />
                            <Screen />
                        </>
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
        marginTop: 0,
        // backgroundColor: "white"
    },
    container_loading: {
        backgroundColor: "white",
        paddingTop: 10,
        padding: 30,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    },
    search_bar_style: {
        backgroundColor: "white"
    }
})