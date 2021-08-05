import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

import color from '../../utilities/colors'
import AppButton from "../AppButton";



function ListFooter({otherStyle, onPress}) {
    return (
        <AppButton onPress={onPress} width={60} height={60}  iconColor={color.blanc} iconSize={30} style={[styles.buttonStyle, otherStyle]} iconName='pluscircleo' />

    );
}

const styles  = StyleSheet.create({
    buttonStyle: {
        borderRadius:30,
    },
})

export default ListFooter;