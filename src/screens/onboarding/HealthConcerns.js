import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { AuthContext } from "../../providers/AuthProviders";
import AdaptiveView from "../../components/AdaptiveView";
import { ScrollView } from "react-native-gesture-handler";

const HealthConcerns = (props) => {
  const [concernlist, setConcernList] = useState([]);
  const [text, onChangeText] = useState('');

  const AddList = () => {
    if (text.trim() !== "") { // Check if text is not empty or just whitespace
        setConcernList([...concernlist, text]);
        onChangeText('');
      }
  };

  const renderConcernItem = ({ item, index }) => (
    
    <View style={styles.concernItem}>
      <Text style={styles.concernText}>{`${index + 1}. ${item}`}</Text>
    </View>
   
  );

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <AdaptiveView style={styles.container}>
          <Text style={styles.headText}>Health Concerns</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter Health Concern"
          />

          <Pressable style={styles.button} onPress={AddList}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
          {concernlist.length === 0 ? (
            <View style={styles.emptyContent}>
              <Image
                source={require("../../images/sry.jpeg")}
                style={styles.image_styles}
              />
              <Text style={styles.emptyListText}>No health concerns</Text>
            </View>
          ) : (
            <FlatList
              data={concernlist}
              keyExtractor={(item) => item}
              renderItem={renderConcernItem}
              style={styles.list}
            />
          )}
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headText: {
    fontSize: 19,
    marginTop: 5,
    fontWeight: "500",
    color: "#439BE8",
    marginBottom: 2,
    padding: 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#439BE8",
    width: 100,

  },
  buttonText: {
    color: "white",
    fontSize: 16,

  },
  list: {
    marginTop: 20,
    width: "80%",
  },
  concernItem: {
  //  borderWidth: 1,
   // borderColor: "#ccc",
   // borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  concernText: {
    fontSize: 16,
  },
  concernList: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 350,
    height:800,
    marginTop:20, 
   
  },
  image_styles: {
    justifyContent: "center",
    width: 140,
    height: 140,
    marginTop: 15,
    alignSelf: "center",
  }
});

export default HealthConcerns;