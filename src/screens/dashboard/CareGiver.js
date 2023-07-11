import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button ,
  FlatList,
} from "react-native";

const CareGiver = () => {
  const caregiverName = "Sahid Hossain Mustakim";

  const handleLogout = () => {
    // Add your logout logic here
  };

  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: "Sahid Hossain Mustakim",
      requestType: "Medicine",
      requestTime: "10:00 AM",
      requestDate: "10/10/2021",
    },
    {
      id: 2,
      patientName: "Sahid Hossain",
      requestType: "Medicine",
      requestTime: "10:00 AM",
      requestDate: "10/10/2021",
    },
  ]);

  const handleAccept = (requestId) => {
    console.log("Accepted request with id: ", requestId);
  };

  const handleReject = (requestId) => {
    console.log("Rejected request with id: ", requestId);
  };

  const renderRequest = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingHorizontal: 20,
      }}
    >
      <Text>
        {item.patientName} - {item.requestType}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="Accept" onPress={() => handleAccept(item.id)} />
        <Button title="Reject" onPress={() => handleReject(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../public/boy.png")}
            style={styles.icon}
          />
          <Text style={styles.caregiverName}>{caregiverName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.box1}>
          <Text style={styles.boxText}>Completed</Text>
          <Text style={styles.boxTextPoint}>10</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.boxText}>Rating</Text>
          <Text style={styles.boxTextPoint}>4.5</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.boxText}>Points</Text>
          <Text style={styles.boxTextPoint}>100</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            Incoming Requests
          </Text>
          <FlatList
            data={requests}
            renderItem={renderRequest}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  caregiverName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  boxContainer: {
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#4ED5F9",
    marginVertical: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    position: "absolute",
    bottom: 70,
    left: 10,
  },
  boxTextPoint: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#4ED5F9",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

export default CareGiver;
