import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { Button, Input } from '@rneui/themed'
import { IP_ADDRESS, IP_PORT } from '../../../configs'
import DatePicker from 'react-native-modern-datepicker'
import { Pressable } from 'react-native'
import DropdownSelect from '../../components/Dropdown'

const BookingScreen = ({ route, navigation }) => {
    const today = new Date().toLocaleDateString('en-ZA')

    const nurse_details = route.params

    // start and end times dropdown
    const start_times = [
        { label: "9 AM", value: 0 },
        { label: "10 AM", value: 1 },
        { label: "11 AM", value: 2 },
        { label: "12 AM", value: 3 },
        { label: "1 PM", value: 4 },
        { label: "2 PM", value: 5 },
        { label: "3 PM", value: 6 },
        { label: "4 PM", value: 7 },
        { label: "5 PM", value: 8 },
        { label: "6 PM", value: 9 },
        { label: "7 PM", value: 10 },
    ]

    const end_times = [
        { label: "9 AM", value: 0 },
        { label: "10 AM", value: 1 },
        { label: "11 AM", value: 2 },
        { label: "12 AM", value: 3 },
        { label: "1 PM", value: 4 },
        { label: "2 PM", value: 5 },
        { label: "3 PM", value: 6 },
        { label: "4 PM", value: 7 },
        { label: "5 PM", value: 8 },
        { label: "6 PM", value: 9 },
        { label: "7 PM", value: 10 },
    ]

    // * start end times
    const [startTimesState, setStartTimeStates] = useState()
    const [endTimesState, setEndTimeStates] = useState()

    // * working hours and days
    const [working_hours, setWorkingHours] = useState()
    const [working_days, setWorkingDays] = useState()

    // * start and end dates
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(today)

    // * toggle datepicker modal views 
    const [openOnStartDate, setOpenOnStartDate] = useState(false)
    const [openOnEndDate, setOpenOnEndDate] = useState(false)


    const handleOnPressStartDate = () => {
        setOpenOnStartDate(!openOnStartDate)
    }

    const handleDateChangeStartDate = (propDate) => {
        console.log(propDate)
        setStartDate(propDate)
    }

    const handleOnPressEndDate = () => {
        setOpenOnEndDate(!openOnEndDate)
    }

    const handleDateChangeEndDate = (propDate) => {
        setEndDate(propDate)
    }

    const onBookButtonPress = (authCtx) => {
        working_hours = endTimesState - startTimesState
        working_days = endDate - startDate


        const appointmentBody = {
            booked_by: authCtx.userCache.uid,
            working_hours: working_hours,
            working_days: working_days,
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
                navigation.navigate("main-dashboard")
            })
            .catch(error => {
                alert("Error")
            })
    }


    const DatePickerModal = ({ date, onDateChangeHandler, view, onDateViewHandler }) => {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={view}
            >
                <View style={{ backgroundColor: 'white', }}>
                    <DatePicker
                        mode='calendar'
                        selected={date}
                        onDateChange={onDateChangeHandler}
                    />
                    <Button color="#46C1E2" title="Close" onPress={onDateViewHandler} />
                </View>
            </Modal>
        )
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
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                            <Text style={{ flex: 1 }}>Start Date :</Text>
                            <Pressable onPress={handleOnPressStartDate}>
                                <View pointerEvents="none">
                                    <Input
                                        value={startDate}
                                    />
                                </View>
                            </Pressable>
                        </View>


                        {/* 
                            // TODO: FINISH THE START END DATES AND BOOK LOGIC PROPERLY
                        */}
                        <DatePickerModal date={startDate} onDateHandler={handleDateChangeStartDate} view={openOnStartDate} onDateViewHandler={handleOnPressStartDate} />
                        <DatePickerModal date={endDate} onDateHandler={handleDateChangeEndDate} view={openOnEndDate} onDateViewHandler={handleOnPressEndDate} />

                        <DropdownSelect data={start_times} label="Starting hour" value={startTimesState} setValue={setStartTimeStates} />
                        <DropdownSelect data={end_times} label="Ending hour" value={endTimesState} setValue={setEndTimeStates} />

                        <Button color="#46C1E2" title="Book now" onPress={() => onBookButtonPress(authCtx)} />
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