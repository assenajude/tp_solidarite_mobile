import {ADD_TO_CART, CHANGE_QUANTITE} from '../actions/shoppingCartActions';
import cartItem from "../../models/cartItem";
import {ADD_ORDER} from "../actions/orderActions";

const inititalState = {
    items: {},
    totalAmount: 0,
    itemsLenght: 0
};

export default (state = inititalState,action) => {
    let newState;
    switch (action.type) {
        case ADD_TO_CART:
           const addedProduct = action.product;

           if (state.items[addedProduct.id]) {
               let product = state.items[addedProduct.id];
                 product.quantite +=1;
                 product.prix = +addedProduct.prixArticle;
                 product.image = addedProduct.imageArticle;
                 product.montant += addedProduct.prixArticle;
               newState = {
                   ...state,
                   items: {...state.items, [addedProduct.id]:product},
                   itemsLenght: state.itemsLenght + 1,
                   totalAmount: state.totalAmount + product.prix
               };
               return newState || state
           } else {
               const quantite = 1;
               const montant = quantite*addedProduct.prixArticle;
               const newItem = new cartItem(addedProduct.id,addedProduct.designArticle, addedProduct.imageArticle, +addedProduct.prixArticle, quantite,montant);
               newState = {
                   ...state,
                   items: {...state.items, [addedProduct.id]:newItem},
                   itemsLenght: state.itemsLenght + 1,
                   totalAmount: state.totalAmount + addedProduct.prixArticle
               };
               return newState || state
           }
        case CHANGE_QUANTITE:
            let newItem = state.items[action.item.id];
            const lastItemQuantity = newItem.quantite;
            const lastItemAmount = newItem.montant;
             newItem.quantite = action.item.quantity;
             newItem.montant = newItem.prix * newItem.quantite;
             newState = {
                 ...state,
                 items: {...state.items, [newItem.id]:newItem},
                 itemsLenght: state.itemsLenght + newItem.quantite - lastItemQuantity,
                 totalAmount: state.totalAmount + newItem.montant - lastItemAmount
             };
             return newState || state
        default:
            return state;

    }
}