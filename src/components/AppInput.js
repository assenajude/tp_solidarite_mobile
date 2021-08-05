import React from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons'

import Color from '../utilities/colors'

function AppInput({iconName, title,deleteIcon,deleteFormInput,otherStyle,inputContainerStyle,inputMainContainer,...otherProps}) {
    return (
        <View style={[styles.mainContainer, inputContainerStyle]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {title && <Text>{title}</Text>}
                {deleteIcon && <TouchableOpacity onPress={deleteFormInput}>
                    <AntDesign name='delete' color={Color.rougeBordeau} size={18}/>
                </TouchableOpacity>
              }
            </View>
            <View style={[styles.secondContainer, inputMainContainer]}>
            {iconName && <AntDesign name={iconName} size={24} color='black'/>}
            <TextInput {...otherProps} style={[styles.inputStyle, otherStyle]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 10
    },
    secondContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Color.lightGrey,
        borderRadius: 30
    },
    inputStyle: {
        borderColor: Color.leger,
        width: '80%',
        height: 45,
        fontSize: 18
    }
})

export default AppInput;