import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage_MedicineTracker from './screens/homepage/HomePage_MedicineTracker';
import CreateRecord_medicineTracker from './screens/add_medicine/CreateRecord_medicineTracker';
import ViewCompletedTask_medicineTracker from './screens/completedTask/ViewCompletedTask_medicineTracker'
const Stack = createStackNavigator();

const AppNavigator = (props) => {
    return (

        <Stack.Navigator>
            <Stack.Screen name='homePage' component={HomePage_MedicineTracker} options={{ headerShown: false }} />
            <Stack.Screen name='Add a new medicine'
            options={{ title: 'Add a New Medicine',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#439be8',
            //   justifyContent: 'center',
            //   alignContent: 'center',

           } }}
            component={CreateRecord_medicineTracker} />
            <Stack.Screen name='View All Completed Tasks' options={{ title: 'Completed Tasks',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#439be8',
            //   justifyContent: 'center',
            //   alignContent: 'center',

           } }}
           
           component={ViewCompletedTask_medicineTracker} />
            {/* <Stack.Screen name='Home' component={HomePage_MedicineTracker} options={{ headerShown: false }} /> */}
        </Stack.Navigator>



    );
}

export default AppNavigator;