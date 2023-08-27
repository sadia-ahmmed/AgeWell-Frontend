import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AdaptiveView from '../../../components/AdaptiveView'
import { AuthContext } from '../../../providers/AuthProviders'
import { Button, Rating } from '@rneui/themed'
import { auth } from '../../../firebase/firebaseConfigs'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'
import { TouchableOpacity } from 'react-native'
import { Linking } from 'react-native'

const ReviewScreen = () => {

    const [payState, setPayState] = useState(false)
    const [behavior, setBehavior] = useState(0)
    const [skilled, setSkilled] = useState(0)
    const [timely, setTimely] = useState(0)
    const [rating, setRating] = useState(0)
    const authCtx = useContext(AuthContext)

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

        console.log(url)

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Linking.openURL(data.url)
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }


    const submitReview = () => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const body = {
            behavior, timely, skilled, rating
        }

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/review/give/${authCtx.userCache.ongoingAppointmentID}`
        const options = {
            mode: "cors",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user_access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                alert("You have completed your review!")
                setPayState(true)
            })
            .catch(err => {
                alert(err)
            })
    }



    const Screen = () => (
        <>
            {
                payState ?
                    <Button title="Complete Payment" onPress={showPaymentWindow} />
                    :
                    <>
                        <View style={[styles.choice_area, { flexDirection: "row" }]}>
                            <Text>Was the behavior satisfactory?</Text>
                            <View style={{ flexDirection: "row", marginLeft: 45 }}>
                                <TouchableOpacity onPress={() => setBehavior(1)} style={[styles.choice_box_area, { marginRight: 10 }, behavior === 1 && { backgroundColor: "skyblue" }]}>
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setBehavior(0)} style={[styles.choice_box_area, behavior === 0 && { backgroundColor: "skyblue" }]}>
                                    <Text>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.choice_area, { flexDirection: "row" }]}>
                            <Text>Did the nurse do everything timely?</Text>
                            <View style={{ flexDirection: "row", marginLeft: 15 }}>
                                <TouchableOpacity onPress={() => setTimely(1)} style={[styles.choice_box_area, { marginRight: 10 }, timely === 1 && { backgroundColor: "skyblue" }]}>
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setTimely(0)} style={[styles.choice_box_area, timely === 0 && { backgroundColor: "skyblue" }]}>
                                    <Text>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.choice_area, { flexDirection: "row" }]}>
                            <Text>Was the nurse appropriately skilled?</Text>
                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => setSkilled(1)} style={[styles.choice_box_area, { marginRight: 8 }, skilled === 1 && { backgroundColor: "skyblue" }]}>
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSkilled(0)} style={[styles.choice_box_area, skilled === 0 && { backgroundColor: "skyblue" }]}>
                                    <Text>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.choice_area]}>
                            <Text>Rate your nurse out of 5</Text>
                            <Rating
                                type='star'
                                showRating
                                fractions={1}
                                startingValue={3}
                                onFinishRating={setRating}
                                readonly
                            />
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Button
                                title="Done"
                                onPress={submitReview}
                            />
                        </View>
                    </>
            }
        </>
    )

    return (
        <AdaptiveView style={styles.container}>
            {
                authCtx.userCache.type === "nurse" ?
                    <Text style={{}}>Waiting for user to finish paying.</Text> : <Screen />
            }
        </AdaptiveView>
    )
}

export default ReviewScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 17,
        flex: 1
    },
    choice_area: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: 15
    },
    choice_box_area: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "skyblue",
        borderRadius: 4,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 3,
        fontWeight: "bold"
    },
})