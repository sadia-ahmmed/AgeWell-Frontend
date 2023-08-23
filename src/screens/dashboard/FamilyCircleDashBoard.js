import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
} from "react-native";
import { Card } from "@rneui/themed";
import { AuthContext } from "../../providers/AuthProviders";
import AdaptiveView from "../../components/AdaptiveView";
import { auth } from "../../firebase/firebaseConfigs";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { Dialog } from "react-native-elements";

const FamilyCircleDashBoard = (props) => {

  const [loading, setLoading] = useState(true)
  const [circleCode, setCircleCode] = useState([])
  const [circleMembers, setCircleMembers] = useState([])
  const [activeCard, setActiveCard] = useState(null);
  const authCtx = useContext(AuthContext)


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
      <Card style={[styles.card, activeCard === title && styles.activeCard]}>
        <View style={styles.item}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.number}>{number}</Text>
          </View>
        </View>
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
      {(auth) => (
        <AdaptiveView style={styles.container}>
          {
            loading ? <Dialog.Loading /> : <MainCircleDashScreen />
          }
        </AdaptiveView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white"
  },
  text_holder: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center"
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 10,
  },
  activeCard: {
    backgroundColor: "#e1e0e0",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
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
});

export default FamilyCircleDashBoard;
