import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {AntDesign} from '@expo/vector-icons'

import Color from '../utilities/colors'

function AppInput({placeholder, style, iconName, title,...props}) {
    return (
        <View style={styles.mainContainer}>
           {title && <Text>{title}</Text>}
            <View style={styles.secondContainer}>
            {iconName && <AntDesign name={iconName} size={24} color='black'/>}
            <TextInput {...props} style={[styles.inputStyle, style]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 10
    },
    secondContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Color.lightGrey,
        borderWidth:0.5,
        borderRadius: 10
    },
    inputStyle: {
        borderColor: Color.leger,
        width: '80%',
        marginTop: 10
    }
})

export default AppInput;