import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";

const JoinFamilyCircleModal = ({ visible, onClose, onJoin }) => {
  const [joinLink, setJoinLink] = useState("");

  const handleJoin = () => {
    onJoin(joinLink);
    onClose();
  };

  const handleBack = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Card.Title>Join Family Circle</Card.Title>
          <Card.Divider />
          <TextInput
            label="Enter Join Link"
            value={joinLink}
            onChangeText={setJoinLink}
          />
          <Button title="Join" onPress={handleJoin} />

          <View style={styles.secondView}>
            <Text> Don't have a circle? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("JoinFamilyCircleModal")}
            >
              <Text style={styles.link}>Create</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.backButtonContainer}>
            <Button title="Back" onPress={handleBack} />
          </View>
        </Card>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 10,
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  link: {
    color: "blue",
  },
});

export default JoinFamilyCircleModal;
