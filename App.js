import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./src/providers/AuthProviders";
import { NavigationContainer } from "@react-navigation/native";
import LogIn from "./src/screens/auth/LogIn";
import SignUp from "./src/screens/auth/SignUp";
import BookingList from "./src/screens/booking/BookingList";
import NurseHighlight from "./src/screens/booking/NurseHighlight";
import BookingScreen from "./src/screens/booking/BookingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./src/screens/dashboard/MainScreen";
import { Icon } from "@rneui/themed";
import PendingBookingList from "./src/screens/booking/booker/PendingBookingList";
import OngoingBookingScreen from "./src/screens/booking/booker/OngoingBookingScreen";
import JoinFamilyCircle from "./src/screens/dashboard/JoinFamilyCircle";
import CreateFamilyCircle from "./src/screens/dashboard/CreateFamilyCircle";
import FamilyCircleDashBoard from "./src/screens/dashboard/FamilyCircleDashBoard";
import VerificationScreen from "./src/screens/booking/verification/VerificationScreen";
import { auth } from "./src/firebase/firebaseConfigs";
import Calendar from "./src/screens/booking/calendar/Calendar";

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const DashboardTabs = createBottomTabNavigator();

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="login">
      <AuthStack.Screen
        name="login"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="signup"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const DashboardTabScreens = () => {
  return (
    <AuthContext.Consumer>
      {(authCtx) => (
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
              } else if (route.name === "Chats") {
                iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"
                iconType = "ionicon"
              } else if (!authCtx.userCache.ongoingAppointment && route.name === "Pending") {
                iconName = focused ? "timer" : "timer-outline"
                iconType = "ionicon"
              } else if (authCtx.userCache.ongoingAppointment && route.name === "Appointment") {
                iconName = "user-md"
                iconType = "font-awesome"
              } else if (!authCtx.userCache.is_verified && route.name === "Verification") {
                iconName = focused ? "shield-alert" : "shield-alert-outline"
                iconType = "material-community"
              }
              return (
                <Icon name={iconName} type={iconType} color={color} size={25} />
              );
            },
            tabBarActiveTintColor: "#46C1E2",
            tabBarInactiveTintColor: "grey",
          })}
        >

          {/* Main screen tab bar */}
          <DashboardTabs.Screen
            name="Home"
            component={MainScreen}
            options={{
              headerShown: true,
              title: `Home`,
              headerTitle: `Welcome ${authCtx.userCache.fullname.split()[0]}`,
              tabBarItemStyle: { marginBottom: 5 },
            }}
          />

          {/* Main nurse list tab bar */}
          {!authCtx.userCache.ongoingAppointment && (
            <DashboardTabs.Screen
              name="Nurses"
              component={BookingList}
              options={{
                headerShown: true,
                title: "Search",
                headerTitle: "Nurse List",
                tabBarItemStyle: { marginBottom: 5 },
              }}
            />
          )}

          {/* Main calendar tab bar */}
          <DashboardTabs.Screen
            name="Calendar"
            component={Calendar}
            options={{
              headerShown: false,
              tabBarItemStyle: { marginBottom: 5 },
            }}
          />

          {/* Main pending bookings list tab bar */}
          {!authCtx.userCache.ongoingAppointment && (
            <DashboardTabs.Screen
              name="Pending"
              component={PendingBookingList}
              options={{
                headerShown: true,
                title: "Pending",
                headerTitle: "Pending Appointments",
                tabBarItemStyle: { marginBottom: 5 },
              }}
            />
          )}

          {/* Main ongoing appointment tab bar */}
          {authCtx.userCache.ongoingAppointment && (
            <DashboardTabs.Screen
              name="Appointment"
              component={OngoingBookingScreen}
              options={{
                headerShown: true,
                title: "Appointment",
                headerTitle: "Current Appointment",
                tabBarItemStyle: { marginBottom: 5 },
              }}
            />
          )}

          {/* Main chats tab bar */}
          {authCtx.userCache.is_verified && (
            <DashboardTabs.Screen
              name="Chats"
              component={BookingList}
              options={{
                headerShown: false,
                title: "Chats",
                tabBarItemStyle: { marginBottom: 5 },
              }}
            />
          )}

          {/* Main user verification tab bar */}
          {!authCtx.userCache.is_verified && (
            <DashboardTabs.Screen
              name="Verification"
              component={VerificationScreen}
              options={{
                headerShown: false,
                title: "Verify",
                tabBarItemStyle: { marginBottom: 5 },
              }}
            />
          )

          }

        </DashboardTabs.Navigator>
      )}
    </AuthContext.Consumer>
  );
};

const HomeStackScreens = ({ user }) => {
  return (
    <HomeStack.Navigator initialRouteName="dashboard">
      {/* SADIA OPEN THIS COMMENT AFTER YOURE DONE WITH ACCOUNT SELECTION */}
      {/* <HomeStack.Screen name='account-selection' component={AccountSelection} /> */}
      <HomeStack.Screen
        name="dashboard"
        component={DashboardTabScreens}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="nurse-highlight"
        component={NurseHighlight}
        options={{ headerTitle: "View nurse", headerShown: true }}
      />
      <HomeStack.Screen
        name="nurse-booking"
        component={BookingScreen}
        options={{ headerTitle: "Book nurse", headerShown: true }}
      />
      <HomeStack.Screen
        name="join-family-circle"
        component={JoinFamilyCircle}
        options={{ headerTitle: "Join family circle", headerShown: true }}
      />
      <HomeStack.Screen
        name="create-family-circle"
        component={CreateFamilyCircle}
        options={{ headerTitle: "Create family circle", headerShown: true }}
      />
      <HomeStack.Screen
        name="family-circle-dashboard"
        component={FamilyCircleDashBoard}
        options={{ headerTitle: "Family circle dashboard", headerShown: true }}
      />
    </HomeStack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(authCtx) => (
          <NavigationContainer>
            {authCtx.isLoggedIn ? <HomeStackScreens user={authCtx.userCache} /> : <AuthStackScreens />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
