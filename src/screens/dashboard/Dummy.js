import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "@rneui/base";
import { AuthContext } from "../../providers/AuthProviders";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfigs";
import { SpeedDial } from "@rneui/themed";
import JoinFamilyCircleModal from "./JoinFamilyCircleModal";
import CreateFamilyCircleModal from "./CreateFamilyCircleModal";

const Dummy = (props) => {
  const authCtx = useContext(AuthContext);

  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const onLogoutButtonPress = () => {
    invokeLogoutService(authCtx.userCache);
    signOut(auth);
    authCtx.setUserCache([]);
    authCtx.setLoggedIn(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleJoin = (joinLink) => {
    console.log("Joining with link:", joinLink);
  };

  const handleCreate = (familyCircleName) => {
    console.log("Creating family circle:", familyCircleName);
  };

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
            onPress={() => setCreateModalVisible(true)}
          />
          <SpeedDial.Action
            icon={{ name: "create", color: "#fff" }}
            title="Join Family Circle"
            onPress={() => setJoinModalVisible(true)}
          />
        </SpeedDial>
        <JoinFamilyCircleModal
          visible={joinModalVisible}
          onClose={() => setJoinModalVisible(false)}
          onJoin={handleJoin}
        />
        <CreateFamilyCircleModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreate={handleCreate}
        />
      </View>
    </View>
  );
};

export default Dummy;
