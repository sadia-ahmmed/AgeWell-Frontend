import { StyleSheet, Text, Pressable, FlatList, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Dialog, Divider, SearchBar } from "react-native-elements";

import * as DocumentPicker from "expo-document-picker";
import { IP_ADDRESS, IP_PORT } from "../../../../configs";
import { auth } from "../../../firebase/firebaseConfigs";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Icon, Image } from "@rneui/themed";
import AntIcon from "react-native-vector-icons/AntDesign";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import { FileImageOutlined } from "@ant-design/icons";
import AdaptiveView from "../../../components/AdaptiveView";
// "expo-file-system": "^15.4.3",

const Calendar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [reportlist, setReportList] = useState([]);


  const updateSearch = (search) => {
    setSearch(search);
  };


  useEffect(() => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken;
    const httpPolling = setInterval(() => {
      const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/reports/get`;
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_access_token}`,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setReportList(data);
          setLoading(false)
        })
        .catch((error) => alert(error.message));
    }, 5000);

    return () => clearInterval(httpPolling);
  }, []);


  const selectDoc = async () => {
    const user_access_token = auth.currentUser.stsTokenManager.accessToken;

    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        multiple: false,
      });


      let data = new FormData();

      if (Platform.OS === "ios" || Platform.OS === "macos") {
        data.append("file", doc)
      } else {
        data.append("file", {
          name: doc.name,
          uri: doc.uri,
          type: doc.mimeType === "image/jpeg" ? `image/${doc.type}` : `application/${doc.type}`,
        });
      }



      const uid = auth.currentUser.uid;
      const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/reports/upload/${uid}`;
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${user_access_token}`,
        },
        body: data,
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .catch((error) => alert(error.message));
      console.log(doc);
    } catch (err) {
      console.log(err);
    }
  };

  const renderReportItem = ({ item }) => {
    return (
      <View style={styles.reportItem}>
        {item.file_ext === "pdf" ? (
          <Image
            source={require("../../../../public/pdf.png")}
            style={{ width: 38, height: 38, padding: 5, margin: 1 }}
          />
        ) : (
          <Image
            source={require("../../../../public/jpg-file.png")}
            style={{ width: 27, height: 27, padding: 8, marginLeft: 7 }}
          />
          //<AntIcon name="pdffile1" color="#439BE8" size="30" />
          //<AntIcon name="file1" color="#439BE8" size="25" />
          //<Icon name="user-md" type="font-awesome" color="#439BE8" size={25} />
          //<AntIcon name="picture" color="#439BE8" size="30" />
        )}
        <Text style={styles.reportFileName}>{item.file_name}</Text>
        <View style={styles.downloadIconContainer}>
          <AntIcon name="download" size={20} color="#B8B8B8" />
        </View>
      </View>
    );
  };


  const ViewReportList = () => (
    <>
      {
        reportlist.length === 0 ? <Text>No reports added yet</Text> :
          <FlatList
            data={reportlist}
            keyExtractor={(item) => item._id}
            renderItem={renderReportItem}
          />
      }
    </>
  )


  return (
    <AdaptiveView style={styles.container}>
      <SearchBar
        placeholder="Search Reports"
        value={search}
        lightTheme
        round
        platform="ios"
        onChangeText={updateSearch}
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
      <Pressable style={styles.button} onPress={selectDoc}>
        <Text style={styles.buttonText}>Upload Report</Text>
      </Pressable>
      <View style={styles.headerContainer}>
        <Text style={styles.reportHeader}>Recent Reports</Text>
        <View style={styles.linkIconContainer}>
          <AntIcon
            name="link"
            size={15}
            color="white"
            style={styles.linkIcon}
          />
        </View>
      </View>
      {
        loading ? <Dialog.Loading /> : <ViewReportList />
      }
    </AdaptiveView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
    //alignContent: "center",11
    // alignItems: "center"
    padding: -38,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: "#439BE8",
    margin: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  reportItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
  },
  reportHeader: {
    fontSize: 19,
    marginTop: 5,
    fontWeight: "500",
    color: "#439BE8",
    marginBottom: 2,
    padding: 10,
    flexDirection: "row",
  },
  reportFileName: {
    marginLeft: 10,
    fontSize: 16,
    marginRight: 80,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  linkIconContainer: {
    backgroundColor: "#439BE8",
    padding: 6,
    borderRadius: 50,
    marginRight: 2,
  },
  linkIcon: {
    color: "white", // Set the color directly on the icon
    marginLeft: "auto",
  },
  downloadIconContainer: {
    marginLeft: "auto",
  },
});
