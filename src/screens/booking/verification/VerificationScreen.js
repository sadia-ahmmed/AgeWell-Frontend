import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button } from '@rneui/themed'
import { AuthContext } from '../../../providers/AuthProviders'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const VerificationScreen = () => {

    const [fileData, setFileData] = useState()
    const [fileUri, setFileUri] = useState()


    const authCtx = useContext(AuthContext)


    const launchNativeCamera = () => {
        const camera_options = {
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }

        launchCamera(camera_options, (res) => {
            const source = { uri: res.uri }
            setFileData(res.assets[0].base64)
            setFileUri(res.assets[0].uri)
            console.log(fileData, fileUri)
        })
    }

    const launchNativeGallery = () => {
        const gallery_options = {
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }

        launchImageLibrary(gallery_options, (res) => {
            const source = { uri: res.uri }
            setFileData(res.assets[0].base64)
            setFileUri(res.assets[0].uri)
            console.log(fileData, fileUri)
        })
    }


    return (
        <View style={styles.container}>
            <Text>Procedures:</Text>
            <Text>Please upload/capture pictures of your National ID (NID) from your gallery. The estimated approval time is 10 minutes.</Text>
            <Button title="Open Camera" onPress={launchNativeCamera} />
            <Button title="Open Gallery" onPress={launchNativeGallery} />
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
})