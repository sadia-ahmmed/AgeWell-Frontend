import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { AuthContext } from "../../providers/AuthProviders";

const FamilyCircleDashBoard = (props) => {
  const data = [
    { id: "1", title: "First Item" },
    { id: "2", title: "Second Item" },
    { id: "3", title: "Third Item" },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.img} source={require("../../../public/man.png")} />
    </View>
  );

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  img: {
    height: 50,
    width: 50,
  },
});

export default FamilyCircleDashBoard;
