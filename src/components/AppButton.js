import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons'

import colors from '../utilities/colors'

function AppButton({title, onPress, style, iconName, iconSize, iconColor, textStyle, ...props}) {
    return (
        <TouchableOpacity style={[styles.buttonColor, style]} onPress={onPress}>
            <View style={styles.contentStyle}>

            {iconName && <AntDesign name={iconName} size={iconSize} color={iconColor} {...props}/>}
            {title && <Text style={[styles.textStyle, textStyle]} {...props}>{title}</Text>}
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonColor: {
        backgroundColor: colors.bleuFbi,
        alignItems: 'center',
        borderRadius: 25,
        width: 'auto',
        paddingLeft: 5,
        paddingRight: 5
    },
    contentStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.blanc
    }
})

export default AppButton;