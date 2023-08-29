import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";
import { signOut } from "firebase/auth";
import { invokeLogoutService } from "../../services/user/authService";
import { Button, Card } from "@rneui/themed";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { SpeedDial } from "@rneui/themed";
import ActivityTracker from "./ActivityTracker";
import AdaptiveView from "../../components/AdaptiveView";
import { ScrollView } from "react-native-gesture-handler";
import packages from "./packageList";
import HospitalPackageCard from "../../components/HospitalPackageCard";
import Package from "./Package";
import Packages from "./packageList";
import { Pressable } from "react-native";
// import healthData from "./healthData";

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [displayedPackages, setDisplayedPackages] = useState(4);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [healthUserData, setHealthUserData] = useState({})
  const [healthPatientData, setHealthPatientData] = useState({})

  const toggleShowAllPackages = () => {
    setShowAllPackages(true);
  };
  useEffect(() => {
    // const user_access_token = auth.currentUser.stsTokenManager.accessToken;

    const httpPolling = setInterval(() => {
      let user_uid = auth.currentUser.uid;

      if (!user_uid) {
        user_uid = authCtx.userCache.uid;
      }

      fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/get/${user_uid}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result);
          // console.log(result);
          authCtx.setUserCache(result);
          if (result.type === "user") {
            hd = {
              weight: {
                name: "Weight",
                value: result.weight,
                icon: require("../../../assets/scale.png"),
              },
              diabetics: {
                name: "Diabetics",
                value: result.diabetes ? result.diabetes : "No Diabetes",
                icon: require("../../../assets/diabetics.png"),
              },
              bloodPressure: {
                name: "Blood Pressure",
                value: result.blood_pressure,
                icon: require("../../../assets/blood-pressure.png"),
              },
            }
            setHealthUserData(hd)

          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error getting user details");
        });
    }, 5000);


    const fetchAppointmentWeightLogs = setInterval(() => {
      if (authCtx.userCache.ongoingAppointment && authCtx.userCache.type === "nurse") {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken;

        fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/get-appointment/${authCtx.userCache.ongoingAppointmentID}`, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_access_token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            hd = {
              weight: {
                name: "Weight",
                value: data.userDetails.weight,
                icon: require("../../../assets/scale.png"),
              },
              diabetics: {
                name: "Diabetics",
                value: data.userDetails.diabetes ? data.userDetails.diabetes : "No Diabetes",
                icon: require("../../../assets/diabetics.png"),
              },
              bloodPressure: {
                name: "Blood Pressure",
                value: data.userDetails.blood_pressure,
                icon: require("../../../assets/blood-pressure.png"),
              },
            }
            setHealthPatientData(hd)
            console.log(data.userDetails)
          })
          .catch((err) => {
            alert(err.message);
          });

      }
    }, 5000)

    return () => {
      clearInterval(httpPolling)
      if (authCtx.userCache.type === "nurse" && authCtx.userCache.ongoingAppointment) {
        clearInterval(fetchAppointmentWeightLogs)
      }
    };
  }, []);

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <AdaptiveView style={styles.main_container}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Card.Divider />

            {
              authCtx.userCache.type === "user" &&
              <>
                <View style={{ marginTop: 40 }}>
                  <Text style={styles.headText}>Your Health Logs</Text>
                  {/* <Card.Divider /> */}
                </View>
                <View style={styles.healthLogsContainer}>
                  {Object.keys(healthUserData).map((key) => (
                    <View style={styles.miniCard} key={key}>
                      <Image
                        source={healthUserData[key].icon}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardName}>{healthUserData[key].name}</Text>
                      <Text style={styles.cardPoints}>{healthUserData[key].value}</Text>
                    </View>
                  ))}
                </View>
              </>}

            {
              authCtx.userCache.ongoingAppointment && authCtx.userCache.type === "nurse" &&
              <>
                <View style={{ marginTop: 40 }}>
                  <Text style={styles.headText}>Patient Health Logs</Text>
                  {/* <Card.Divider /> */}
                </View>
                <View style={styles.healthLogsContainer}>
                  {Object.keys(healthPatientData).map((key) => (
                    <View style={styles.miniCard} key={key}>
                      <Image
                        source={healthPatientData[key].icon}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardName}>{healthPatientData[key].name}</Text>
                      <Text style={styles.cardPoints}>{healthPatientData[key].value}</Text>
                    </View>
                  ))}
                </View>
              </>
            }

            <ActivityTracker navigation={navigation} />
            {/* <ActivityTracker navigation={navigation} /> */}

            <View style={{ margin: 11, marginTop: 40 }}>
              <Text style={styles.headText}>Explore Health Packages</Text>
              {showAllPackages ? (
                <Pressable
                  style={styles.showMoreButton}
                  onPress={() => navigation.navigate("Package")}
                >
                  <Text style={styles.showMoreText}>Show More Packages</Text>
                </Pressable>
              ) : (
                Packages.slice(0, 4).map((packageData) => (
                  <HospitalPackageCard
                    key={packageData.id}
                    packageData={packageData}
                  />
                ))
              )}
              <Pressable
                style={styles.showMoreButton}
                onPress={() => navigation.navigate("Package")}
              >
                <Text style={styles.showMoreText}>Show More Packages</Text>
              </Pressable>
            </View>
          </ScrollView>
          {authCtx.userCache.type === "user" && (
            <SpeedDial
              color="#46C1E2"
              isOpen={open}
              icon={{ name: "people", color: "#fff" }}
              openIcon={{ name: "close", color: "#fff" }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            >
              {!authCtx.userCache.in_circle && (
                <SpeedDial.Action
                  color="#46C1E2"
                  icon={{ name: "add", color: "#fff" }}
                  title="Create Family Circle"
                  onPress={() => navigation.navigate("create-family-circle")}
                />
              )}
              {!authCtx.userCache.in_circle && (
                <SpeedDial.Action
                  color="#46C1E2"
                  icon={{ name: "person-add", color: "#fff" }}
                  title="Join Family Circle"
                  onPress={() => navigation.navigate("join-family-circle")}
                />
              )}
              {authCtx.userCache.in_circle && (
                <SpeedDial.Action
                  color="#46C1E2"
                  icon={{ name: "create", color: "#fff" }}
                  title="My Circle"
                  onPress={() => navigation.navigate("family-circle-dashboard")}
                />
              )}
            </SpeedDial>
          )}
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  main_container: {
    // paddingTop: 10,
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    marginBottom: -12,
  },

  healthLogsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  miniCard: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 10,
    width: 100,
    alignItems: "flex-start",
  },
  cardInfo: {
    alignItems: "center",
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  cardName: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
  cardPoints: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#439BE8",
    padding: 5,
    marginTop: -20,
    marginBottom: 8,
    marginLeft: -5,
  },
  scrollContainer: {
    marginTop: -30,
  },
  showMoreButton: {
    backgroundColor: "#439BE8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  showMoreText: {
    color: "white",
    fontSize: 16,
  },
});

export default MainScreen;
