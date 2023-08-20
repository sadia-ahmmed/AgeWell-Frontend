import { StyleSheet, Text, View } from 'react-native'
import { useState, useContext } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from '@rneui/themed'
import { auth } from '../../firebase/firebaseConfigs';
import { IP_ADDRESS, IP_PORT } from '../../../configs';
import { AuthContext } from '../../providers/AuthProviders';

const GenderSelection = ({ index, setStep, setProgress, progressLength }) => {

    const authCtx = useContext(AuthContext)

    const onPressBox = (gender) => {

        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const body = {
            key: "gender",
            gender
        }

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/set-account-detail`
        const options = {
            mode: "cors",
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user_access_token}` },
            body: JSON.stringify(body)
        }


        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                authCtx.setUserCache(data)
                setStep(index + 1)
                setProgress((index + 1) / progressLength)
            })
            .catch(err => {
                alert(err.message)
            })

    }




    return (
        <View>
            <Text style={styles.title_text}>Choose your gender</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                    style={{
                        alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "skyblue"
                        , borderRadius: 20, padding: 30, margin: 10
                    }}
                    onPress={() => onPressBox("Male")}
                >
                    <Icon name="gender-male" type="material-community" color="blue" size={50} />
                    <Text style={{ color: "darkslategrey", fontWeight: "bold", marginLeft: 7, marginRight: 7, }}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "skyblue"
                        , borderRadius: 20, padding: 30, margin: 10
                    }}
                    onPress={() => onPressBox("Female")}
                >
                    <Icon name="gender-female" type="material-community" color="pink" size={50} />
                    <Text style={{ color: "darkslategrey", fontWeight: "bold", }}>Female</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GenderSelection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    choice_box_area: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "skyblue",
        borderRadius: 20,
        padding: 15,
        margin: 10,
        fontWeight: "bold"
    },
    title_text: {
        fontWeight: "900",
        marginBottom: 40,
        fontSize: 24,
        color: "skyblue",
        textAlign: "center"
    }
})