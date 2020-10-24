import React, {useState} from 'react'
import {useStore, useDispatch} from "react-redux";
import {useNavigation} from '@react-navigation/native'
import {Alert} from "react-native";
import routes from "../navigation/routes";
import {addToCart} from "../store/actionsCreators/shoppingCartActionCreator";

let useAddToCart;
export default useAddToCart = () => {
    const navigation = useNavigation()
    const store = useStore()
    const dispatch = useDispatch()
    const addItemToCart = (item) => {
        const cartTypeWarn = store.getState().entities.shoppingCart.type
        if(cartTypeWarn !== '' && cartTypeWarn !== item.category.typeCateg) {
            Alert.alert('Attention', `Une commande de ${cartTypeWarn} est en cours, veillez la finaliser ou l'annuler`, [
                {text: 'ok', onPress: () => navigation.navigate(routes.CART)}
            ], {cancelable: false})
        } else {
            dispatch(addToCart(item))
        }
    }

    return {addItemToCart};
};