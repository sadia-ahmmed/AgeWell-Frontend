import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { Card } from '@rneui/themed';

const CreateFamilyCircleModal = ({ visible, onClose, onCreate, navigation }) => {
  const [familyCircleName, setFamilyCircleName] = useState("");

  const handleCreate = () => {
    onCreate(familyCircleName);
    // onClose();
  };

  const handleBack = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Card.Title>Create Family Circle</Card.Title>
          <Card.Divider />
          <TextInput label="Enter Family Circle Name" value={familyCircleName} onChangeText={setFamilyCircleName} />
          <Button title="Create" onPress={handleCreate} />
          <View style={styles.secondView}>
            <Text> Already have a circle? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("JoinFamilyCircleModal")}>
              <Text style={styles.link}>Join</Text>
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
  backButtonContainer: {
    marginTop: 20,
  },
});

export default CreateFamilyCircleModal;
