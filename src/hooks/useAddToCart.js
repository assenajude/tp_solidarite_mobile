import React from 'react'
import {useStore, useDispatch, useSelector} from "react-redux";
import {getAddItemToCart} from "../store/slices/shoppingCartSlice";

let useAddToCart;
export default useAddToCart = () => {
    const store = useStore()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const cartLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)

    const addItemToCart = async (item) => {
        let addedSuccess = false
        if(Object.keys(user).length === 0) {
            return alert('veuillez vous connecter pour faire des commandes.')
        }
        const cartTypeCmde = store.getState().entities.shoppingCart.type
        const itemKeys = Object.keys(item)
        let typeCmde;
        if(itemKeys.indexOf('typeCmde') !== -1) {
            typeCmde = item.typeCmde
        } else {
            typeCmde = item.Categorie.typeCateg
        }
        if(cartTypeCmde !== '' && cartTypeCmde !== typeCmde) {
           return  alert(`Une commande de ${cartTypeCmde} est en cours, veillez la finaliser ou l'annuler`)
        }
        if(cartTypeCmde=== 'location' || cartTypeCmde === 'service' && cartLenght>=1) {
            return alert("Vous ne pouvez faire qu'une commande de location ou de service à la fois. Veuillez finaliser d'abord la commande en cours.")
        }
            await dispatch(getAddItemToCart(item))
            addedSuccess = true
        return addedSuccess
    }

    return {addItemToCart};
};