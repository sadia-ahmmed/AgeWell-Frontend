import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Icon } from '@rneui/themed'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'

export default function DropdownSelect({ data, value, setValue, label }) {

    const [isFocus, setIsFocus] = useState(false)

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={isFocus && { color: 'blue' }}>
                    {label}
                </Text>
            )
        }

        return null
    }

    return (
        <View>
            {renderLabel()}
            <Dropdown
                style={isFocus && { color: "blue" }}
                data={data}
                maxHeight={300}
                value={value}
                labelField="label"
                valueField="value"
                placeholder="Select time"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value)
                    setIsFocus(false)
                }}
                renderLeftIcon={() => (
                    <Icon name='time-outline' type='ionicon' style={isFocus && { color: "blue" }} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({})