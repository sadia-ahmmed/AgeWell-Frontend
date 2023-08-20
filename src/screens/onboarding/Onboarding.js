import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AccountSelection from './AccountSelection'
import GenderSelection from './GenderSelection'
import BloodGroupSelection from './BloodGroupSelection'
import { auth } from '../../firebase/firebaseConfigs'
import { IP_ADDRESS, IP_PORT } from '../../../configs'
import { AuthContext } from '../../providers/AuthProviders'
import { LinearProgress, Overlay } from "@rneui/themed";
import OnboardingClosureScreen from './OnboardingClosureScreen'
import AdaptiveView from '../../components/AdaptiveView'

const Onboarding = () => {

    const authCtx = useContext(AuthContext)
    const onboardingSteps = [AccountSelection, GenderSelection, BloodGroupSelection]
    const progressLen = onboardingSteps.length

    const [step, setStep] = useState(0)
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const handleBackButtonClick = () => {
            if (step > 0) {
                setStep(step - 1)
            }
        }
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
    }, []);

    const completeOnboarding = () => {
        const user_access_token = auth.currentUser.stsTokenManager.accessToken

        const body = {
            key: "onboarding",
            onboarding: false
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
            })
            .catch(err => {
                alert(err.message)
            })
    }

    const Stepper = () => {

        if (step === onboardingSteps.length) {
            completeOnboarding()
            return
        }

        const Component = onboardingSteps[step]
        return <Component index={step} setStep={setStep} setProgress={setProgress} progressLength={progressLen} />
    }

    return (
        <AdaptiveView style={styles.container}>
            <LinearProgress
                value={progress}
                variant="determinate"
                style={{ width: "70%", position: "absolute", top: 200 }}
                color="#46C1E2"
                trackColor="lightgrey"
            />
            <Stepper />
            {step === onboardingSteps.length && <OnboardingClosureScreen />}
        </AdaptiveView>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepper_closure: {
        marginBottom: 30
    }
})