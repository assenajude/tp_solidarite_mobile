import React from 'react'
import {useStore, useDispatch} from "react-redux";
import {useNavigation} from '@react-navigation/native'
import {Alert} from "react-native";
import routes from "../navigation/routes";
import {getAddItemToCart} from "../store/slices/shoppingCartSlice";

let useAddToCart;
export default useAddToCart = () => {
    const navigation = useNavigation()
    const store = useStore()
    const dispatch = useDispatch()
    const addItemToCart = (item) => {
        const cartTypeCmde = store.getState().entities.shoppingCart.type
        const itemKeys = Object.keys(item)
        let typeCmde;
        if(itemKeys.indexOf('typeCmde') !== -1) {
            typeCmde = item.typeCmde
        } else {
            typeCmde = item.Categorie.typeCateg
        }
        if(cartTypeCmde !== '' && cartTypeCmde !== typeCmde) {
            Alert.alert('Attention', `Une commande de ${cartTypeCmde} est en cours, veillez la finaliser ou l'annuler`, [
                {text: 'ok', onPress: () => navigation.navigate(routes.CART)},
                {text: 'retour', onPress: () => {return;} }
            ], {cancelable: false})
        } else {
            dispatch(getAddItemToCart(item))
        }
    }

    return {addItemToCart};
};