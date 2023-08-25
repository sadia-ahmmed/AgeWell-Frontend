import React, { useState, useContext } from "react";
import {
  Pressable,
  ScrollView,
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { signOut } from "firebase/auth";
import AdaptiveView from "../../components/AdaptiveView";
import { Image, Divider, Avatar, Button } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";
import { invokeLogoutService } from "../../services/user/authService";

const EditableRow = ({
  label,
  value,
  isEditing,
  onChangeText,
  onEdit,
  onSave,
}) => (
  <View style={styles.rowContainer}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.editContainer}>
      {isEditing ? (
        <>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              { borderColor: "#439BE8", borderRadius: 15, width: "75%" },
            ]}
          />
          <TouchableOpacity onPress={onSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => onEdit()}>
          <Text style={[styles.textValue, { textAlign: "justify" }]}>
            {value}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const EditableBio = ({
  value,
  isEditing,
  onEdit,
  onSave,
  isMultiline = true,
  numberOfLines = 1,
}) => {
  const [editedValue, setEditedValue] = useState(value);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Biography </Text>
      </View>
      <View style={styles.editContainer}>
        {isEditing ? (
          <Modal visible={isEditing} animationType="slide">
            <View style={styles.modalContainer}>
              <Text
                style={[
                  styles.editText,
                  { marginBottom: 10, textAlign: "center", padding: 10 },
                ]}
              >
                Edit Biography{" "}
              </Text>
              <TextInput
                value={editedValue}
                onChangeText={setEditedValue}
                style={[
                  styles.modalinput,
                  { borderColor: "#439BE8", borderRadius: 10 },
                  isMultiline && { height: numberOfLines * 30 },
                ]}
                multiline={isMultiline && numberOfLines > 1}
                numberOfLines={isMultiline ? numberOfLines : 1}
              />
              <Pressable
                style={styles.modalbutton}
                title="Save"
                onPress={() => onSave(editedValue)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </Modal>
        ) : (
          <TouchableOpacity onPress={() => onEdit()}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={styles.bioScrollView}
            >
              <Text style={[styles.textValue, { textAlign: "justify" }]}>
                {value}
              </Text>
            </ScrollView>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [healthLogs, setHealthLogs] = useState([
    // Add more health logs as needed
  ]);

  const [bio, setBio] = useState("Write your biography here");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  const onLogoutButtonPress = () => {
    invokeLogoutService(authCtx.userCache);
    signOut(auth);
    authCtx.setUserCache([]);
    authCtx.setLoggedIn(false);
  };

  const handleProfilePictureChange = () => {};

  const renderHealthLogItem = ({ item }) => (
    <View style={styles.healthLogItem}>
      <Text>{item.date}</Text>
      <Text>{item.log}</Text>
    </View>
  );
  const handleVerify = () => {
    navigation.navigate("Verification");
  };

  const handleSaveName = () => {
    setIsEditingName(false);
   
  };
  const handleSaveEmail = () => {
    setIsEditingEmail(false);
 
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    setIsEditingBio(false);
   
  };

  return (
    <AdaptiveView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          title="dp"
          onLongPress={handleProfilePictureChange}
          size={64}
          rounded
          source={setProfilePicture}
          containerStyle={{ backgroundColor: "#6733b9" }}
        />
        <Text style={styles.nameTop}>{name}</Text>

        <Text style={styles.emailTop}>{email}</Text>
      </View>

      <Pressable onPress={handleVerify} style={styles.button}>
        <Text style={styles.buttonText}>Verify Account</Text>
      </Pressable>

      <Text style={styles.editText}>Edit General Information </Text>

      <Divider />

      <EditableRow
        label="Name"
        value={name}
        isEditing={isEditingName}
        onChangeText={setName}
        onEdit={() => setIsEditingName(true)}
        onSave={handleSaveName}
      />
      <EditableRow
        label="Email"
        value={email}
        isEditing={isEditingEmail}
        onChangeText={setEmail}
        onEdit={() => setIsEditingEmail(true)}
        onSave={handleSaveEmail}
      />

      <EditableBio
        value={bio}
        isEditing={isEditingBio}
        onChangeText={setBio}
        onEdit={() => setIsEditingBio(true)}
        onSave={(editedBio) => {
          setBio(editedBio);
          setIsEditingBio(false);
        }}
        isMultiline={true} 
        numberOfLines={4} 
      />
      <EditableRow
        label="Password"
        value={password}
        isEditing={isEditingPassword}
        onChangeText={setPassword}
        onEdit={() => setIsEditingPassword(true)}
        onSave={handlePasswordChange}
      />

      <Text style={styles.editText}>Edit Health Logs </Text>

      <Divider />
{/*       
      <FlatList
        data={healthLogs}
        renderItem={renderHealthLogItem}
        keyExtractor={(item) => item.id}
      /> */}

      <View style={{ margin: 20 }}>
        {/* <Button
          color="red"
          style={{
            marginTop: 10,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: "#439BE8",
            marginLeft: 10,
            marginRight: 10,
          }}
          title="LOGOUT"
          onPress={onLogoutButtonPress}
        /> */}
        <Pressable onPress={onLogoutButtonPress} style={[styles.button, {marginLeft:70, marginRight:70 , backgroundColor:"#A9A9A9"}]}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
      </View>
    </AdaptiveView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: -25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 16, // Add margin to the Avatar container
  },
  input: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    // marginBottom: 12,
    padding: 8,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  healthLogItem: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 8,
  },
  editText: {
    fontSize: 16,
    color: "#439BE8",
    padding: 5,
    marginTop: 20,
    marginBottom: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    // paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#439BE8",
    marginLeft: 110,
    marginRight: 110,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  nameTop: {
    fontSize: 20,
    color: "#439BE8",
    padding: 1,
    marginTop: 10,
  },
  emailTop: {
    fontSize: 12,
    color: "#A9A9A9",
    fontStyle: "italic",
    padding: 2,
  },
  textValue: {
    fontSize: 15,
    marginLeft: 8,
    padding: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 8,
  },

  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: 'space-between', // This will push the TextInput and Save button apart
    flex: 1,
    //margin: 2,
    borderColor: "#439BE8",
    borderRadius: 20,
    marginTop: 10,
  },

  saveButton: {
    color: "#439BE8",
    fontSize: 14,

    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderColor: "#439BE8",
    //marginTop: 20,
  },
  columnContainer: {
    // flexDirection: "column",
    //  alignItems: "center",
    margin: 5,
    //marginTop: 20,
  },
  labelContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 80, // Adjust the width as needed
  },

  modalContainer: {
    flex: 1,
    marginTop: 30,
    padding: 2,
    // alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    // paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#439BE8",
    marginLeft: 120,
    marginRight: 120,
  },
  modalinput: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginBottom: 20,
  },
  bioScrollView: {
    maxHeight: 46.5, // Set the desired maximum height
    borderColor: "#439BE8",
    borderRadius: 10,
    marginRight: 15,
  },
  bioText: {
    textAlign: "justify",
    paddingBottom: 20, // Add some padding at the bottom
  },
});

export default SettingsScreen;
