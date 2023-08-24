import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Card, Image, Button, CheckBox } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";

const ActivityTracker = ({ navigation }) => {
  const [caregiver, setCaregiver] = useState(null);
  const [activities, setActivities] = useState([]);

  const fetchCaregiver = async () => {
    return {
      caregiverName: "John Doe",
      caregiverType: "Medical Caregiver",
      loggedInTime: "18/08/2023, 10:00 AM",
      rating: 5,
      imageURL: require("../../../assets/favicon.png"),
    };
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
    const updatedItems = [...activities];
    updatedItems[index].checked = !updatedItems[index].checked;
    setActivities(updatedItems);
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

    return (
      <View style={styles.activityContainer}>
        <Text style={styles.activityLabel}>{label}</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={checked}
            onPress={() => toggleTrackerItem(index)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            color={checkboxColor}
          />
        </View>
        <Text style={styles.timeText}>
          {showTime ? "2:00 PM" : "No Update"}
        </Text>
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
        <Image
          style={styles.caregiverImage}
          source={imageURL}
        />
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

              <Card.Title>Activities</Card.Title>

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
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  timeText: {
    color: "#808080",
  },
});

export default ActivityTracker;
