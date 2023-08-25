import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Divider, Image, Overlay } from '@rneui/themed'
import { AuthContext } from '../../../providers/AuthProviders'
import { CameraType, MediaTypeOptions, launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'
import { auth } from '../../../firebase/firebaseConfigs'
import { IP_ADDRESS, IP_PORT } from '../../../../configs'
import { Platform } from 'react-native'
import AdaptiveView from '../../../components/AdaptiveView'
import * as DocumentPicker from "expo-document-picker";

const VerificationScreen = () => {

    const [fileData1, setFileData1] = useState()
    const [fileData2, setFileData2] = useState()
    const [resumeData, setResumeData] = useState()
    const [openOverlay1, setOpenOverlay1] = useState(false)
    const [openOverlay2, setOpenOverlay2] = useState(false)

    const authCtx = useContext(AuthContext)


    const sendForVerification = () => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        console.log(fileData1)

        const data = new FormData()
        data.append('files', {
            type: `image/${fileData1.type}`,
            uri: fileData1.uri,
            name: fileData1.name,
        })
        data.append('files',
            {
                type: `image/${fileData2.type}`,
                uri: fileData2.uri,
                name: fileData2.name,
            }
        )
        if (authCtx.userCache.type === "nurse") {
            if (Platform.OS === "ios" || Platform.OS === "macos") {
                data.append("files", resumeData)
            } else {
                data.append("files", {
                    name: resumeData.name,
                    uri: resumeData.uri,
                    type: `application/${resumeData.type}`,
                });
            }
        }

        const url = `http://${IP_ADDRESS}:${IP_PORT}/api/auth/user/verification-send/${auth.currentUser.uid}`
        const options = {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${user_access_token}`
            },
            body: data
        }

        fetch(url, options)
            .then(res => res.json())
            .then(data => alert(data.message))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }


    const selectDoc = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf"],
                multiple: false,
            });
            setResumeData(doc)
        } catch (err) {
            alert(err.message)
        }
    }


    const pickImageFromGallery = async (key) => {

        console.log("enter")
        const permission = await requestMediaLibraryPermissionsAsync()

        if (permission.status === false) {
            alert("You've refused permission")
            return
        }

        const res = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 1,

        })


        if (!res.canceled) {
            if (key === "img1") {
                const asset = res.assets[0]
                const filename = asset.uri.substring(asset.uri.lastIndexOf('/') + 1, asset.uri.length)
                setFileData1({
                    ...asset,
                    name: filename
                })
                setOpenOverlay1(false)
            } else if (key === "img2") {
                const asset = res.assets[0]
                const filename = asset.uri.substring(asset.uri.lastIndexOf('/') + 1, asset.uri.length)
                setFileData2({
                    ...asset,
                    name: filename
                })
                setOpenOverlay2(false)
            }
        }

    }


    const openCamera = async (key) => {
        const permission = await requestCameraPermissionsAsync()

        if (permission.granted === false) {
            alert("You've refused permission")
            return
        }

        const res = await launchCameraAsync({
            cameraType: CameraType.back,
            quality: 1,
        })

        if (!res.canceled) {
            if (key === "img1") {
                const asset = res.assets[0]
                const filename = asset.uri.substring(asset.uri.lastIndexOf('/') + 1, asset.uri.length)
                setFileData1({
                    ...asset,
                    name: filename
                })
                setOpenOverlay1(false)
            } else {
                const asset = res.assets[0]
                const filename = asset.uri.substring(asset.uri.lastIndexOf('/') + 1, asset.uri.length)
                setFileData2({
                    ...asset,
                    name: filename
                })
                setOpenOverlay2(false)
            }
        }
    }


    const ChoiceOverlay1 = () => (
        <Overlay
            isVisible={openOverlay1}
            style={{
                padding: 50
            }}
            onBackdropPress={() => setOpenOverlay1(false)}
        >
            <AdaptiveView
                style={{
                    padding: 50
                }}
            >
                <Button title="Upload from camera" onPress={() => openCamera("img1")} />
                <Divider />
                <Button title="Upload from gallery" onPress={() => pickImageFromGallery("img1")} />
            </AdaptiveView>
        </Overlay>
    )

    const ChoiceOverlay2 = () => (
        <Overlay
            isVisible={openOverlay2}
            onBackdropPress={() => setOpenOverlay2(false)}
        >
            <AdaptiveView
                style={{
                    padding: 50
                }}
            >
                <Button title="Upload from camera" onPress={() => openCamera("img2")} />
                <Divider />
                <Button title="Upload from gallery" onPress={() => pickImageFromGallery("img2")} />
            </AdaptiveView>
        </Overlay>
    )


    const OngoingMessageScreen = () => (
        <Text>Ongoing! Thanks for submitting</Text>
    )


    return (
        <AdaptiveView style={styles.container}>
            {
                authCtx.userCache.verification_status === "ongoing" ? <OngoingMessageScreen /> :
                    <>
                        <Text>Procedures:</Text>
                        <Text>Please upload/capture pictures of your National ID (NID) from your gallery. The estimated approval time is 10 minutes.</Text>
                        <AdaptiveView style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.shadow_bg} onPress={() => setOpenOverlay1(true)}>
                                {
                                    !fileData1 ? <Text style={styles.text_preview}>Upload front part</Text> : <Image style={styles.img_preview} source={{ uri: fileData1.uri }} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setOpenOverlay2(true)}>
                                {
                                    !fileData2 ? <Text style={styles.text_preview}>Upload back part</Text> : <Image style={styles.img_preview} source={{ uri: fileData2.uri }} />
                                }
                            </TouchableOpacity>
                        </AdaptiveView>
                        <ChoiceOverlay1 />
                        <ChoiceOverlay2 />
                        {
                            authCtx.userCache.type === "nurse" &&
                            <AdaptiveView style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 20 }}>
                                <Text style={{ fontSize: 12, marginRight: 10, }}>{!resumeData ? "Upload Your Resume in a PDF" : resumeData.name}</Text>
                                <Button type='clear' radius={"md"} title="Select Resume" onPress={selectDoc} />
                            </AdaptiveView>
                        }
                        <View style={{ marginTop: 30 }}>
                            <Button radius={"md"} title="Submit verification" onPress={sendForVerification} />
                        </View>
                    </>
            }

        </AdaptiveView>
    )
}

export default VerificationScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 30
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
        borderColor: "grey",
        backgroundColor: "lightgrey"
    }
})