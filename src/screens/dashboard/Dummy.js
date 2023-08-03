import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { invokeLogoutService } from "../../services/user/authService";
import { AuthContext } from "../../providers/AuthProviders";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfigs";
import { SpeedDial } from "@rneui/themed";

const Dummy = (props) => {
  const onLogoutButtonPress = (authCtx) => {
    invokeLogoutService(authCtx.userCache);
    signOut(auth);
    authCtx.setUserCache([]);
    authCtx.setLoggedIn(false);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <AuthContext.Consumer>
      {(authCtx) => (
        <View style={{ padding: 30 }}>
          <Text>This is a test dashboard</Text>
          <View style={{ margin: 10 }}>
            <Button
              title="BOOKING"
              onPress={() => props.navigation.navigate("booking-list")}
            />
          </View>

          <View style={{ margin: 10 }}>
            <Button
              color="red"
              title="LOGOUT"
              onPress={() => onLogoutButtonPress(authCtx)}
            />
          </View>
          <SpeedDial
            isOpen={open}
            icon={{ name: "edit", color: "#fff" }}
            openIcon={{ name: "close", color: "#fff" }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
          >
            <SpeedDial.Action
              icon={{ name: "add", color: "#fff" }}
              title="Join"
              onPress={() => console.log("Add Something")}
            />
            <SpeedDial.Action
              icon={{ name: "create", color: "#fff" }}
              title="Add"
              onPress={() => console.log("Delete Something")}
            />
          </SpeedDial>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

export default Dummy;