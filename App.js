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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/dashboard/MainScreen';
import { Icon } from '@rneui/themed';
import PendingBookingList from './src/screens/booking/booker/PendingBookingList';


const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const DashboardTabs = createBottomTabNavigator()


const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName='login'>
      <AuthStack.Screen name='login' component={LogIn} options={{ headerShown: false }} />
      <AuthStack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
      {/* <AuthStack.Screen name='signup' options={{ headerShown: false }} /> */}
    </AuthStack.Navigator>
  )
}



const DashboardTabScreens = () => {
  return (
    <DashboardTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Nurses") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "chats") {
            iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"
          } else if (route.name === "Pending") {
            iconName = focused ? "timer" : "timer-outline"
          }


          return <Icon name={iconName} type='ionicon' color={color} />
        },
        tabBarActiveTintColor: "#46C1E2",
        tabBarInactiveTintColor: 'black'
      })}
    >
      <DashboardTabs.Screen name='Home' component={MainScreen} options={{ headerShown: false }} />
      <DashboardTabs.Screen name='Nurses' component={BookingList} options={{ headerShown: false }} />
      <DashboardTabs.Screen name='Calendar' component={BookingList} options={{ headerShown: false }} />
      <DashboardTabs.Screen name='Pending' component={PendingBookingList} options={{ headerShown: false }} />
      <DashboardTabs.Screen name='chats' component={BookingList} options={{ headerShown: false }} />
    </DashboardTabs.Navigator>
  )
}


const HomeStackScreens = ({ user }) => {
  return (
    <HomeStack.Navigator initialRouteName='dashboard'>
      {/* SADIA OPEN THIS COMMENT AFTER YOURE DONE WITH ACCOUNT SELECTION */}
      {/* <HomeStack.Screen name='account-selection' component={AccountSelection} /> */}
      <HomeStack.Screen name='dashboard' component={DashboardTabScreens} options={{ headerShown: false, }} />
      {/* <HomeStack.Screen name='booking-list' component={BookingList} options={{ headerShown: true, headerTitle: "All nurses" }} /> */}
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


