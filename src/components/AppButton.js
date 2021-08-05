import React from 'react';
import {StyleSheet, Text, TouchableOpacity,ActivityIndicator, View} from "react-native";
import {AntDesign} from '@expo/vector-icons'
import {LinearGradient} from "expo-linear-gradient";

import colors from '../utilities/colors'

function AppButton({width='100%', height=50,color1='#4c669f',color2='#3b5998',color3='#192f6a',title, buttonLoading, onPress, style, iconName, iconSize=25, iconColor='white', textStyle,disableButton, ...props }) {
    return (
        <LinearGradient
            colors={[`${color1}`,`${color2}`,`${color3}`]}
            style={[styles.buttonStyle, {width:width, height: height}, style]}>
        <TouchableOpacity disabled={disableButton} onPress={onPress} {...props}>
            <View style={styles.contentStyle}>
                {buttonLoading && <ActivityIndicator size='small' color={colors.blanc}/>}
            {iconName && <AntDesign name={iconName} size={iconSize} color={iconColor} {...props}/>}
            {title && <Text style={[styles.textStyle, textStyle]} {...props}>{title}</Text>}
            </View>

        </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 10
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.blanc,
        fontSize: 18
    }
})

export default AppButton;
/*
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from "../utilities/colors";


function AppButton({title,color1='#4c669f',color2='#3b5998',color3='#192f6a', otherButtonStyle, textStyle,iconName,iconSize=30,iconColor='white', onPress}) {
    return (

        <LinearGradient
            colors={[`${color1}`,`${color2}`,`${color3}`]}
            style={[styles.buttonStyle, otherButtonStyle]}>
            <TouchableOpacity style={[styles.buttonStyle, otherButtonStyle]} onPress={onPress}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {iconName && <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor}/>}
                    <Text style={[styles.textStyle, textStyle]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginVertical: 10,
        width: '100%',
        borderRadius: 40
    },
    textStyle: {
        color: colors.white,
        fontSize: 20,
        marginLeft: 5
    }
})
export default AppButton;*/
