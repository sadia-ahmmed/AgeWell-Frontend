import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
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
                <AdaptiveView>
                    <View>
                        {
                            !nurse_details.avatar &&
                            <Image
                                source={require('../../../assets/avatar.png')}
                                style={[styles.avatarImage, { resizeMode: "cover" }]}
                            />
                        }
                        {
                            nurse_details.avatar &&
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${nurse_details.avatar}` }}
                                style={[styles.avatarImage, { resizeMode: "cover" }]}
                            />
                        }
                    </View>
                    <ScrollView style={styles.container}>
                        <Text style={styles.nameText}>{nurse_details.fullname}</Text>
                        <Text style={styles.ratingsText}>
                            {prettyPrintNurseRatings(nurse_details)}
                        </Text>
                        <Text style={styles.specialitiesText}>
                            Specialities: {prettyPrintNurseSpecialities(nurse_details)}
                        </Text>
                        <Pressable>
                            <Text style={styles.subheadText}>Biography</Text>
                        </Pressable>
                        <Text style={styles.bioText}>{nurse_details.biography}</Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                color="#46C1E2"
                                title="Book an Appointment"
                                onPress={() => navigation.navigate('nurse-booking', nurse_details)}
                            />
                        </View>
                    </ScrollView>
                </AdaptiveView>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 300,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: "#F7F7F7",
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: "lightgrey"
    },
    avatarImage: {
        width: "100%",
        height: 250,
        aspectRatio: 1
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
        fontSize: 14,
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