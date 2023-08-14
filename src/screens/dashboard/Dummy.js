import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "@rneui/base";
import { AuthContext } from "../../providers/AuthProviders";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfigs";
import { SpeedDial } from "@rneui/themed";
import JoinFamilyCircle from "./JoinFamilyCircle";
import CreateFamilyCircle from "./CreateFamilyCircle";

const Dummy = (props) => {
  const authCtx = useContext(AuthContext);

  const onLogoutButtonPress = () => {
    invokeLogoutService(authCtx.userCache);
    signOut(auth);
    authCtx.setUserCache([]);
    authCtx.setLoggedIn(false);
  };

  const [open, setOpen] = React.useState(false);
  
  return (
    <View style={{ padding: 30 }}>
      <Text>This is a test dashboard</Text>
      <View style={{ margin: 10 }}>
        <Button
          title="BOOKING"
          onPress={() => props.navigation.navigate("booking-list")}
        />
      </View>

      <View style={{ margin: 10 }}>
        <Button color="red" title="LOGOUT" onPress={onLogoutButtonPress} />
      </View>
      <View style={{ padding: 200, bottom: -150, left: -50 }}>
        <SpeedDial
          isOpen={open}
          icon={{ name: "edit", color: "#fff" }}
          openIcon={{ name: "close", color: "#fff" }}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Create Family Circle"
            onPress={() => props.navigation.navigate("create-family-circle")}
          />
          <SpeedDial.Action
            icon={{ name: "create", color: "#fff" }}
            title="Join Family Circle"
            onPress={() => props.navigation.navigate("join-family-circle")}
          />
        </SpeedDial>
      </View>
    </View>
  );
};

export default Dummy;