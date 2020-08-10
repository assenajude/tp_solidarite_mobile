import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
function PickerItem({label, getPickerItem}) {
    return (

        <TouchableOpacity onPress={getPickerItem}>
            <Text style={styles.itemStyle}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        padding: 15
    }
})

export default PickerItem;