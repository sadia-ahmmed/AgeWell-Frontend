import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicineDetails = () => {
    return (
        <View style={styles.container}>
            <Text>Medicine Details</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MedicineDetails;
