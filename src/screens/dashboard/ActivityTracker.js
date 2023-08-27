import React, { useState, useEffect } from "react";
//import { Swipeable } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Card, Image, Button, CheckBox } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import Ionicons from "react-native-ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import AdaptiveView from "../../components/AdaptiveView";
import { Pressable } from "react-native";

const ActivityTracker = ({ navigation }) => {
  const [caregiver, setCaregiver] = useState(null);
  const [activities, setActivities] = useState([]);
  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newActivityInput, setNewActivityInput] = useState("");
  const [activityTimes, setActivityTimes] = useState(
    new Array(activities.length).fill(null)
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchCaregiver = async () => {
    return {
      caregiverName: "John Doe",
      caregiverType: "Medical Caregiver",
      loggedInTime: "18/08/2023, 10:00 AM",
      rating: 5,
      imageURL: require("../../../assets/favicon.png"),
    };
  };

  const addNewActivity = () => {
    if (newActivityInput.trim() !== "") {
      const newActivity = {
        id: activities.length + 1,
        label: newActivityInput,
        checked: false,
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setNewActivityInput("");
    }
  };

  useEffect(() => {
    fetchCaregiver().then((caregiver) => {
      setCaregiver(caregiver);
    });

    // Initialize activities
    const initialActivities = [
      { id: 1, label: "After Lunch Glucose check", checked: false },
      { id: 2, label: "After Lunch Blood Pressure check", checked: false },
      { id: 3, label: "After Lunch Therapy", checked: false },
    ];
    setActivities(initialActivities);
  }, []);

  const toggleTrackerItem = (index) => {
    if (!checkedIndexes.includes(index)) {
      const updatedIndexes = [...checkedIndexes, index];
      setCheckedIndexes(updatedIndexes);
      const currentTime = new Date();
      setActivityTimes((prevTimes) => {
        const updatedTimes = [...prevTimes];
        updatedTimes[index] = currentTime;
        return updatedTimes;
      });
    }
  };

  const ActivityCard = ({ label, checked, index }) => {
    const [showTime, setShowTime] = useState(checked);
    const checkboxColor = checked ? "#46C1E2" : "#fff";

    useEffect(() => {
      if (checked) {
        const timeoutId = setTimeout(() => {
          setShowTime(true);
        }, 2000);
        return () => clearTimeout(timeoutId);
      }
    }, [checked]);

    const formatTime = (time) => {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return (
      <View style={styles.activityContainer}>
        <View style={styles.labelAndTimeContainer}>
          <Text style={styles.activityLabel}>{label}</Text>
          <Text style={styles.timeText}>
            {checkedIndexes.includes(index)
              ? formatTime(activityTimes[index])
              : "No Update"}
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={checkedIndexes.includes(index)}
            onPress={() => toggleTrackerItem(index)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            color={checkboxColor}
            disabled={checkedIndexes.includes(index)}
          />
        </View>
      </View>
    );
  };

  const CaregiverCard = ({
    caregiverName,
    caregiverType,
    loggedInTime,
    rating,
    imageURL,
  }) => {
    return (
      <View style={styles.caregiverContainer}>
        <Image style={styles.caregiverImage} source={imageURL} />
        <View style={styles.caregiverInfo}>
          <Text style={styles.caregiverName}>
            {caregiverName}, {caregiverType}
          </Text>
          <Text style={styles.smallText}>{loggedInTime}</Text>
          <Text style={styles.smallText}>
            Rating: <Text style={styles.ratingText}>{rating} out of 5</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Card style={styles.card}>
              {caregiver && <CaregiverCard {...caregiver} />}

              <Card.Divider />

              <Card.Title style={styles.cardTitle}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Activities</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={toggleModal}
                  >
                    <AntIcon name="plus" size={20} color="#B8B8B8" />
                  </TouchableOpacity>
                </View>
              </Card.Title>
              <View>
                <Modal
                  visible={isModalVisible}
                  backdropStyle={styles.modalBackdrop}
                  onBackdropPress={toggleModal}
                >
                  <AdaptiveView style={styles.modalContent}>
                    <Image
                      source={require("../../images/help.jpeg")}
                      style={styles.image_styles}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 15,
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      Together let's Make sure the seniors of your house is
                      aging well!{" "}
                    </Text>
                    <TextInput
                      style={styles.newActivityInput}
                      value={newActivityInput}
                      multiline
                      onChangeText={setNewActivityInput}
                      placeholder="Enter new activity your beloved elderly needs!"
                      placeholderTextColor="#B8B8B8"
                    />
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => {
                        addNewActivity();
                        toggleModal();
                      }}
                    >
                      <Text style={styles.buttonText}>Add </Text>
                    </Pressable>
                  </AdaptiveView>
                </Modal>
              </View>

              <Card.Divider />

              {activities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  label={activity.label}
                  checked={activity.checked}
                  index={index}
                />
              ))}
            </Card>
          </View>
        </SafeAreaView>
      )}
    </AuthContext.Consumer>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: "#439BE8",
    margin: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  card: {
    padding: 20,
    margin: 10,
    width: width - 20,
    alignSelf: "center",
  },
  caregiverContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  caregiverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  caregiverInfo: {
    marginLeft: 10,
  },
  caregiverName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  smallText: {
    fontSize: 12,
    color: "#808080",
  },
  ratingText: {
    color: "black",
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activityLabel: {
    width: 150,
    // alignItems:"flex-start"
  },
  checkboxContainer: {
    marginRight: 2,
  },
  timeText: {
    color: "#808080",
  },
  labelAndTimeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newActivityInput: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#439BE8",
    borderRadius: 10,
    fontSize: 16,
    textAlign: "center",
  },
  ardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    marginRight: 10,
  },
  addButton: {
    marginLeft: 190,
  },
  image_styles: {
    justifyContent: "center",
    width: 200,
    height: 180,
    marginTop: 15,
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 17,
  },
});

export default ActivityTracker;
