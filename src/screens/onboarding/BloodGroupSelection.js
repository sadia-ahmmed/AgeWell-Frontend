import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import DropdownSelect from '../../components/Dropdown'
import CustomButton from '../../components/CustomButton'
import { auth } from '../../firebase/firebaseConfigs'
import { AuthContext } from '../../providers/AuthProviders'
import { IP_ADDRESS, IP_PORT } from '../../../configs'
import { Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BloodGroupCard from '../../components/BloodGroupCard'

const BloodGroupSelection = ({ navigation, setStep, setProgress, progressLength }) => {

    const [blood_group, setBloodGroup] = useState("A+")

    const authCtx = useContext(AuthContext)

    const groups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]


    const onPressBox = () => {
        // alert(blood_group)
        const user_access_token = auth.currentUser.stsTokenManager.accessToken


        const body = {
            key: "blood_group",
            blood_group
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
                setStep(3)
                setProgress(3 / progressLength)
            })
            .catch(err => {
                alert(err.message)
            })
    }


    return (
        <View>
            <Text style={styles.title_text}>Choose Blood Group</Text>
            <View style={{ flexDirection: "row", overflow: "scroll" }}>
                {
                    groups.slice(0, 4).map((element, index) => <BloodGroupCard key={index} focus={element === blood_group ? true : false} text={element} onPress={() => setBloodGroup(element)} />)
                }
            </View>
            <View style={{ flexDirection: "row", overflow: "scroll" }}>
                {
                    groups.slice(4, undefined).map((element, index) => <BloodGroupCard key={index} focus={element === blood_group ? true : false} text={element} onPress={() => setBloodGroup(element)} />)
                }
            </View>
            <View style={styles.container}>
                <CustomButton title="Next" width={150} marginTop={30} onPress={onPressBox} />
            </View>
        </View>
    )
}

export default BloodGroupSelection

const styles = StyleSheet.create({
    container: {
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