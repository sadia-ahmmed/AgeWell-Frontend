import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import { Button, Image } from '@rneui/themed'
import { prettyPrintNurseRatings, prettyPrintNurseSpecialities } from '../../services/ui/uiService'
import AdaptiveView from '../../components/AdaptiveView'

const NurseHighlight = ({ route, navigation }) => {
    const nurse_details = route.params;

    return (
        <AuthContext.Consumer>
            {(authCtx) => (
                <AdaptiveView style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../../assets/avatar.png')}
                            style={styles.avatarImage}
                        />
                    </View>
                    <Text style={styles.nameText}>{nurse_details.fullname}</Text>
                    <Text style={styles.ratingsText}>
                        {prettyPrintNurseRatings(nurse_details)}
                    </Text>
                    <Text style={styles.specialitiesText}>
                        Specialities: {prettyPrintNurseSpecialities(nurse_details)}
                    </Text>
                    <Text style={styles.subheadText}>Biography</Text>
                    <Text style={styles.bioText}>{nurse_details.biography}</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            color="#46C1E2"
                            title="Book an Appointment"
                            onPress={() => navigation.navigate('nurse-booking', nurse_details)}
                        />
                    </View>
                </AdaptiveView>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F7F7F7",
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: "#46C1E2",
    },
    nameText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "#333",
        textAlign: "center",
    },
    ratingsText: {
        fontSize: 16,
        marginBottom: 8,
        color: "#999",
        textAlign: "center",
    },
    specialitiesText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        color: "#666",
        textAlign: "center",
    },
    subheadText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
        color: "#333",
    },
    bioText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
        lineHeight: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
});

export default NurseHighlight;