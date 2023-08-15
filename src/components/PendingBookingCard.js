import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProviders'
import { Button, Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IP_ADDRESS, IP_PORT } from '../../configs'
import { auth } from '../firebase/firebaseConfigs'

const PendingBookingCard = ({ appointment, target_user }) => {

    const authCtx = useContext(AuthContext)


    const setAppointmentStatus = (status) => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const body = {
            status
        }

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/booking-status/${appointment._id}`
        const options = {
            mode: "cors",
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
            body: JSON.stringify(body)
        }

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                alert(data.message)
            })
            .catch(err => {
                alert(err.message)
            })
    }


    const UserButtonGroup = () => (
        <Button type='outline' onPress={() => alert("User appointment")} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
            <Icon name='check' type='font-awesome' />
        </Button>
        // <CustomButton title="Cancel Appointment" width={150} onPress={() => alert("User appointment")} />
    )

    const NurseButtonGroup = () => (
        <View style={{ flexDirection: "row", marginLeft: 45, justifyContent: "center", alignContent: "center" }}>
            <TouchableOpacity style={{ marginRight: 2 }} onPress={() => setAppointmentStatus("approved")} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                <Icon size={17} name='check' type='font-awesome' color="green" raised />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAppointmentStatus("rejected")} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                <Icon size={17} name='cross' type='entypo' color="red" raised />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={[styles.container, styles.shadowProp]}>
            {/* // TODO: COMPLETE NURSE PENDING LIST */}
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => alert("user infor")} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} >
                    <Text>{target_user.fullname}</Text>
                    <Text style={{ color: "grey", fontSize: 12 }}>{appointment.working_days} days, {appointment.working_hours} hours</Text>
                </TouchableOpacity>
                {authCtx.userCache.type === "user" ? <UserButtonGroup /> : <NurseButtonGroup />}
            </View>
        </View>
    )
}

export default PendingBookingCard

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 12,
        marginLeft: 5,
        marginRight: 5,
    },
    appointment_title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    rating_text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    },
})