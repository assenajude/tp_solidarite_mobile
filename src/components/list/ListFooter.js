import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

import color from '../../utilities/colors'
import AppButton from "../AppButton";



function ListFooter({otherStyle, onPress}) {
    return (

        <TouchableWithoutFeedback onPress={onPress}>
            <View>
                <View style={otherStyle}>
                    <AppButton iconColor={color.blanc} iconSize={30} style={styles.buttonStyle} iconName='pluscircleo' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles  = StyleSheet.create({
    buttonStyle: {
        width: 50,
        height: 20,
        borderRadius: 100,
        padding: 25,
        backgroundColor: color.rougeBordeau
    },
})

export default ListFooter;