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
import Calendar from "./src/screens/booking/calendar/Calendar";
import Onboarding from "./src/screens/onboarding/Onboarding";
import ReviewScreen from "./src/screens/booking/booker/ReviewScreen";
import Package from "./src/screens/dashboard/Package";
import SettingsScreen from "./src/screens/settings/settings";
import HospitalPackageCard from "./src/components/HospitalPackageCard";
import packages, { Packages } from "./src/screens/dashboard/packageList";
import { decode, encode } from 'base-64'
import HealthConcerns from "./src/screens/onboarding/HealthConcerns";
import ActivityList from "./src/screens/ActivityList";
import socket from './src/providers/socket'

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}


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
                iconName = "home";
                iconType = "entypo";
              } else if (route.name === "Nurses") {
                iconName = focused ? "search" : "search-outline";
                iconType = "ionicon";
              } else if (route.name === "Reports") {
                iconName = focused ? "calendar" : "calendar-outline";
                iconType = "ionicon";
              } else if (route.name === "Chats") {
                iconName = focused
                  ? "chatbox-ellipses"
                  : "chatbox-ellipses-outline";
                iconType = "ionicon";
              } else if (route.name === "Settings") {

                iconName = focused ? "settings" : "settings-outline";
                iconType = "ionicon";
              } else if (
                !authCtx.userCache.ongoingAppointment &&
                route.name === "Pending"
              ) {
                iconName = focused ? "timer" : "timer-outline";
                iconType = "ionicon";
              } else if (
                authCtx.userCache.ongoingAppointment &&
                route.name === "Appointment"
              ) {
                iconName = "user-md";
                iconType = "font-awesome";
              } else if (
                !authCtx.userCache.is_verified &&
                route.name === "Verification"
              ) {
                iconName = focused ? "shield-alert" : "shield-alert-outline";
                iconType = "material-community";
              } else if (
                route.name === "Closure"
              ) {
                iconName = focused ? "star" : "star-outline";
                iconType = "ionicon";
              }
              return (
                <Icon name={iconName} type={iconType} color={color} size={25} />
              );
            },
            tabBarActiveTintColor: "#6cc456",
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
              headerTitle: `Welcome ${authCtx.userCache.fullname}`,
              tabBarItemStyle: { marginBottom: 5 },
              headerTitleStyle: {
                fontSize: 18,
                textAlign: "center",
                color: "#6cc456",
              },
            }}
          />

          {/* Main nurse list tab bar */}
          {!authCtx.userCache.ongoingAppointment &&
            authCtx.userCache.type === "user" &&
            authCtx.userCache.ongoingAppointmentStatus !== "pending" && (
              <DashboardTabs.Screen
                name="Nurses"
                component={BookingList}
                options={{
                  headerShown: true,
                  title: "Search",
                  headerTitle: "Search for Caretakers",
                  tabBarItemStyle: { marginBottom: 5 },
                  headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
            )}

          {/* Main calendar tab bar */}
          <DashboardTabs.Screen
            name="Reports"
            component={Calendar}
            options={{
              headerShown: true,
              headerTitle: "Medical Report Library",
              headerTitleStyle: {
                fontSize: 18,
                textAlign: "center",
                color: "#6cc456",
              },

              tabBarItemStyle: { marginBottom: 5 },
            }}
          />

          {/* Main pending bookings list tab bar */}
          {!authCtx.userCache.ongoingAppointment &&
            authCtx.userCache.ongoingAppointmentStatus !== "pending" && (
              <DashboardTabs.Screen
                name="Pending"
                component={PendingBookingList}
                options={{
                  headerShown: true,
                  title: "Pending",
                  headerTitle: "Pending Appointments",
                  tabBarItemStyle: { marginBottom: 5 },
                  headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
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
                headerTitleStyle: {
                  fontSize: 18,
                  textAlign: "center",
                  color: "#6cc456",
                },
              }}
            />
          )}

          {authCtx.userCache.ongoingAppointmentStatus === "pending" && (
            <DashboardTabs.Screen
              name="Closure"
              component={ReviewScreen}
              options={{
                headerShown: true,
                title: "Review & Pay",
                headerTitle: "Review Your Nurse",
                tabBarItemStyle: { marginBottom: 5 },
                headerTitleStyle: {
                  fontSize: 18,
                  textAlign: "center",
                  color: "#6cc456",
                },
              }}
            />
          )}

          {/* Main chats tab bar */}
          {/* {authCtx.userCache.is_verified && (
            <DashboardTabs.Screen
              name="Chats"
              component={HealthConcerns}
              options={{
                headerShown: false,
                title: "Chats",
                tabBarItemStyle: { marginBottom: 5 },
                headerTitleStyle: {
                  fontSize: 18,
                  textAlign: "center",
                  color: "#6cc456",
                },
              }}
            />
          )} */}

          <DashboardTabs.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: true,
              title: "Settings",
              tabBarItemStyle: { marginBottom: 5, },
              headerTitleStyle: {
                fontSize: 18,
                textAlign: "center",
                color: "#6cc456",
              },
            }}
          />


          {/* Main user verification tab bar */}
          {/* {!authCtx.userCache.is_verified && (
            <DashboardTabs.Screen
              name="Verification"
              component={VerificationScreen}
              options={{
                headerShown: true,
                title: "Verify",
                headerTitle: "Verify Your Account",
                tabBarItemStyle: { marginBottom: 5 },
                headerTitleStyle: {
                  fontSize: 18,
                  textAlign: "center",
                  color: "#6cc456",
                },
              }}
            />
          )} */}
        </DashboardTabs.Navigator>
      )}
    </AuthContext.Consumer>
  );
};

