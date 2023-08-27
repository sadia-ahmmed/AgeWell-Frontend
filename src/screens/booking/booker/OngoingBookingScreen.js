import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { auth } from "../../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../../configs";
import { Button,Icon, Dialog, Divider, Avatar } from "@rneui/themed";
import AdaptiveView from "../../../components/AdaptiveView";
import { Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";

const OngoingBookingScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [appointment, setAppointment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentLink, setPaymentLink] = useState("-");

  useEffect(() => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken;

    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/get-appointment/${authCtx.userCache.ongoingAppointmentID}`;
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_access_token}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const setAppointmentClosure = () => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken;

    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/set-closure/${appointment._id}`;
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        Authorization: `Bearer ${user_access_token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        navigation.navigate("Appointment");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const Loading = () => (
    <AdaptiveView style={[styles.center]}>
      <Dialog.Loading />
    </AdaptiveView>
  );

  const Screen = () => (
    <>
      <View>
    <View style={styles.screencontainer}>
      <Avatar
        title="dp"
        size={54}
        rounded
        source={require("../../../images/queen.png")}
        // change the image uri i am giving a dummy avatar
        containerStyle={{ backgroundColor: "#6733b9" }}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.nurse_text}>
          {authCtx.userCache.type === "nurse"
            ? `${appointment.userDetails.fullname}`
            : `${appointment.nurseDetails.fullname}`}
        </Text>
      </View>
    </View>
    <View style={styles.screen2container}>
    <View style={styles.infoContainer}>
      <Icon name="time-outline" type='ionicon' size={20} color="#00bfff"  />
      <Text style={styles.infoText}>
        {appointment.working_days} D & {appointment.working_hours} H
      </Text>
    </View>
    <View style={styles.info2Container}>
      <Icon name="cash-outline" type='ionicon' size={20} color="#00bfff" />
      <Text style={styles.infoText}>
      <Text style={styles.infoText}>{appointment.cost} BDT</Text>
      </Text>
    </View>
    </View>
   
    {authCtx.userCache.type === "nurse" && (
      <Pressable style= {styles.button}   onPress={setAppointmentClosure} >
        <Text style={styles.buttonText}>  Complete Appointment</Text>
        </Pressable>
    )}
  </View>
    </>
  );

  return (
    <AdaptiveView style={styles.container}>
      {isLoading ? <Loading /> : <Screen />}
    </AdaptiveView>
  );
};

export default OngoingBookingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    padding:-25,
    borderRadius: 20,
    shadowOffset: {
      width: 100,
      height: 0,
    },
    margin: 20,
    shadowColor: "lightgrey",
    shadowOffset: {
      width: 0.1,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  screencontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:-50,
    marginBottom: 5, // Adjust this as needed
  },
  screen2container: {
    flexDirection: "row",
    alignItems: "center",
    //marginLeft:-50,
    marginBottom: 5, // Adjust this as needed
  },
  nameContainer: {
    marginLeft: 15, // Adjust this as needed to create spacing between avatar and name
  },
  center: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  nurse_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
     paddingVertical: 12,
     paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#439BE8",
    // marginLeft: 110,
    // marginRight: 110,
   
    marginTop:15,
    marginBottom:10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
   
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop:15, 
    marginLeft:-40,
  },
  info2Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop:15, 
    marginLeft:50,
  },
  infoText: {
    marginLeft: 5,
    fontSize:15,
    color:"#A9A9A9"
  },
});
