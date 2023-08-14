import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { auth } from '../../firebase/firebaseConfigs';
import { signOut } from 'firebase/auth';
import { invokeLogoutService } from '../../services/user/authService';
import { Button } from '@rneui/themed';
import { IP_ADDRESS, IP_PORT } from '../../../configs';

const MainScreen = ({ navigation }) => {
    const [user, setUser] = useState();
    const [medicines, setMedicines] = useState([
        { name: 'Napa', time: '8.00am' },
        { name: 'Extra', time: '9.00am' },
    ]);
    const authCtx = useContext(AuthContext);

    const onLogoutButtonPress = () => {
        invokeLogoutService(authCtx.userCache);
        signOut(auth);
        authCtx.setUserCache([]);
        authCtx.setLoggedIn(false);
    };

    useEffect(() => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken;

        const httpPolling = setInterval(() => {
            fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/get`, {
                method: "GET",
                mode: "cors",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
            })
                .then(res => res.json())
                .then(result => {
                    setUser(result);
                    authCtx.setUserCache(result);
                })
                .catch(error => {
                    alert('Error getting user details');
                });
        }, 3000);

        return () => clearInterval(httpPolling);
    }, []);

    return (
        <AuthContext.Consumer>
            {
                (authCtx) => (
                    <View style={styles.main_container}>
                        <Text>Main</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('medicine-details', { medicines: medicines })}>
                            <View style={styles.medCon}>
                                <Text style={styles.title} >Upcoming Medicine</Text>
                                <FlatList
                                    data={medicines}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({ item }) => (
                                        <View style={styles.medicineContainer}>
                                            <Text style={styles.medicineName}>{item.name}</Text>
                                            <Text style={styles.medicineTime}>{item.time}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={{ margin: 10 }}>
                            <Button color='red' title='LOGOUT' onPress={onLogoutButtonPress} />
                        </View>
                    </View>
                )
            }
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 10,
        padding: 30,
        backgroundColor: "white",
        flex: 1,
    },
    medCon: {
        backgroundColor: "#b3e5f5",
        padding: 10,
        borderRadius: 8,
    },
    medicineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#22a2c9',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    title:{
        fontSize: 25,
        fontWeight: '500',
        marginBottom: 10,
    },
    medicineName: {
        fontSize: 18,
        fontWeight: '500',
    },
    medicineTime: {
        fontSize: 18,
        color: 'gray',
    },
});

export default MainScreen;
