import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Picker} from '@react-native-community/picker'
import user from "../../models/user";



function OrderPicker({selectedValue, changeValue, children, subtitle}) {
    //const [payementValue, setPayementValue ] = useState('CASH');

    const userAdresses = [
        {
            region: 'SUD COMOE',
            ville: 'ABOISSO',
            trajet: '200 Km',
            transport: '1500'
        },
        {
            region: 'GBEKE',
            ville: 'BOUAKE',
            trajet: '450 Km',
            transport: '2500'
        }
    ]


    if (subtitle === 'payement') {
        return (
            <Picker style={styles.container} selectedValue={selectedValue} onValueChange={changeValue}>
                <Picker.Item label='CASH' value='cash'/>
                <Picker.Item label='A CREDIT' value='credit'/>
            </Picker>
        );
    } else if (subtitle === 'livraison') {
        return (
            <Picker style={styles.container} selectedValue={selectedValue} onValueChange={changeValue}>
                {userAdresses && userAdresses.map(item => <Picker.Item label={item.ville} value={item.transport}/>)}
            </Picker>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height:50
    }
})

export default OrderPicker;