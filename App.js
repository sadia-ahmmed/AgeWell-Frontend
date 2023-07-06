import { StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from './src/providers/AuthProviders';
import { NavigationContainer } from '@react-navigation/native';
import LogIn from './src/screens/auth/LogIn';
import Dummy from './src/screens/dashboard/Dummy';
import SignUp from './src/screens/auth/SignUp';


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
      <HomeStack.Screen name='dummy' component={Dummy} />
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
