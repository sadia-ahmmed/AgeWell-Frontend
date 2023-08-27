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
import { EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup, signOut, updateEmail } from "firebase/auth";
import AdaptiveView from "../../components/AdaptiveView";
import { Image, Divider, Avatar, Button } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";
import { invokeLogoutService } from "../../services/user/authService";
import { IP_ADDRESS, IP_PORT } from "../../../configs";

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
        <Text style={styles.label} adjustsFontSizeToFit>Biography</Text>
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
  const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/set-account-detail`
  const user_access_token = auth.currentUser.stsTokenManager.accessToken

  const [name, setName] = useState(authCtx.userCache.fullname);
  const [email, setEmail] = useState(authCtx.userCache.email);
  const [password, setPassword] = useState("");

  const [weight, setWeight] = useState("65KG");
  const [diabetics, setDiabetics] = useState("4.3");
  const [bloodPressure, setBloodPressure] = useState("126/78");

  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingDiabetics, setIsEditingDiabetics] = useState(false);
  const [isEditingBloodPressure, setIsEditingBloodPressure] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [profilePicture, setProfilePicture] = useState(authCtx.userCache.avatar);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [healthLogs, setHealthLogs] = useState([
    // Add more health logs as needed
  ]);

  const [bio, setBio] = useState(authCtx.userCache.biography);
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

  const handleProfilePictureChange = () => {
    alert("Darde e disco")
  };

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

    const body = {
      key: "fullname",
      fullname: name
    }

    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user_access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        authCtx.setUserCache(data)
      })
      .catch(err => {
        alert(err.message)
      })

  };


  const handleSaveEmail = () => {
    setIsEditingEmail(false);

    const body = {
      key: "email",
      email: email
    }

    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user_access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log(atob(authCtx.userCache.secretKey))
        reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(auth.currentUser.email, atob(authCtx.userCache.secretKey))
        )
          .then(() => {
            updateEmail(auth.currentUser, email)
              .then(() => {
                authCtx.setUserCache(data)
              })
              .catch(err => {
                alert(err)
              })
          })
          .catch(err => {
            alert(err)
          })
      })
      .catch(err => {
        alert(err.message)
      })

  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {

    const body = {
      key: "biography",
      biography: bio
    }

    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user_access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log("done")
        authCtx.setUserCache(data)
      })
      .catch(err => {
        alert(err.message)
      })
  };

  const handleSaveWeight = () => {
    setIsEditingWeight(false);
  };

  const handleSaveDiabetics = () => {
    setIsEditingDiabetics(false);
  };

  const handleSaveBloodPressure = () => {
    setIsEditingBloodPressure(false);
  };
    


  return (
    <AdaptiveView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          title="dp"
          onLongPress={handleProfilePictureChange}
          size={82}
          rounded
          source={{ uri: `data:image/jpeg;base64,${authCtx.userCache.avatar}` }}
          containerStyle={{ backgroundColor: "#6733b9" }}
        />
        <Text style={styles.nameTop}>{name}</Text>
        {/* {authCtx.userCache.is_verified && <Text>Verified</Text>} */}
        <Text style={styles.emailTop}>{email}</Text>
      </View>

      {
        !authCtx.userCache.is_verified &&
        <Pressable onPress={handleVerify} style={styles.button}>
          <Text style={styles.buttonText}>Verify Account</Text>
        </Pressable>
      }

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
          console.log(editedBio)
          handleSaveBio()
        }}
        isMultiline={true}
        numberOfLines={4}
      />
      

      <Text style={styles.editText}>Edit Health Logs </Text>

      <Divider />

            {/*  Weight,Diabetics,Blood Pressure*/}

      <EditableRow
        label="Weight"
        value="65KG"
        isEditing={false}
        onChangeText={setWeight}
        onEdit={() => setIsEditingWeight(true)}
        onSave={handleSaveWeight}
      />

      <EditableRow
        label="Diabetics"
        value="4.3"
        isEditing={false}
        onChangeText={setDiabetics}
        onEdit={() => setIsEditingDiabetics(true)}
        onSave={handleSaveDiabetics}
      />

      <EditableRow
        label="Blood Pressure"
        value="126/78"
        isEditing={false}
        onChangeText={setBloodPressure}
        onEdit={() => setIsEditingBloodPressure(true)}
        onSave={handleSaveBloodPressure}
      />





      {/* <FlatList
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
        <Pressable onPress={onLogoutButtonPress} style={[styles.button, { marginLeft: 80, marginRight: 80, backgroundColor: "#A9A9A9" }]}>
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
    fontSize: 14,
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
