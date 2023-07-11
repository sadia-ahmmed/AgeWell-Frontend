import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

const CareGiver = () => {
  const caregiverName = "Sahid Hossain Mustakim";

  const handleLogout = () => {
    // Add your logout logic here
  };
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
