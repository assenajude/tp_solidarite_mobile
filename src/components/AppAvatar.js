import React from 'react';
import {View,StyleSheet, TouchableOpacity, Text} from "react-native";
import Color from "../utilities/colors";

function AppAvatar({style, onPress, children, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, style]}>
            {children}
            <View style={[styles.notifStyle, textStyle]}>
                <Text style={styles.textNotifStyle}>9</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {},
    notifStyle: {
        position: 'absolute',
        right: -6,
        top: -3,
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNotifStyle:{
        color: Color.blanc,
        fontSize: 10,
        padding: 3,
        fontWeight: 'bold'
    }
})

export default AppAvatar;