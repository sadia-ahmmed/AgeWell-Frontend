import AppNavigator from './app/AppNavigator';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
   
  );
}