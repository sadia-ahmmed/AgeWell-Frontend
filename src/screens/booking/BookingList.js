import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useState } from "react";
import { useEffect } from "react";
import { Card, Dialog, Input } from "@rneui/themed";
import { FlatList, TouchableOpacity } from "react-native";
import { IP_ADDRESS, IP_PORT } from "../../../configs";
import { auth } from "../../firebase/firebaseConfigs";
import NurseCard from "../../components/NurseCard";
import AdaptiveView from "../../components/AdaptiveView";
import { SearchBar } from "react-native-elements";
import { Platform, Image } from "react-native";

const BookingList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nurseList, setNurseList] = useState([]);
  const [nurseListOnQuery, setNurseListOnQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNurses();
  }, []);

  const fetchNurses = () => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken;

    fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/get-nurses`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_access_token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setNurseList(result);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error getting nurses");
      });
  };

  const dynamicStringSearch = (query) => {
    setSearchQuery(query);
    query = query.trim();

    if (query === "") {
      setNurseListOnQuery([]); // Clear the filtered list
      return;
    }

    const queried_list = nurseList.filter((value) => {
      const specialties = value.specialities.map((speciality) =>
        speciality.toLowerCase()
      );
      return specialties.some((speciality) =>
        speciality.includes(query.toLowerCase())
      );
    });

    setNurseListOnQuery(queried_list);
  };

  let Screen = () => (
    <>
      {nurseList.length === 0 ? (
       <View style={styles.container}>
       <Image
         source={require("../../images/sry.jpeg")}
         style={styles.image_styles}
       />
       <Text style={{ textAlign: "center", fontSize: 14, color: "#439BE8" }}>
         {" "}
         Sorry we cannot find a caregiver with your specialization!{" "}
       </Text>
     </View>
      ) : searchQuery === "" ? (
        <FlatList
          data={nurseList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => props.navigation.navigate("nurse-highlight", item)}
            >
              <NurseCard key={index} nurse={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.uid}
        />
      ) : nurseListOnQuery.length === 0 ? (
        <View style={styles.container}>
          <Image
            source={require("../../images/sry.jpeg")}
            style={styles.image_styles}
          />
          <Text style={{ textAlign: "center", fontSize: 14, color: "#439BE8" , marginTop:10,padding:5}}>
            {" "}
            Sorry we cannot find a caregiver with your specialization!{" "}
          </Text>
        </View>
      ) : (
        <FlatList
          data={nurseListOnQuery}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => props.navigation.navigate("nurse-highlight", item)}
            >
              <NurseCard key={index} nurse={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.uid}
        />
      )}
    </>
  );

  return (
    <AuthContext.Consumer>
      {(authCtx) =>
        loading ? (
          <AdaptiveView style={styles.pageContainer}></AdaptiveView>
        ) : (
          <AdaptiveView styles={styles.pageContainer}>
            <View style={styles.container}>
              <View style={styles.searchContainer}>
              <SearchBar
                  placeholder="Search Caregivers"
                  value={searchQuery}
                  lightTheme
                  cancelButtonTitle=" "
                  round
                  platform={Platform.OS}
                  blurOnSubmit={false}
                  onChangeText={dynamicStringSearch}
                  inputContainerStyle={{
                    backgroundColor: "#F5FDFF",
                    borderColor: "#439BE8",
                    borderWidth: 0,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  containerStyle={{
                    borderWidth: 0,
                    padding: 0,
                    margin: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    //backgroundColor:'white',
                  }}
                />
              </View>
              <Screen />
            </View>
          </AdaptiveView>
        )
      }
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    backgroundColor: "white",
  },
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
  search_bar_style: {
    backgroundColor: "white",
  },
  searchContainer: {
    // marginTop: 55,
    padding: 5,
    paddingTop: 8,
    backgroundColor: "white",
  },
  image_styles: {
    justifyContent: "center",
    width: 140,
    height: 140,
    marginTop: 15,
    alignSelf: "center",
  },
});

export default BookingList;
