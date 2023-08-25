import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView , Modal} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating } from "react-native-ratings";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReviewForm from './AddReview';
const ProfilePage = ({ navigation }) => {
  const [rating, setRating] = useState(1)
  const [modalVisible, setModalVisible] = useState(false);
  const user = {
    pic: 'https://via.placeholder.com/150',
    name: 'John Doe',
    patients: 300,
    reviews: 400,
    points: 2000,
    headline: 'Software Engineer',
    location: 'San Francisco, CA',
    connections: 500,
    rating :3,
    totalRating : 300,
    about:
      'Passionate software engineer with experience in web and mobile app development. Strong skills in JavaScript, React, and React Native.',
    experience: [
      {
        title: 'Software Engineer',
        company: 'TechCo',
        duration: 'Jan 2020 - Present',
        description:
          'Developed and maintained web and mobile applications, collaborated with cross-functional teams to deliver high-quality software.',
      },
      {
        title: 'Frontend Developer',
        company: 'WebTech',
        duration: 'Jun 2018 - Dec 2019',
        description:
          'Designed and implemented user interfaces, optimized website performance, and integrated APIs.',
      },
      {
        title: 'Software Engineer',
        company: 'TechCo',
        duration: 'Jan 2020 - Present',
        description:
          'Developed and maintained web and mobile applications, collaborated with cross-functional teams to deliver high-quality software.',
      },
      {
        title: 'Frontend Developer',
        company: 'WebTech',
        duration: 'Jun 2018 - Dec 2019',
        description:
          'Designed and implemented user interfaces, optimized website performance, and integrated APIs.',
      },
    ],
  };


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <ScrollView >
      <View style={{backgroundColor:'white', marginBottom: 10}}>
      <View style={styles.container}>
      <Image
        source={{uri:user.pic}}
        style={styles.profilePicture}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.headline}>{user.headline}</Text>
      <Text style={styles.location}>{user.location}</Text>
      <Text style={styles.connections}>
        {user.connections} connections
      </Text>
      <View style={styles.ratingContainer}>
      <TouchableOpacity style={styles.ratingContainer} onPress={() => {navigation.navigate('ViewAllReviews')}}>
      <MaterialCommunityIcons name="star" size={25} color="#FFD700" />
        <Text style={styles.ratingValue}>{user.rating}</Text>
        <Text  style={styles.fontStyle}>view ratings </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft:10,}} onPress={openModal}>
        <Text style={styles.fontStyle}>Add a review</Text>
        </TouchableOpacity>
      </View>
        
      <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Patients {'\n'} {user.patients}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Reviews {'\n'} {user.reviews}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Points {'\n'} {user.points}</Text>
            </View>
      </View>
      
      <Text style={styles.about}>{user.about}</Text>
      <ReviewForm isVisible={modalVisible} onClose={closeModal} />
      </View>
      </View>

      <View style={{backgroundColor:'white', marginBottom: 10}}>
        <View style={styles.container}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {user.experience.map((exp, index) => (
            <View key={index} style={styles.experience}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDuration}>{exp.duration}</Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* <View style={{backgroundColor:'white', marginBottom: 10}}>
        <View style={styles.container}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {user.experience.map((exp, index) => (
            <View key={index} style={styles.experience}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDuration}>{exp.duration}</Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      </View> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headline: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  connections: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  about: {
    fontSize: 16,
    marginBottom: 16,
    borderTopColor: '#888',
    borderTopWidth:.5,
    marginTop:10,
    paddingTop: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    
  },
  experience: {
    borderTopColor: '#888',
    borderTopWidth:.5,
    marginTop:10,
    paddingTop: 16,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  experienceCompany: {
    fontSize: 16,
    color: '#888',
  },
  experienceDuration: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingValue: {
    marginLeft: 4,
    fontSize: 14,
    // color: '#FFD700',
    fontWeight: 'bold',
  },
  fontStyle:{
    fontWeight:'200',
    fontSize:12,
    marginLeft: 5,
    color: '#439be8',
    borderBottomColor:'#c0d2f0',
    borderBottomWidth:.3
  },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginBottom: 16,
      marginVertical:10
    },
    infoCard: {
      flex: 1,
      backgroundColor: '#f7fafe',
      borderRadius: 8,
      paddingVertical: 8,
      alignItems: 'center',
      marginHorizontal:7
    },
    infoText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#707070',
    },
});

export default ProfilePage;
