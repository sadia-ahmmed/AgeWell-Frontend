import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card } from "@rneui/themed";
import { Pressable } from "react-native";
import AdaptiveView from "../../components/AdaptiveView";
// import packages from "./Packages";
// import HospitalPackageCard from "../../components/HospitalPackageCard";

const packages = [
  {
    id: 1,
    hospitalName: "Square Hospital",
    packageName: "SQUARE Executive Health Check - Basic",
    packageIncludes:
      "Creatinine, Lipid Profile , ALT (SGPT), AST (SGOT), Urine Routine Examination, HbA1C, ECG, Consultation with Physician, Complimentary Breakfast/Lunch",
    packagePrice: "BDT 4,990.00",
    image: require("../../../assets/Square-Hospital.png"),
  },
  {
    id: 2,
    hospitalName: "Square Hospital",
    packageName: "SQUARE Diabetic Screeing Male Basic",
    packageIncludes:
      "Glucose, fastingGLUCOSE, 2 HRS POST PRANDIAL, Creatinine, ALT (SGPT), Urine Routine Examination, PSA (Prostate Specific Antigen), HbA1C, ECG, Diet Consultation, Consultation with Endocrynologist, Complimentary Breakfast/Lunch",
    packagePrice: "BDT 6,250.00",
    image: require("../../../assets/Square-Hospital.png"),
  },
  {
    id: 3,
    hospitalName: "Ibn Sina Hospital",
    packageName: "Comprehensive Health Checkup (Male Above 40 years)",
    packageIncludes:
      "Complete Blood Count (CBC) with ESR, , Fasting Blood Sugar (FBS) & 2Hours ABF, HPATC, Fasting Lipid Profile , Serum Biirubin , SGPT (ALT) , Akaline Phosphatase, HBsAg (Elisa), Anti HCV, Serum Creatinine, Serum Electrolytes, Uric Acid,  Serum Calcium, Serum Phosphate, Vitamin D (OH), Urine RIME, Stool Occult Blood Test, PSATSH, FT4, ECG, X-Ray, Chest PIA View, Echo Color Doppler, USG of WIA with PVR, Prostate & MCC",
    packagePrice: "BDT 12,750.00",
    image: require("../../../assets/Ibn-Sina-Hospital.png"),
  },
  {
    id: 4,
    hospitalName: "LABAID Hospital",
    packageName: "Women Wellness Screening (WWS)",
    packageIncludes:
      "BMI( Body Composition Analysis), Physical Examination By Doctor, Complete Blood Count (CBC), Serum Lipid Profile ( Fasting), Serum Uric Acid, TSH, HBA1c, HBsAg, CA-125, Blood Urea, Serum Creatinine, Serum , Electrolytes, Serum Bilirubin, SGPT, Alkaline Phosphate Urine R/M/E, Pap's Smear, Electrocardiogram(ECG), Mammograpy of Both Breast, X-ray Chest P/A View, USG, of Whole Abdomen, Nutritionist Advice, Complementry Breakfast",
    packagePrice: "BDT 16,000.00",
    image: require("../../../assets/Labaid-Hospital.png"),
  },
  {
    id: 5,
    hospitalName: "United Hospital",
    packageName: "DENGUE CARE PACKAGE (General)",
    packageIncludes:
      "CBC, Dengue NS1 Antigen, Home Sample Collection, Consultation with Consultant",
    packagePrice: "BDT 3,400.00",
    image: require("../../../assets/United-Hospital.png"),
  },
  {
    id: 6,
    hospitalName: "LABAID Hospital",
    packageName: "Cardiac Screening (Male/ Female)",
    packageIncludes:
      "BMI, Blood Pressure, Lipid Profile (F), Blood Glucose (F), C-, Reactive Protein (CRP), ECG, Echocardiograph, Consultation with physician",
    packagePrice: "BDT 4,400.00",
    image: require("../../../assets/Labaid-Hospital.png"),
  },
  {
    id: 7,
    hospitalName: "United Hospital",
    packageName: "Executive Basic Check-up (Female)",
    packageIncludes:
      "CBC and ESR, Liver Function Test, Renal Function Test, Fasting Blood Sugar, 2 Hours Post Prandial, Fasting Lipid Profile, Rubella IgM( For women below the age of 40), Serum Calcium, Serum Phosphate, TSH, Blood Grouping & Rh Typing, Urine R/E, ECG, X-Ray Chest P/A View ( not applicable in case of pregnancy), Stool R/E, Diet Counseling, Consultation with Physician",
    packagePrice: "BDT 9,000.00",
    image: require("../../../assets/United-Hospital.png"),
  },
  {
    id: 8,
    hospitalName: "Square Hospital",
    packageName: "SQUARE Diabetic Screening Female Basic",
    packageIncludes:
      "Glucose, fastingGLUCOSE, 2 HRS POST PRANDIAL, Creatinine, Lipid Profile, ALT (SGPT), Urine Routine Examination, CBC, HbA1C, ECG, Diet Consultation, Consultation with Endocrynologist, Complimentary Breakfast/Lunch",
    packagePrice: "BDT 6,600.00",
    image: require("../../../assets/Square-Hospital.png"),
  },
  {
    id: 9,
    hospitalName: "United Hospital",
    packageName: "Executive Basic Check-up (Male)",
    packageIncludes:
      "CBC and ESR,Liver Function Test, Renal Function Test, Fasting Blood Sugar, 2 Hours Post Prandial, Fasting Lipid Profile, Serum PSA, Serum Calcium, Serum Phosphate, TSH, Blood Grouping & Rh Typing, Urine R/E, ECG, X-Ray Chest P/A View, Stool R/E, Diet Counseling, Consultation with Physician",
    packagePrice: "BDT 9,000.00",
    image: require("../../../assets/United-Hospital.png"),
  },
];

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
            <Pressable style={styles.moreDetails} onPress={() => setModalVisible(true)}>
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
              <Text style={styles.innerTitle}>Package Details: </Text>
              <Text style={styles.innerDescription}>
                {packageData.packageIncludes}
              </Text>
              <Text style={styles.innerTitle}>Price: </Text>
              <Text style={styles.innerDescription}>
                {packageData.packagePrice}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton,]}>Close</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Package = () => {
  return (
    <AdaptiveView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.pageTitle}>Hospital Packages</Text> */}
        {/* <Card.Divider style={{ backgroundColor: "#00bfff", height: 1 }} /> */}
        {packages.map((item) => (
          <HospitalPackageCard key={item.id} packageData={item} />
        ))}
      </ScrollView>
    </AdaptiveView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
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
    marginLeft: 180,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#6cc456",

  },

  bookButton: {
    backgroundColor: "#6cc456",
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
    backgroundColor: "#6cc456",
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
    marginTop: -50,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#00bfff",
  },
});

export default Package;