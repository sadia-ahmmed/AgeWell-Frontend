import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Card } from "@rneui/themed";

const HospitalPackageCard = ({ packageData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={packageData.image} style={styles.image} />
            <View style={styles.imageTextContainer}>
              <Text style={styles.imageText}>{packageData.packageName}</Text>
              <Text style={styles.imageText}>{packageData.packagePrice}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
            <Pressable
              style={styles.moreDetails}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.bookButtonText}>Details</Text>
            </Pressable>
          </View>
        </Card>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Card style={styles.innerCard}>
            <Card.Title style={styles.hospitalName}>
              {packageData.hospitalName}
            </Card.Title>
            <Card.Divider style={styles.divider} />
            <Image source={packageData.image} style={styles.innerImage} />
            <Card.Divider
              style={{ marginTop: 20, height: 1, backgroundColor: "#00bfff" }}
            />
            <View style={styles.innerTextContainer}>
              {/* <Text style={styles.innerTitle}>Package Title: </Text> */}
              <Text style={styles.innerDescription}>
                {packageData.packageName}
              </Text>
              <Text style={styles.innerTitle}>Package Detials: </Text>
              <Text style={styles.innerDescription}>
                {packageData.packageIncludes}
              </Text>
              <Text style={styles.innerTitle}>Price: </Text>
              <Text style={styles.innerDescription}>
                {packageData.packagePrice}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, styles.button]}>Close</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between", // Distribute items along the row
  },
  cardContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageTextContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center",
  },
  imageText: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "serif",
    color: "#000",
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: "column",
    flex: 1,
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  textContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "serif",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: "#555",
    fontFamily: "serif",
    marginTop: 10,
  },
  moreDetails: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 140,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#439BE8",
  },

  bookButton: {
    backgroundColor: "#439BE8",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginLeft: 2,
  },
  bookButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  innerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  innerTextContainer: {
    padding: 0,
  },
  innerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  innerDescription: {
    fontSize: 14,
    fontFamily: "serif",
    marginTop: 4,
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#439BE8",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  closeButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
    backgroundColor: "#00bfff",
  },
  scrollContainer: {
    paddingVertical: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#00bfff",
  },
});

export default HospitalPackageCard;
