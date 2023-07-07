import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage_MedicineTracker from './screens/homepage/HomePage_MedicineTracker';
const Stack = createStackNavigator();

const AppNavigator = (props) => {
    return (

        <Stack.Navigator>
            <Stack.Screen name='Your Medicine Reminder' component={HomePage_MedicineTracker} options={{ headerShown: false }} />
            {/* <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} /> */}
        </Stack.Navigator>



    );
}

export default AppNavigator;