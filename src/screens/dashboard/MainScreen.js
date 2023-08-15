import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { auth } from "../../firebase/firebaseConfigs";
import { signOut } from "firebase/auth";
import { invokeLogoutService } from "../../services/user/authService";
import { Button } from "@rneui/themed";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { SpeedDial } from "@rneui/themed";

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useState()
  const authCtx = useContext(AuthContext)
  const [open, setOpen] = React.useState(false)

  const onLogoutButtonPress = () => {
    invokeLogoutService(authCtx.userCache)
    signOut(auth)
    authCtx.setUserCache([])
    authCtx.setLoggedIn(false)
  };

  useEffect(() => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken;

    const httpPolling = setInterval(() => {
      fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/get`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_access_token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result)
          authCtx.setUserCache(result)
        })
        .catch((error) => {
          alert("Error getting user details")
        })
    }, 3000);

    return () => clearInterval(httpPolling)
  }, []);

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <View style={styles.main_container}>
          <Text>Main</Text>
          <View style={{ margin: 10 }}>
            <Button color="red" title="LOGOUT" onPress={onLogoutButtonPress} />
          </View>
          <View style={{ margin: 10 }}>
            <Button color="success" title="MEDICINE TRACKER" onPress={() => navigation.navigate("medicine-tracker")} />
          </View>
          {
            authCtx.userCache.type === "user" &&
            <SpeedDial
              color="#46C1E2"
              isOpen={open}
              icon={{ name: "people", color: "#fff" }}
              openIcon={{ name: "close", color: "#fff" }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            >
              {
                !authCtx.userCache.in_circle &&
                <SpeedDial.Action
                  color="#46C1E2"
                  icon={{ name: "add", color: "#fff" }}
                  title="Create Family Circle"
                  onPress={() => navigation.navigate("create-family-circle")}
                />
              }
              {
                !authCtx.userCache.in_circle &&
                <SpeedDial.Action
                  color="#46C1E2"
                  icon={{ name: "person-add", color: "#fff" }}
                  title="Join Family Circle"
                  onPress={() => navigation.navigate("join-family-circle")}
                />
              }
              {
                authCtx.userCache.in_circle &&
                <SpeedDial.Action
                  color="#46C1E2"
                  icon={{ name: "create", color: "#fff" }}
                  title="My Circle"
                  onPress={() => navigation.navigate("family-circle-dashboard")}
                />
              }

            </SpeedDial>

          }

        </View>
      )}
    </AuthContext.Consumer>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  main_container: {
    paddingTop: 10,
    padding: 30,
    backgroundColor: "white",
    flex: 1,
  },
});
