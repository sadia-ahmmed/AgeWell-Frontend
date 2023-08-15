import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Image } from '@rneui/themed'
import { AuthContext } from '../../../providers/AuthProviders'
import { CameraType, MediaTypeOptions, launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync, useMediaLibraryPermissions } from 'expo-image-picker'

const VerificationScreen = () => {

    const [fileData, setFileData] = useState()
    const [fileUri, setFileUri] = useState("")

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
            console.log("Set")
        }

    }



    const openCamera = async () => {
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
            setFileData({
                "img1": res.assets[0].base64,
                "img2": res.assets[1].base64,
            })
            setFileUri({
                "img1": res.assets[0].uri,
                "img2": res.assets[1].uri,
            })
            console.log("Set")
        }
    }



    return (
        <View style={styles.container}>
            <Text>Procedures:</Text>
            <Text>Please upload/capture pictures of your National ID (NID) from your gallery. The estimated approval time is 10 minutes.</Text>
            {
                fileUri !== "" && <Image style={styles.img_preview} source={{ uri: fileUri["img1"] }} />
            }
            {
                fileUri !== "" && <Image style={styles.img_preview} source={{ uri: fileUri["img2"] }} />
            }
            <Button title="Open Camera" onPress={openCamera} />
            <Button title="Open Gallery" onPress={pickImageFromGallery} />
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
    img_preview: {
        width: 200,
        height: 200
    }
})