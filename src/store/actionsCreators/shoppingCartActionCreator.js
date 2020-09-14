import {createAction} from '@reduxjs/toolkit'

export const addToCart = createAction('shoppingCart/addToCart', function (item) {
    return {
        payload: {
            id: item.id,
            libelle: item.designArticle,
            image: item.imageArticle,
            prix: item.prixPromo,
            quantite: 1,
            montant: item.prixPromo
        }
    }

});

export const changeItemQuantity = createAction('shoppingCart/changeQuantity', function (id, quantite) {
    return {
        payload: {
            id,
            quantite
        }
    }

})