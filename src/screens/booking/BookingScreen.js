import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import DropdownSelect from "../../components/Dropdown";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "../../components/DateTimePickerModal";
import AdaptiveView from "../../components/AdaptiveView";

const BookingScreen = ({ route, navigation }) => {
  const today = new Date().toLocaleDateString("en-ZA");

  const nurse_details = route.params;

  // start and end times dropdown
  const start_times = [
    { label: "9 AM", value: 9 },
    { label: "10 AM", value: 10 },
    { label: "11 AM", value: 11 },
    { label: "12 AM", value: 12 },
    { label: "1 PM", value: 13 },
    { label: "2 PM", value: 14 },
    { label: "3 PM", value: 15 },
    { label: "4 PM", value: 16 },
    { label: "5 PM", value: 17 },
    { label: "6 PM", value: 18 },
    { label: "7 PM", value: 19 },
  ];

  // * start end times
  const [startTimesState, setStartTimeStates] = useState();
  const [working_hours, setWorkingHours] = useState("0");

  // * price
  const [price, setPrice] = useState(0);
  const changePriceOnParams = (hours, days) => {
    setPrice(hours * 500 + days * 1500);
  };

  // * start and end dates
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // * toggle datepicker modal views
  const [openOnStartDate, setOpenOnStartDate] = useState(false);
  const [openOnEndDate, setOpenOnEndDate] = useState(false);
  const [openOnWorkingHours, setOpenOnWorkingHours] = useState(false);

  const handleOnPressStartDate = () => {
    setOpenOnStartDate(!openOnStartDate);
  };

  const handleDateChangeStartDate = (propDate) => {
    setStartDate(propDate);
    const date = Date.parse(propDate.replaceAll("/", "-"));
    const daysDiff =
      (Date.parse(endDate.replaceAll("/", "-")) - date) / (1000 * 60 * 60 * 24);
    changePriceOnParams(working_hours, daysDiff);
  };

  const handleOnPressEndDate = () => {
    setOpenOnEndDate(!openOnEndDate);
  };

  const handleDateChangeEndDate = (propDate) => {
    setEndDate(propDate);
    const date = Date.parse(propDate.replaceAll("/", "-"));
    const daysDiff =
      (date - Date.parse(startDate.replaceAll("/", "-"))) /
      (1000 * 60 * 60 * 24);
    changePriceOnParams(working_hours, daysDiff);
  };

  const handleOnPressWorkingHours = () => {
    setOpenOnWorkingHours(!openOnWorkingHours);
  };

  const handleChangeWorkingHours = (propTime) => {
    setWorkingHours(propTime);
    const daysDiff =
      (Date.parse(endDate.replaceAll("/", "-")) -
        Date.parse(startDate.replaceAll("/", "-"))) /
      (1000 * 60 * 60 * 24);
    changePriceOnParams(parseInt(working_hours), daysDiff);
  };

  const onBookButtonPress = (authCtx) => {
    const working_days =
      (Date.parse(endDate.replaceAll("/", "-")) -
        Date.parse(startDate.replaceAll("/", "-"))) /
      (1000 * 60 * 60 * 24);

    const appointmentBody = {
      booked_by: authCtx.userCache.uid,
      start_date: new Date(startDate.replaceAll("/", "-")),
      end_date: new Date(endDate.replaceAll("/", "-")),
      working_hours: working_hours,
      working_days: working_days,
      working_hours: parseInt(working_hours),
      cost: price,
    };

    console.log(appointmentBody);

    const body = JSON.stringify(appointmentBody);

    fetch(
      `http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/book/${nurse_details.uid}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.userCache.user_access_token}`,
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        alert("Success");
        navigation.navigate("Appointment");
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <AdaptiveView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Book appointment with:</Text>
            <Text style={styles.nurseName}>{nurse_details.fullname}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1 }}>Start Date:</Text>
            <Pressable onPress={handleOnPressStartDate}>
              <View pointerEvents="none">
                <TextInput
                  value={startDate}
                  onChangeText={(value) => {
                    setStartDate(startDate);
                  }}
                />
              </View>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1 }}>End Date:</Text>
            <Pressable onPress={handleOnPressEndDate}>
              <View pointerEvents="none">
                <TextInput value={endDate} />
              </View>
            </Pressable>
          </View>

          <DateTimePickerModal
            type="calendar"
            state={startDate}
            onStateChangeHandler={handleDateChangeStartDate}
            view={openOnStartDate}
            onStateViewHandler={handleOnPressStartDate}
          />
          <DateTimePickerModal
            type="calendar"
            state={endDate}
            onStateChangeHandler={handleDateChangeEndDate}
            view={openOnEndDate}
            onStateViewHandler={handleOnPressEndDate}
          />

          <Text style={styles.divider}>{""}</Text>

          <DropdownSelect
            data={start_times}
            title="Start time"
            label="Starting hour"
            value={startTimesState}
            setValue={setStartTimeStates}
          />

          <Text style={styles.divider}>{""}</Text>

          <DateTimePickerModal
            type="time"
            state={working_hours}
            onStateChangeHandler={handleChangeWorkingHours}
            view={openOnWorkingHours}
            onStateViewHandler={handleOnPressWorkingHours}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1 }}>Working hours:</Text>
            <Pressable onPress={handleOnPressWorkingHours}>
              <View pointerEvents="none">
                <TextInput value={working_hours} />
              </View>
            </Pressable>
          </View>

          <Text style={styles.divider}>{""}</Text>

          <View style={styles.footer}>
            <Text style={styles.price}>
              {price >= 0 ? `Price: ${price} BDT` : "Invalid timeframe"}
            </Text>
            <CustomButton
              title="Book Now"
              width={150}
              onPress={() => onBookButtonPress(authCtx)}
            />
          </View>
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "white"
    },
    header: {
        marginBottom: 30,
    },
    headerText: {
        fontSize: 16,
    },
    nurseName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
    },
})