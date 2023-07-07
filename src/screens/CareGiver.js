// I want to create e new screen called CareGiver.js
// in the screens folder and import it here in App.js

// what i want is to have a icon in the top left corner of the screen of the person who is logged in as a caregiver
// beside the icon i want show his name 

// i want to have a button in the top right corner of the screen that will allow the caregiver to log out of the app 
// when the caregiver clicks the button i want to show a side bar that will have the following options:
// 1. Profile
// 2. Settings
// 3. Log Out

// below this i want to show the statistics of the caregiver where it will show the following:
// 1. Number of patients that the caregiver is not taking care of anymore
// 2. Rating of the caregiver
// 3. Ponits of the caregiver

// below this i want to show the list i want a show the requests that the caregiver has received from the patients
// headline will be "Incoming Requests"
// below this i want to show the list of patients that are requesting the caregiver to take care of them
// i want to show the following information in a card for each patient:
// 1. image of the patient
// 2. name of the patient
// 3. age of the patient
// 4. Time and date
// 5. and a button that will allow the caregiver to accept or reject the request

// below this i want to show the list of upcoming tasks that the caregiver has with the patients
// headline will be "Upcoming Tasks"
// Beside the headline there will be a button that will allow the caregiver to add a new task
// below this i want to show the list of tasks that the caregiver has with the patients
// Example of a task:
// 'after lunch glucose check' -- 'a circle if the circle is clicked then it means task is done' -- the time when the task is completed by clicking the circle

// lets start the code for this screen

// note: complete the tasks in react native and use components from react native

// note: use the following link to learn how to use react native components
// https://reactnative.dev/docs/components-and-apis

// note: use the following link to learn how to use react native navigation
// https://reactnavigation.org/docs/getting-started

// note: use the following link to learn how to use react native icons
// https://icons.expo.fyi/

// lets start the code for this screen

import React from 'react'
import { View, Text } from 'react-native'

const CareGiver = (props) => {
    return (
        <View>
            <Text>CareGiver</Text>
        </View>
    )
}

export default CareGiver