import React from 'react';
import {StyleSheet, Text, TouchableOpacity,ActivityIndicator, View} from "react-native";
import {AntDesign} from '@expo/vector-icons'

import colors from '../utilities/colors'

function AppButton({title, buttonLoading, onPress, style, iconName, iconSize, iconColor, textStyle,disableButton, ...props }) {
    return (
        <TouchableOpacity disabled={disableButton} style={[styles.buttonColor, style]} onPress={onPress} {...props}>
            <View style={styles.contentStyle}>
                {buttonLoading && <ActivityIndicator size='small' color={colors.blanc}/>}
            {iconName && <AntDesign name={iconName} size={iconSize} color={iconColor} {...props}/>}
            {title && <Text style={[styles.textStyle, textStyle]} {...props}>{title}</Text>}
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonColor: {
        backgroundColor: colors.rougeBordeau,
        alignItems: 'center',
        borderRadius: 25,
        width: 'auto',
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center'
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.blanc
    }
})

export default AppButton;