import React from 'react';
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons";


function ItemIconButton({iconName, color, onPress, otherStyle, iconSize}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.itemIconContainer, otherStyle]}>
                <AntDesign name={iconName} size={iconSize} color={color}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemIconContainer: {
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginBottom: 10
    }
})

export default ItemIconButton;