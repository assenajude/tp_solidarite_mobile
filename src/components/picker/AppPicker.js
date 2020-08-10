import React, {useState} from 'react';
import {View, StyleSheet,Button,FlatList, TouchableHighlight, Modal, Text} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Color from '../../utilities/colors';
import PickerItem from '../picker/PickerItem'


function AppPicker({onPress, showModal, closeModal,children, items, onSelect}) {

    return (
       <>
        <TouchableHighlight underlayColor='' activeOpacity={0.5} onPress={onPress}>
        <View style={styles.mainContainer}>
            <Text style={styles.contentStyle}>{children}</Text>
            <MaterialCommunityIcons style={styles.iconStyle} name='menu-down' size={24}/>
        </View>
        </TouchableHighlight>
                <Modal visible={showModal} animationType='slide' statusBarTranslucent={false}>
                    <View style={styles.modalStyle}>
                     <View style={styles.modalContent}>
                    <FlatList data={items}
                    keyExtractor={item => item.value.toString()}
                              renderItem={({item}) => <PickerItem label={item.label} getPickerItem={() => {
                                  onSelect(item)
                              }}/>}/>
                    <Button title='close' onPress={closeModal}/>
                    </View>
                    </View>
                </Modal>

        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        borderWidth: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor:Color.blanc
    },
    iconStyle:{
        color: Color.blanc
    },
    contentStyle: {
      color: Color.blanc
    },
    modalContent:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 150,
        top: 50,
        left: 50,
        borderWidth: 1
    },
    modalStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AppPicker;