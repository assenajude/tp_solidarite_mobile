import React from 'react';
import {View,Image,Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons'

import Color from '../../utilities/colors'
import AppText from "../AppText";
import AppButton from "../AppButton";
import CartItemQuantite from "./CartItemQuantite";
import useAuth from "../../hooks/useAuth";


function CartItem({source, designation,icon=false, activeDecrement,deleteItem,caution,frequence,
                      price, min, max, montantMin,montantMax,  montant, activeIncrement,showItemDetails,
                      quantite, itemQuantite,itemAmount, itemPrice, showCartItem,quantityDecrement, quantityIncrement,
                  disabledDecrement, disabledIncrement, notInStock, itemType}) {
    const {formatPrice} = useAuth()
    return (
        <View style={styles.mainContainer}>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={showCartItem}>
                    <Image style={styles.imageStyle} source={source}/>
                    <View style={{width: 100}}>
                    <AppText lineNumber={1}>{designation}</AppText>
                    </View>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <AppButton onPress={showItemDetails} style={{backgroundColor: Color.lightGrey}} iconName='search1' iconSize={20} iconColor='black'/>
                        <AppButton onPress={deleteItem} style={{backgroundColor: Color.lightGrey}} iconName='delete' iconSize={20} iconColor={Color.rougeBordeau}/>
                    </View>
                </View>
                <View style={styles.secondContainer}>
               {price && <AppText style={{marginLeft: 40, marginRight: 10}}>{formatPrice(itemPrice)}</AppText>}
                    {quantite && <CartItemQuantite disabledDecrement={disabledDecrement} disabledIncrement={disabledIncrement} minusActive={activeDecrement} plusActive={activeIncrement} quantite={itemQuantite} decrementQuantite={quantityDecrement} incrementQuantite={quantityIncrement} style={{marginRight: 15, marginLeft: 15}}/>}
                {montant && <AppText>{formatPrice(itemAmount)}</AppText>}

                    {min && <AppText>{formatPrice(montantMin)}</AppText>}
                    {icon && <AntDesign name='minus' size={24} color='black'/>}
                    {max && <AppText>{formatPrice(montantMax)}</AppText>}

                </View>
            </View>
            {itemType === 'location' && <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <AppText style={{fontWeight: 'bold'}}>Caution: </AppText>
                <AppText style={{fontWeight: 'bold', color: Color.rougeBordeau}}>{caution} {frequence.toLowerCase() === 'mensuelle'?'Mois':'Jours'}</AppText>
            </View>}
            {notInStock && <View style={styles.notInStock}>
                <AppText style={{color: Color.rougeBordeau}}>Rupture de stock</AppText>
            </View>}
            {notInStock && <View style={styles.deleteNotInStock}>
                <AppButton iconColor={Color.blanc} iconName='delete' title='supprimer' iconSize={24}/>
            </View>}
        </View>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: Color.leger,
        borderWidth: 2,
        padding: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10
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
    notInStock: {
        position: 'absolute',
        zIndex: 1,
        opacity: 0.8,
        backgroundColor: Color.blanc,
        width:'100%',
        height: '100%'
    },
    deleteNotInStock: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 2,
    }

})

export default CartItem;