import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Image } from '@rneui/themed'
import { AuthContext } from '../../../providers/AuthProviders'
import { CameraType, MediaTypeOptions, launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'

const VerificationScreen = () => {

    const [fileData1, setFileData1] = useState()
    const [fileData2, setFileData2] = useState()
    const [fileUri1, setFileUri1] = useState("")
    const [fileUri2, setFileUri2] = useState("")

    const [galleryStatus, requestGalleryPermission] = useMediaLibraryPermissions(false)
    const authCtx = useContext(AuthContext)

    const pickImageFromGallery = async () => {

        const permission = await requestMediaLibraryPermissionsAsync()

        if (permission.status === false) {
            alert("You've refused permission")
            return
        }

        const res = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 2
        })


        if (!res.canceled) {
            setFileData({
                "img1": res.assets[0].base64,
                "img2": res.assets[1].base64,
            })
            setFileUri({
                "img1": res.assets[0].uri,
                "img2": res.assets[1].uri,
            })
            console.log("Set", fileData["img1"])
        }

    }



    const openCamera = async (key) => {
        const permission = await requestCameraPermissionsAsync()

        if (permission.granted === false) {
            alert("You've refused permission")
            return
        }

        const res = await launchCameraAsync({
            base64: true,
            cameraType: CameraType.back,
            quality: 1,
        })

        if (!res.canceled) {
            if (key === "img1") {
                setFileUri1(res.assets[0].uri)
            } else {
                setFileUri2(res.assets[0].uri)
            }
        }
    }




    return (
        <View style={styles.container}>
            <Text>Procedures:</Text>
            <Text>Please upload/capture pictures of your National ID (NID) from your gallery. The estimated approval time is 10 minutes.</Text>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.shadow_bg} onPress={() => openCamera("img1")} >
                    {
                        fileUri1 === "" ? <Text style={styles.text_preview}>Upload front part</Text> : <Image style={styles.img_preview} source={{ uri: fileUri1 }} />
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openCamera("img2")} >
                    {
                        fileUri2 === "" ? <Text style={styles.text_preview}>Upload back part</Text> : <Image style={styles.img_preview} source={{ uri: fileUri2 }} />
                    }
                </TouchableOpacity>
            </View>
            <Button radius={"md"} title="Submit verification" onPress={() => alert("OK")} />
        </View>
    )
}

export default VerificationScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        marginTop: 0
    },
    shadow_bg: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    img_preview: {
        width: 150,
        height: 200,
        marginBottom: 10,
        marginTop: 40,
        marginRight: 24,
        borderWidth: 0.4,
        borderRadius: 10,

    },
    text_preview: {
        width: 150,
        height: 200,
        paddingTop: 90,
        marginBottom: 10,
        marginTop: 40,
        marginRight: 24,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: "grey"
    }
})