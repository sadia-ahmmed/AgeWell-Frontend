import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from './src/providers/AuthProviders';
import { NavigationContainer } from '@react-navigation/native';
import LogIn from './src/screens/auth/LogIn';
import SignUp from './src/screens/auth/SignUp';
import BookingList from './src/screens/booking/BookingList';
import NurseHighlight from './src/screens/booking/NurseHighlight';
import BookingScreen from './src/screens/booking/BookingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/dashboard/MainScreen';
import { Icon } from '@rneui/themed';
import PendingBookingList from './src/screens/booking/booker/PendingBookingList';
import OngoingBookingScreen from './src/screens/booking/booker/OngoingBookingScreen';


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
    <AuthContext.Consumer>
      {
        (authCtx) => (
          <DashboardTabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let iconType;

                if (route.name === "Home") {
                  iconName = "home"
                  iconType = "entypo"
                } else if (route.name === "Nurses") {
                  iconName = focused ? "search" : "search-outline"
                  iconType = "ionicon"
                } else if (route.name === "Calendar") {
                  iconName = focused ? "calendar" : "calendar-outline"
                  iconType = "ionicon"
                } else if (route.name === "chats") {
                  iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"
                  iconType = "ionicon"
                } else if (!authCtx.userCache.ongoingAppointment && route.name === "Pending") {
                  iconName = focused ? "timer" : "timer-outline"
                  iconType = "ionicon"
                } else if (authCtx.userCache.ongoingAppointment && route.name === "Appointment") {
                  iconName = "user-md"
                  iconType = "font-awesome"
                }

                return <Icon name={iconName} type={iconType} color={color} size={25} />
              },
              tabBarActiveTintColor: "#46C1E2",
              tabBarInactiveTintColor: 'grey'
            })}
          >
            <DashboardTabs.Screen name='Home' component={MainScreen} options={{ headerShown: true, title: `Home`, headerTitle: `Welcome ${authCtx.userCache.fullname.split()[0]}`, tabBarItemStyle: { marginBottom: 5 } }} />
            {!authCtx.userCache.ongoingAppointment && <DashboardTabs.Screen name='Nurses' component={BookingList} options={{ headerShown: true, title: 'Search', headerTitle: "Nurse List", tabBarItemStyle: { marginBottom: 5 } }} />}
            <DashboardTabs.Screen name='Calendar' component={BookingList} options={{ headerShown: false, tabBarItemStyle: { marginBottom: 5 } }} />
            {!authCtx.userCache.ongoingAppointment && <DashboardTabs.Screen name='Pending' component={PendingBookingList} options={{ headerShown: true, title: 'Pending', headerTitle: "Pending Appointments", tabBarItemStyle: { marginBottom: 5 } }} />}
            {authCtx.userCache.ongoingAppointment && <DashboardTabs.Screen name='Appointment' component={OngoingBookingScreen} options={{ headerShown: true, title: 'Appointment', headerTitle: "Current Appointment", tabBarItemStyle: { marginBottom: 5 } }} />}
            <DashboardTabs.Screen name='chats' component={BookingList} options={{ headerShown: false, title: "Chats", tabBarItemStyle: { marginBottom: 5 } }} />
          </DashboardTabs.Navigator>
        )
      }
    </AuthContext.Consumer>

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


