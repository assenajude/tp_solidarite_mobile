import React from 'react';
import {View, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import {AntDesign} from '@expo/vector-icons'



import AppText from "../AppText";
import AppButton from "../AppButton";

function PayementListItem({libelle, description, checked=false, selectItem, buttonStyle}) {
    return (
        <TouchableOpacity onPress={selectItem}>
            <View>
           <View style={styles.listContainer}>
            <View style={styles.checkStyle}>
                {checked && <AntDesign name='check' size={24} color='green' />}
            </View>
            <View style={styles.listContent}>
                <View style={styles.detailStyle}>
                    <AppText style={{fontWeight: 'bold', fontSize: 20}}> {libelle}</AppText>
                    <AppButton title='+ details' style={[{width: 'auto',height: 20, backgroundColor: 'green'}, buttonStyle]}/>
                </View>
                <AppText lineNumber={1}>{description}</AppText>
            </View>
           </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingRight: 5,
        width: '70%',
    },
    listContent: {
    },
    checkStyle: {
        borderWidth: 0.5,
        height: 30,
        minWidth: 30,
        minHeight: 20,
        margin: 5,
        right: 10,
        justifyContent: 'center'

    },
    numberStyle: {
        borderWidth: 0.5,
        margin: 5,
        justifyContent: 'center'
    },
    detailStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default PayementListItem;