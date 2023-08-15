import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay, Button } from '@rneui/themed'
import DatePicker from 'react-native-modern-datepicker'

export default function DateTimePickerModal({ type, state, onStateChangeHandler, view, onStateViewHandler }) {
    return (

        <Overlay
            animationType='slide'
            hardwareAccelerated
            transparent={true}
            visible={view}
            overlayStyle={{
                width: 300,
                // height: 300
            }}
        >
            <View style={{ backgroundColor: 'white', }}>
                <DatePicker
                    mode={type}
                    selected={state}
                    onDateChange={(value) => {
                        onStateChangeHandler(value)
                        onStateViewHandler(false)
                    }}
                    onTimeChange={(value) => {
                        onStateChangeHandler(value)
                        onStateViewHandler(false)
                    }}
                />
                <Button color="#46C1E2" title="Close" onPress={onStateViewHandler} />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({})