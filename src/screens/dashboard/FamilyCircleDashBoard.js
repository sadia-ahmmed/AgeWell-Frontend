import React, { useState } from "react";
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

const FamilyCircleDashBoard = (props) => {
  const data = [
    { id: "1", title: "Sahid Hossain Mustakim", number: "Contact No: +8801618888888", image: require("../../../public/man.png") },
    { id: "2", title: "S M Jishanul Islam", number: "Contact No: +8801618888888", image: require("../../../public/man.png") },
    { id: "3", title: "Nur Islam Shourov", number: "Contact No: +8801618888888", image: require("../../../public/man.png") },
  ];
  
  const [activeCard, setActiveCard] = useState(null);

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

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item title={item.title} number={item.number} image={item.image} />
            )}
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
