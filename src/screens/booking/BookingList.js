import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { Card, Dialog } from '@rneui/themed';
import { IP_ADDRESS, IP_PORT } from '../../../configs';
import { auth } from '../../firebase/firebaseConfigs';
import NurseCard from '../../components/NurseCard';
import AdaptiveView from '../../components/AdaptiveView';

const BookingList = (props) => {
    const [nurseList, setNurseList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken;

        fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/appointment/get-nurses`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
        })
            .then(res => res.json())
            .then(result => {
                setNurseList(result);
                setLoading(false);
            })
            .catch(error => {
                alert('Error getting nurses');
            });
    }, []);

    const Screen = () => (
        <AdaptiveView style={styles.pageContainer}>
            <FlatList
                data={nurseList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('nurse-highlight', item)}>
                        <NurseCard nurse={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.uid}
            />
        </AdaptiveView>
    );

    return (
        <AuthContext.Consumer>
            {authCtx =>
                loading ? (
                    <AdaptiveView style={styles.containerLoading}>
                        <Dialog.Loading />
                    </AdaptiveView>
                ) : (
                    <Screen />
                )
            }
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BookingList;