const HomeStackScreens = () => {
  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <HomeStack.Navigator initialRouteName="dashboard">
          {authCtx.userCache.onboarding ? (
            <HomeStack.Screen
              name="account-selection"
              component={Onboarding}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <HomeStack.Screen
                name="dashboard"
                component={DashboardTabScreens}
                options={{ headerShown: false }}
              />
              <HomeStack.Screen
                name="nurse-highlight"
                component={NurseHighlight}
                options={{
                  headerTitle: "View nurse", headerShown: true, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
              <HomeStack.Screen
                name="nurse-booking"
                component={BookingScreen}
                options={{
                  headerTitle: "Book nurse", headerShown: true, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
              <HomeStack.Screen
                name="join-family-circle"
                component={JoinFamilyCircle}
                options={{
                  headerTitle: "Join a Circle", headerShown: false, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
              <HomeStack.Screen
                name="create-family-circle"
                component={CreateFamilyCircle}
                options={{
                  headerTitle: "Create a Circle", headerShown: false, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
              <HomeStack.Screen
                name="family-circle-dashboard"
                component={FamilyCircleDashBoard}
                options={{
                  headerTitle: "My Circle", headerShown: true, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
              <HomeStack.Screen
                name="Verification"
                component={VerificationScreen}
                options={{
                  headerShown: true,
                  title: "Verify",
                  headerTitle: "Verify Your Account",
                  tabBarItemStyle: { marginBottom: 5 },
                }}
              />

              <HomeStack.Screen
                name="Package"
                component={Package}
                options={{
                  headerTitle: "Package", headerShown: true, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
              <HomeStack.Screen
                name="HospitalPackageCard"
                component={HospitalPackageCard}
                options={{ headerTitle: "HospitalPackageCard", headerShown: false }}
              />
              <HomeStack.Screen
                name="ActivityList"
                component={ActivityList}
                options={{
                  headerTitle: "All Activities", headerShown: true, headerTitleStyle: {
                    fontSize: 18,
                    textAlign: "center",
                    color: "#6cc456",
                  },
                }}
              />
            </>
          )}
        </HomeStack.Navigator>
      )}
    </AuthContext.Consumer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(authCtx) => (
          <NavigationContainer>
            {authCtx.isLoggedIn ? (
              <HomeStackScreens user={authCtx.userCache} />
            ) : (
              <AuthStackScreens />
            )}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
