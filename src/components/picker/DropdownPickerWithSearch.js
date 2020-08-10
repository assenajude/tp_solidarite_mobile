import React from 'react';
import {Picker} from '@react-native-community/picker'
import {TextInput, TouchableOpacity,Keyboard, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import Color from "../../utilities/colors";


function DropdownPickerWithSearch({selected, changeSelectedValue, style, pickerStyle, itemsStyle, getInput, leaveInput, onPress}) {


    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={[styles.searchContainer, style]} >

                    <TextInput style={styles.inputStyle} onFocus={getInput} onBlur={leaveInput} placeholder='chercher ici...'/>
                    <EvilIcons name='search' size={24} style={styles.searchIconStyle}/>
                </View>
            </TouchableOpacity>
        <Picker mode='dropdown' itemStyle={itemsStyle} style={[{height: 50, width: 128, marginLeft:30},pickerStyle]} selectedValue={selected}
        onValueChange={changeSelectedValue}>
            <Picker.Item label='Tous' value='tous'/>
            <Picker.Item label='Article' value='article'/>
            <Picker.Item label='Location' value='location'/>

        </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        width:'auto',
        paddingBottom: 5,
        paddingTop: 5,
        borderBottomWidth: 1,
        color:Color.blanc,
        borderColor: Color.blanc
    },
    searchIconStyle:{
            color: Color.blanc
    }


})

export default DropdownPickerWithSearch;