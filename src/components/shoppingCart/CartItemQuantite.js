import React from 'react';
import {View,StyleSheet, TouchableOpacity } from "react-native";
import {AntDesign} from '@expo/vector-icons'
import AppText from "../AppText";
import colors from "../../utilities/colors";

function CartItemQuantite({quantite,style,minusActive, plusActive, decrementQuantite, incrementQuantite}) {
    return (
        <View style={[styles.quantite, style]}>
           {minusActive && <TouchableOpacity onPress={decrementQuantite}>
            <AntDesign name='minus' size={15} style={{fontWeight: 'bold'}}/>
            </TouchableOpacity>}
            <AppText style={{marginRight: 10, marginLeft: 10}}>{quantite}</AppText>
            {plusActive && <TouchableOpacity onPress={incrementQuantite}>
            <AntDesign name='plus' size={10} style={{fontWeight: 'bold'}}/>
            </TouchableOpacity>}
        </View>
    );
}


const styles = StyleSheet.create({
    quantite: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.2,
        height: 20
    }
})
export default CartItemQuantite;