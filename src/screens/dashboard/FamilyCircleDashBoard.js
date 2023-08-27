import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Clipboard,
  TouchableHighlight,
} from "react-native";
import { Card, Avatar, Overlay } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import AdaptiveView from "../../components/AdaptiveView";
import { auth } from "../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { Dialog } from "react-native-elements";
import { Linking } from "react-native";
import ActivityList from "../ActivityList";
const FamilyCircleDashBoard = (navigation) => {

  const [loading, setLoading] = useState(true);
  const [circleCode, setCircleCode] = useState();
  const [circleMembers, setCircleMembers] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const authCtx = useContext(AuthContext);

  const [linkModal, setLinkModal] = useState(false);

  const toggleLinkModal = () => {
    setLinkModal(!linkModal);
  };

  useEffect(() => {
    const circleId = authCtx.userCache.circleId
    const user_access_token = auth.currentUser.stsTokenManager.accessToken

    const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/circle/get-members/${circleId}`
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${user_access_token}`
      }
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setCircleMembers(data.members)
        setCircleCode(data.circle_code)
        setLoading(false)
      })
      .catch(err => {
        alert(err.message)
      })

  }, [])



  const Item = ({ title, number, image }) => (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor="rgba(0, 0, 0, 0.1)"
      onPress={() => setActiveCard(title)}
      onLongPress={() => setActiveCard(title)}
      onHideUnderlay={() => setActiveCard(null)}
    >
      <Card style={[styles.card, activeCard === title , ]}>
        <View style={styles.item}>
          <View style={styles.avatarContainer}>
            <Avatar
              title="dp"
              size={80}
              rounded
              //marginRight={10}
              source={require("../../images/queen.png")}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.number}>{number}</Text>
            <View style={styles.buttonContainer}>
             
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.navigate("ActivityList")
                }
              >
                <Text style={styles.buttonText}>  Call  </Text>
              </Pressable>
              {/* View Reports */}
              <Pressable
                style={styles.button1}
                onPress={toggleLinkModal}
              >
                <Text style={styles.buttonText}>Reports</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Overlay isVisible={linkModal} onBackdropPress={toggleLinkModal}>
          {/* Overlay content */}
          <View style={styles.modalContent}>
            <Text style={styles.linkText}>
              {`http://localhost:3001/reports/${auth.currentUser.uid}`}
            </Text>
            <View style={styles.overlayButtonContainer}>
              <Pressable
                style={styles.overlayButton}
                onPress={() => {
                  Clipboard.setString(
                    `http://localhost:3001/reports/${auth.currentUser.uid}`
                  );
                  alert("Link copied");
                }}
              >
                <Text style={styles.overlayButtonText}>Copy Link</Text>
              </Pressable>
              <Pressable
                style={styles.overlayButton}
                onPress={() =>
                  Linking.openURL(
                    `http://localhost:3001/reports/${auth.currentUser.uid}`
                  )
                }
              >
                <Text style={styles.overlayButtonText}>Open in browser</Text>
              </Pressable>
            </View>
          </View>
        </Overlay>
      </Card>

    </TouchableHighlight>
  );


  const MainCircleDashScreen = () => (
    <>
      {
        circleMembers.length === 0 ?
          <>
            <Text style={styles.text_holder}>No circle members? Add them by sending them the code</Text>
            <Text style={[styles.text_holder, { fontSize: 22, fontWeight: "bold" }]}>{circleCode}</Text>
          </>
          :
          <FlatList
            data={circleMembers}
            renderItem={({ item }) => (
              <Item title={item.title} number={item.number} image={item.image} />
            )}
            keyExtractor={(item) => item.id}
          />
      }
    </>
  )


  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <AdaptiveView style={styles.container}>
          {
            loading ? < Dialog.Loading /> : <MainCircleDashScreen />
          }
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    marginTop:-20,
  },
  text_holder: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center"
  },
  // card: {
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 20,
  //   padding: 10,
  // },
  activeCard: {
    backgroundColor: "#e1e0e0",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  // avatarContainer: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40,
  //   overflow: "hidden",
  //   marginRight: 10,
  // },
  // avatar: {
  //   width: "100%",
  //   height: "100%",
  // },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
  },
  number: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },

  card: {
    // marginVertical: 8,
    // marginHorizontal: 8,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#fff", // Background color for the card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.2,
    
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
  activeCard: {
    backgroundColor: "#f2f2f2", // Background color when active
  },
  
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 20,
    marginTop: -30,
    //backgroundColor: "#f2f2f2", // Background color for the avatar container
  },
  textContainer: {
    marginLeft: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  number: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop:3,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: "#439BE8",
    margin: 5,
    marginLeft:-7,
    width:82,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: "#439BE8",
    margin: 5,
    marginLeft:20,
    width:82,
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    //fontWeight: "bold",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  linkText: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  overlayButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  overlayButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#439BE8",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  overlayButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },



});

export default FamilyCircleDashBoard;
