

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ActivityList = ({ route }) => {
  const { completedActivities } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Activities Today:</Text>
      <View style={styles.activityList}>
        {completedActivities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityLabel}>{activity.label}</Text>
            <Text style={styles.activityTime}>
              {activity.time ? activity.time.toString() : "No Update"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    textAlign:"center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#439BE8",
  },
  activityList: {
    borderTopWidth: 1,
    borderColor: "#DDD",
    paddingTop: 10,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  activityLabel: {
    flex: 1,
    fontSize: 16,
  },
  activityTime: {
    color: "#808080",
  },
});

export default ActivityList;
