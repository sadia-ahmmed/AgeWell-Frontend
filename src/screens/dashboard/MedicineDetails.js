import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicineDetails = ({ route }) => {
    const { medicines } = route.params;

    return (
        <View style={styles.container}>
            <Text>Medicine Details</Text>
            
            {/* Displaying the list of medicines or any other information */}
            {medicines && medicines.map((medicine, index) => (
                <View key={index}>
                    <Text>{medicine.name} at {medicine.time}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default MedicineDetails;

