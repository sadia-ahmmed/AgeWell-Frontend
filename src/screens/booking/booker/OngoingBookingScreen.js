import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { auth } from "../../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../../configs";
import { Button, Icon, Dialog, Divider, Avatar } from "@rneui/themed";
import AdaptiveView from "../../../components/AdaptiveView";
import { Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { Card, Image, CheckBox } from "@rneui/themed";
import healthData from "../../dashboard/healthData";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import GeoLocation, { getCurrentPosition } from 'react-native-geolocation-service';

const OngoingBookingScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [appointment, setAppointment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentLink, setPaymentLink] = useState("-");

  const currentRegion = {
    latitude: 23.749090,
    longitude: 90.366901,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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

    GeoLocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
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
    <Card style={styles.container}>
      <View style={styles.screencontainer}>
        <Avatar
          title="dp"
          size={70}
          rounded
          marginRight={10}
          source={{ uri: `data:image/jpeg;base64,${authCtx.userCache.type === "nurse" ? appointment.userDetails.avatar : appointment.nurseDetails.avatar}` }}
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
          <Icon name="time-outline" type="ionicon" size={20} color="#6cc456" />
          <Text style={styles.infoText}>
            {appointment.working_days} D & {appointment.working_hours} H
          </Text>
        </View>
        <View style={styles.info2Container}>
          <Icon name="cash-outline" type="ionicon" size={20} color="#6cc456" />
          <Text style={styles.infoText}>
            <Text style={styles.infoText}>{appointment.cost} BDT</Text>
          </Text>
        </View>
      </View>

      {authCtx.userCache.type === "nurse" && (
        <Pressable style={styles.button} onPress={setAppointmentClosure}>
          <Text style={styles.buttonText}>Complete Appointment</Text>
        </Pressable>
      )}

      {authCtx.userCache.type === "user" && (
        <Pressable style={styles.button} onPress={() => Linking.openURL(`tel:${appointment.nurseDetails.phone}`)}>
          <Text style={styles.buttonText}>Phone: {appointment.nurseDetails.phone}</Text>
        </Pressable>
      )}

      {authCtx.userCache.type === "nurse" && (
        <Pressable style={styles.button} onPress={() => Linking.openURL(`tel:${appointment.userDetails.phone}`)}>
          <Text style={styles.buttonText}>Phone: {appointment.userDetails.phone}</Text>
        </Pressable>
      )}
      {/* <HealthConcerns /> */}
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
      >
        <Marker
          coordinate={currentRegion}
          pinColor="green"
        />
      </MapView>
    </Card>
  );

  return (
    <AdaptiveView style={styles.container}>
      {isLoading ? <Loading /> : <Screen />}
    </AdaptiveView>
  );
};

export default OngoingBookingScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '60%',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  screencontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10, // Adjust this as needed
  },
  screen2container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  nameContainer: {
    marginLeft: 10,
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
    backgroundColor: "#6cc456",
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 40,
  },
  info2Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 50,
  },
  infoText: {
    color: "#A9A9A9",
    fontSize: 16,
    marginLeft: 5,
  },
});
