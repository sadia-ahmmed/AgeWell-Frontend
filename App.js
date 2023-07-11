import { StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from './src/providers/AuthProviders';
import { NavigationContainer } from '@react-navigation/native';
import LogIn from './src/screens/auth/LogIn';
import Dummy from './src/screens/dashboard/Dummy';
import SignUp from './src/screens/auth/SignUp';
import BookingList from './src/screens/booking/BookingList';
import NurseHighlight from './src/screens/booking/NurseHighlight';
import BookingScreen from './src/screens/booking/BookingScreen';


const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()


const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName='login'>
      <AuthStack.Screen name='login' component={LogIn} options={{ headerShown: false }} />
      <AuthStack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
      {/* <AuthStack.Screen name='signup' options={{ headerShown: false }} /> */}
    </AuthStack.Navigator>
  )
}


const HomeStackScreens = ({ user }) => {
  return (
    <HomeStack.Navigator>
      {/* SADIA OPEN THIS COMMENT AFTER YOURE DONE WITH ACCOUNT SELECTION */}
      {/* <HomeStack.Screen name='account-selection' component={AccountSelection} /> */}
      <HomeStack.Screen name='dummy' component={Dummy} options={{ headerShown: true, headerTitle: `Welcome!` }} />
      <HomeStack.Screen name='booking-list' component={BookingList} options={{ headerShown: true, headerTitle: "All nurses" }} />
      <HomeStack.Screen name='nurse-highlight' component={NurseHighlight} options={{ headerTitle: "View nurse", headerShown: true }} />
      <HomeStack.Screen name='nurse-booking' component={BookingScreen} options={{ headerTitle: "Book nurse", headerShown: true }} />
    </HomeStack.Navigator>
  )
}


export default function App() {

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(
          (authCtx) => (
            <NavigationContainer>
              {authCtx.isLoggedIn ? <HomeStackScreens user={authCtx.userCache} /> : <AuthStackScreens />}
            </NavigationContainer>
          )
        )}
      </AuthContext.Consumer>
    </AuthProvider>
    // <LogIn />
  );
}


