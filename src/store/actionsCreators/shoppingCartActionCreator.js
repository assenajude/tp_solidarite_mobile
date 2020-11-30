import {createAction} from '@reduxjs/toolkit'

export const addToCart = createAction('shoppingCart/addToCart', function (item) {
    if(item.Categorie.typeCateg === 'e-location') {
        return {
            payload: {
                id: item.id,
                libelle: item.libelleLocation,
                image: item.imageLocation,
                prix: item.coutPromo,
                quantite: 1,
                montant: item.coutPromo,
                caution: item.nombreCaution,
                type: item.Categorie.typeCateg
            }
        }
    } else if(item.Categorie.typeCateg=== 'e-service') {
        return {
            payload: {
                id: item.id,
                libelle: item.libelle,
                image: item.imageService,
                description: item.description,
                quantite: 1,
                prix: 0,
                montantMin: item.montantMin,
                montantMax: item.montantMax,
                montant: 0,
                type: item.Categorie.typeCateg
            }
        }
    }
    return {
        payload: {
            id: item.id,
            libelle: item.designArticle,
            image: item.imageArticle,
            prix: item.prixPromo,
            quantite: 1,
            montant: item.prixPromo,
            type: item.Categorie.typeCateg
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