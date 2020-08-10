export const ADD_TO_CART = 'ADD_TO_CART';
export const CHANGE_QUANTITE = 'CHANGE_QUANTITE'

export const addToCart = (product) => {
    return {type: ADD_TO_CART, product: product}
};

export const changeQuantite = (idItem, quantite) => {
    return {type: CHANGE_QUANTITE, item: {id: idItem, quantity: quantite}}
}