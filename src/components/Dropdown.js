import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Icon } from '@rneui/themed'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'

export default function DropdownSelect({ title, data, value, setValue, label, iconName = "time-outline", iconType = "ionicon", iconColor = "blue" }) {

    const [isFocus, setIsFocus] = useState(false)


    return (
        <View>

            <Dropdown
                style={isFocus && { color: "blue" }}
                data={data}
                maxHeight={300}
                value={value}
                labelField="label"
                valueField="value"
                placeholder={title}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value)
                    setIsFocus(false)
                }}
                renderLeftIcon={() => (
                    <Icon name={iconName} type={iconType} style={isFocus && { color: iconColor }} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({})