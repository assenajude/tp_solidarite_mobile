import React from 'react';
import {View,Image,Text, StyleSheet, TouchableOpacity} from 'react-native';

import Color from '../../utilities/colors'
import AppText from "../AppText";
import AppButton from "../AppButton";
import CartItemPicker from "./CartItemPicker";
import CartItemQuantite from "./CartItemQuantite";


function CartItem({source, designation, itemQuantite,itemAmount, itemPrice, showCartItem,quantityDecrement, quantityIncrement}) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={showCartItem}>
                    <Image style={styles.imageStyle} source={source}/>
                    <AppText>{designation}</AppText>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <AppButton style={{backgroundColor: Color.lightGrey}} iconName='search1' iconSize={20} iconColor='black'/>
                        <AppButton style={{backgroundColor: Color.lightGrey}} iconName='delete' iconSize={20} iconColor={Color.rougeBordeau}/>
                    </View>
                </View>
                <View style={styles.secondContainer}>
                <AppText style={{marginLeft: 40, marginRight: 10}}>{itemPrice}</AppText>
                    {/*<CartItemPicker itemQuantite={itemQuantite} changeItemQuantite={changeQuantite}/>*/}
                    <CartItemQuantite quantite={itemQuantite} decrementQuantite={quantityDecrement} incrementQuantite={quantityIncrement} style={{marginRight: 15, marginLeft: 15}}/>
                <AppText>{itemAmount}</AppText>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: Color.leger,
        borderWidth: 2
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10
    },
    imageContainer: {

    },
    secondContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        height: 80,
        width: 80
    },

})

export default CartItem;