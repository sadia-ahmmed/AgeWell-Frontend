import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Text,  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const GeneralSearchBar = ({ onSearch, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const dummyNurseData = [
    {
      picture: 'https://via.placeholder.com/150',
      name:'Jon Done',
      hospital: "St. Mary's Hospital",
      rating: 4.5,
    },
    {
      picture: 'https://via.placeholder.com/150',
      name:'Jon Done',
      hospital: 'City General Hospital',
      rating: 3.8,
    },
    {
      picture: 'https://via.placeholder.com/150',
      name:'vsyauyh',
      hospital: 'Community Medical Center',
      rating: 4.2,
    },
    {
      picture: 'https://via.placeholder.com/150',
      name:'sauhu',
      hospital: 'Grace Healthcare',
      rating: 4.7,
    },
    {
        picture: 'https://via.placeholder.com/150',
        name:'tom',
        hospital: "St. Mary's Hospital",
        rating: 4.5,
      },
      {
        picture: 'https://via.placeholder.com/150',
        name:'tom',
        hospital: 'Tom',
        rating: 3.8,
      },
      {
        picture: 'https://via.placeholder.com/150',
        name:'tom',
        hospital: 'Jerry',
        rating: 4.2,
      },
      {
        picture: 'https://via.placeholder.com/150',
        name:'tom',
        hospital: 'Tom',
        rating: 4.7,
      },
  ];
  const [filteredNurseData, setFilteredNurseData] = useState(dummyNurseData);
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    // Filter the nurse data based on the search query
    const filteredData = dummyNurseData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNurseData(filteredData);
  };

  

  const renderNurseItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('NurseProfile')}}>
      <Image source={{ uri: item.picture }} style={styles.nurseImage} />
      <Text style={styles.hospitalName}>{item.name}</Text>
      <Text style={styles.hospitalName}>{item.hospital}</Text>
      <View style={styles.ratingContainer}>
        <MaterialCommunityIcons name="star" size={18} color="#FFD700" />
        <Text style={styles.ratingValue}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style = {{flex:1, backgroundColor:'white'}}>
        <View style={styles.container}>
        <View style={styles.searchContainer}>
            
            <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <AntDesign name="search1" size={24} color="white" style={styles.searchIcon} />
        </TouchableOpacity>
        </View>

        <FlatList
            data={filteredNurseData}
            renderItem={renderNurseItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginBottom:20,
    marginHorizontal:12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    flex: 1,
  },
  searchIcon: {
    marginHorizontal:8,

  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#439be8',
    borderBottomRightRadius: 24,
    borderTopEndRadius:24,
    padding: 14,
    // marginLeft: 10,
  },

  card: {
    flex: 1,
    marginHorizontal:12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 160,
  },
  nurseImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    alignSelf: 'center',
  },
  hospitalName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingValue: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FFD700',
  },
  
});

export default GeneralSearchBar;
