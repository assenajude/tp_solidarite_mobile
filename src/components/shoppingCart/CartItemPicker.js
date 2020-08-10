import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker';
import Color from '../../utilities/colors'

function CartItemPicker({itemQuantite,changeItemQuantite}) {
    let itemPickerContent = [
        {
            value: 1
        },
        {
            value: 2
        },
        {
            value: 3
        },
        {
            value: 4
        },
        {
            value: 5
        },
        {
            value: 6
        },
        {
            value: 7
        },
        {
            value: 8
        },
        {
            value: 9
        },
        {
            value: 10
        }

    ]




    return (
        <Picker mode='dropdown' selectedValue={itemQuantite} onValueChange={changeItemQuantite} style={styles.pickerContainer}>
            <Picker.Item label='1' value={1}/>
            <Picker.Item label='2' value={2}/>
            <Picker.Item label='3' value={3}/>
            <Picker.Item label='4' value={4}/>
            <Picker.Item label='5' value={5}/>
            <Picker.Item label='6' value={6}/>
            <Picker.Item label='7' value={7}/>
            <Picker.Item label='8' value={8}/>
            <Picker.Item label='9' value={9}/>
        </Picker>
       // <Dropdown data={itemPickerContent} onChangeText={changeItemQuantite} value={itemQuantite}/>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        padding:0,
        width: 74,
        height: 30
    }
})

export default CartItemPicker;