import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Button } from 'react-native';
import { Card, Input } from '@rneui/themed'
import { AuthContext } from '../../providers/AuthProviders';

const CreateFamilyCircle = ({navigation}) => {

  const [familyCircleName, setFamilyCircleName] = useState("");

  const handleCreate = () => {
    
  }

  return (
    <AuthContext.Consumer>
      {
        (authCtx) => (
          <SafeAreaView style={styles.container}>
          <Card style={styles.card}>
            <Card.Title>Create Family Circle</Card.Title>
            <Card.Divider />
            <Input label="Enter Family Circle Name" value={familyCircleName} onChangeText={setFamilyCircleName} />
            <Button title="Create" onPress={handleCreate} />
            <View style={styles.secondView}>
              <Text> Already have a circle? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("join-family-circle")}>
                <Text style={styles.link}>Join</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </SafeAreaView>
        )
      }

    </AuthContext.Consumer>

  );
}

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

export default CreateFamilyCircle;